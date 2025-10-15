import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("DB_URI:", process.env.DB_URI ? "Set" : "Not set");
    process.exit(1);
  }
};

export default connectDB;
