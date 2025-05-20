const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const newExp = new Expense({ title, amount, category, date });
  const saved = await newExp.save();
  res.status(201).json(saved);
};
