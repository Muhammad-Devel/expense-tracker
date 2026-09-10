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

// const allowedOrigins = process.env.FRONTEND_URL
//   ? process.env.FRONTEND_URL
//       .split(",")
//       .map((origin) => origin.trim())
//       .filter(Boolean)
//   : [];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) {
//         return callback(null, true);
//       }

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error(`CORS blocked: ${origin}`));
//     },
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-kfh8.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json());

// Yengil so'rov logi (method, url, status, javob vaqti — bir qatorda).
// Render'ning o'zi stdout'ni yig'ib beradi, shu sababli qo'shimcha yuk bermaydi.
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API ishlayapti" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishga tushdi`);
});
