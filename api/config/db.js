import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  const url = process.env.MONGODB_URI;

  if (!url) {
    console.error("MONGODB_URI non impostato in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (err) {
    console.error("DB connection error:", err.message || err);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
}
