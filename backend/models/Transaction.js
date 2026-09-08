import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["kirim", "chiqim"],
      required: [true, "Turi (kirim/chiqim) kiritilishi shart"],
    },
    amount: {
      type: Number,
      required: [true, "Summa kiritilishi shart"],
      min: [0, "Summa manfiy bo'lishi mumkin emas"],
    },
    category: {
      type: String,
      required: [true, "Kategoriya kiritilishi shart"],
      trim: true,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, date: -1 });

export default mongoose.model("Transaction", transactionSchema);
