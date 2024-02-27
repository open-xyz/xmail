import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Updated MongoDB connection without deprecated options
mongoose
  .connect(process.env.DB_CONNECTION_STRING!)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    if (error instanceof Error) {
      console.error("MongoDB connection failed:", error.message);
    } else {
      console.error("MongoDB connection failed:", error);
    }
  });

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
