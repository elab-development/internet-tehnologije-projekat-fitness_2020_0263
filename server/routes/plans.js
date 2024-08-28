import express from 'express';
import {
  createPlan,
  getPlanByUserId,
  updatePlan,
  removeExerciseFromPlan
} from '../controllers/plans.js';

const router = express.Router();

router.get('/:id', getPlanByUserId);
router.post('/', createPlan);
router.put('/', updatePlan);
router.delete('/', removeExerciseFromPlan);

export default router;
