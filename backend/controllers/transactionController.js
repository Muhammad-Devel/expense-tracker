import Transaction from "../models/Transaction.js";

// @desc    Barcha tranzaksiyalarni olish (filter: type, from, to, limit)
// @route   GET /api/transactions
export const getTransactions = async (req, res, next) => {
  try {
    const { type, from, to, limit } = req.query;
    const filter = { user: req.user._id };

    if (type) filter.type = type;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const transactions = await Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .limit(limit ? Number(limit) : 0);

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// @desc    Bitta tranzaksiyani olish
// @route   GET /api/transactions/:id
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!transaction) {
      return res.status(404).json({ message: "Tranzaksiya topilmadi" });
    }
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Yangi tranzaksiya (kirim yoki chiqim) qo'shish
// @route   POST /api/transactions
export const createTransaction = async (req, res, next) => {
  try {
    const { type, amount, category, note, date } = req.body;
    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      category,
      note,
      date: date || Date.now(),
    });
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Tranzaksiyani yangilash
// @route   PUT /api/transactions/:id
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction) {
      return res.status(404).json({ message: "Tranzaksiya topilmadi" });
    }
    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// @desc    Tranzaksiyani o'chirish
// @route   DELETE /api/transactions/:id
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!transaction) {
      return res.status(404).json({ message: "Tranzaksiya topilmadi" });
    }
    res.json({ message: "Tranzaksiya o'chirildi", id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Umumiy balans (kirim - chiqim)
// @route   GET /api/transactions/summary
export const getSummary = async (req, res, next) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    const summary = { kirim: 0, chiqim: 0 };
    result.forEach((r) => {
      summary[r._id] = r.total;
    });

    res.json({
      kirim: summary.kirim,
      chiqim: summary.chiqim,
      balans: summary.kirim - summary.chiqim,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Kunlik / oylik / yillik analitika + kategoriya bo'yicha taqsimot
// @route   GET /api/transactions/analytics?period=daily|monthly|yearly
export const getAnalytics = async (req, res, next) => {
  try {
    const { period = "monthly" } = req.query;

    let dateFormat;
    if (period === "daily") dateFormat = "%Y-%m-%d";
    else if (period === "yearly") dateFormat = "%Y";
    else dateFormat = "%Y-%m"; // monthly (default)

    const data = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            period: { $dateToString: { format: dateFormat, date: "$date" } },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.period": 1 } },
    ]);

    const map = {};
    data.forEach((item) => {
      const p = item._id.period;
      if (!map[p]) map[p] = { period: p, kirim: 0, chiqim: 0 };
      map[p][item._id.type] = item.total;
    });

    const timeline = Object.values(map).map((item) => ({
      ...item,
      balans: item.kirim - item.chiqim,
    }));

    const byCategoryRaw = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json({
      period,
      timeline,
      byCategory: byCategoryRaw.map((c) => ({
        category: c._id.category,
        type: c._id.type,
        total: c.total,
      })),
    });
  } catch (error) {
    next(error);
  }
};
