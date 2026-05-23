import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjects,
  addMember,
  removeMember,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getProjects);

router.put("/add-member", authMiddleware, addMember);

router.put(
  "/remove-member",
  authMiddleware,
  removeMember
);

export default router;
