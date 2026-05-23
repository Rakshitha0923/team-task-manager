import dashboardRoutes from "./routes/dashboardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));