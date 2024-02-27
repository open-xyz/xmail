import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("your_mongodb_connection_string");
    console.log("MongoDB Connected...");
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDB connection failed:", error.message);
    } else {
      console.error("MongoDB connection failed:", error);
    }
  }
};

export default connectDB;
