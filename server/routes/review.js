import express from 'express';
import {
    getReviews,
    createReview
  
} from '../controllers/review.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);


export default router;
