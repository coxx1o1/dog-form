import express from 'express';
import {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} from '../controllers/dogController.js';
import { protect } from "../middleware/authMiddleware.js"; // Import protect middleware

const router = express.Router();

// Apply protect middleware to all dog routes that require authentication
router.route('/')
.get(protect, getAllDogs)
.post(protect, createDog);
router.route('/:id')
.get(protect, getDogById)
.put(protect, updateDog)
.delete(protect, deleteDog);

export default router;
