import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import protect middleware

const router = express.Router();

// Apply protect middleware to all message routes that require authentication
router.post("/", protect, createMessage);
router.get("/", protect, getMessages);
router.delete("/:id", protect, deleteMessage);

export default router;
