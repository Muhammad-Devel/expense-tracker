export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Manzil topilmadi: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Noto'g'ri ID formati" });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "maydon";
    return res.status(400).json({ message: `Bu ${field} allaqachon band` });
  }

  res.status(statusCode).json({
    message: err.message || "Server xatoligi",
  });
};
