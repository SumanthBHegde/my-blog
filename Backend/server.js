import express, { request } from "express";
import dotenv from "dotenv";
import path from "path";
import { getGlobals } from "common-es";

import connectDB from "./config/db.js";
import {
  errorResponseHandler,
  invalidPathHandler,
} from "./middleware/errorHandler.js";

//Routes
import UserRoutes from "./routes/UserRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

console.log("check");

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", UserRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// static assets
const { __dirname } = getGlobals(import.meta.url);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//error handlers
app.use(errorResponseHandler);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
