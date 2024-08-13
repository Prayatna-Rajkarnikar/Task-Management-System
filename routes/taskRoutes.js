import { Router } from "express";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controller/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/addTask", authMiddleware, addTask);
router.delete("/deleteTask", authMiddleware, deleteTask);
router.put("/updateTask", authMiddleware, updateTask);
router.get("/getTask", authMiddleware, getTask);

export default router;
