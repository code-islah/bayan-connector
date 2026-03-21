import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config({ path: "../.env" });
import connectDB from "./config/db.js";

const app = express();
const PORT = 3434;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Bayan Connector API");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
