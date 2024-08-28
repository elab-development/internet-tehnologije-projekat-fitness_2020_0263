import express from 'express';
import {
  getExercises,
  createExerciseWithRapid,
  createExerciseWithoutRapid,
  getExerciseByRapid,
} from '../controllers/exercise.js';

const router = express.Router();

router.get('/', getExercises);
router.get('/rapid/:id', getExerciseByRapid);
router.post('/', createExerciseWithoutRapid);
router.post('/rapid', createExerciseWithRapid);

export default router;
