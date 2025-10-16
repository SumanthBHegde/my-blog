import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST before any other imports
// Explicitly specify the .env file path
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug: Verify env variables are loaded (comment out in production)
// console.log("=== Environment Variables Check ===");
// console.log(
//   "CLOUDINARY_CLOUD_NAME:",
//   process.env.CLOUDINARY_CLOUD_NAME ? "✓ Loaded" : "✗ Missing"
// );
// console.log(
//   "CLOUDINARY_API_KEY:",
//   process.env.CLOUDINARY_API_KEY ? "✓ Loaded" : "✗ Missing"
// );
// console.log(
//   "CLOUDINARY_API_SECRET:",
//   process.env.CLOUDINARY_API_SECRET ? "✓ Loaded" : "✗ Missing"
// );
// console.log("====================================\n");

import connectDB from "./config/db.js";
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";

//Routes
import UserRoutes from "./routes/UserRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postCategoriesRoutes from "./routes/postCategoriesRoutes.js";

connectDB();
const app = express();
app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://sumanthbhegde.github.io",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Health check endpoint with Cloudinary configuration check
app.get("/api/health", (req, res) => {
  const cloudinaryConfigured = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    cloudinary: {
      configured: cloudinaryConfigured,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Not set",
      apiKey: process.env.CLOUDINARY_API_KEY ? "Set" : "Not set",
      apiSecret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Not set",
    },
    database: "Connected", // You can enhance this with actual DB check
  });
});

app.use("/api/users", UserRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//error handlers
app.use(errorResponseHandler);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
