import adminMiddleware from "../middleware/adminMiddleware.js";
import Task from "../models/Task.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createTask
);

router.get("/", authMiddleware, getTasks);

router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTask
);

export default router;