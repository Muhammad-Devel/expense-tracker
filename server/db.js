import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB ulandi");
  } catch (err) {
    console.error("MongoDB ulanmadi", err);
    process.exit(1);
  }
};

export default connectDB;
