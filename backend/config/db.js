import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("XATOLIK: MONGO_URI environment variable topilmadi (.env faylini tekshiring)");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB ulandi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB ulanish xatoligi: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
