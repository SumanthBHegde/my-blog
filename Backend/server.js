import express, { request } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//Routes
import UserRoutes from "./routes/UserRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

console.log("check");

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));