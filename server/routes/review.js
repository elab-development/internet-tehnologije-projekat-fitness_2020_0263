import express from 'express';
import {
    getReviews,
    createReview
  
} from '../controllers/review.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);

export default router;
