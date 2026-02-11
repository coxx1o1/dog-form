import express from 'express';
import {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} from '../controllers/dogController.js';

const router = express.Router();

router.route('/')
.get(getAllDogs)
.post(createDog);
router.route('/:id')
.get(getDogById)
.put(updateDog)
.delete(deleteDog);

export default router;
