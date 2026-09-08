import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// FRONTEND_URL: Render'da environment variable sifatida Vercel domeningizni bering,
// masalan: https://expense-tracker.vercel.app
// Bir nechta domen bo'lsa, vergul bilan ajrating: "https://a.vercel.app,https://b.vercel.app"
// Agar hali sozlanmagan bo'lsa, barcha domenlarga ochiq qoladi (faqat dastlabki test uchun).
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : "*";

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Yengil so'rov logi (method, url, status, javob vaqti — bir qatorda).
// Render'ning o'zi stdout'ni yig'ib beradi, shu sababli qo'shimcha yuk bermaydi.
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API ishlayapti" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishga tushdi`);
});
