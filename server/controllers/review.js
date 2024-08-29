import Review from '../models/Review.js';

export const getReviews = async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

export const createReview = async (req, res) => {
  try {
    const { desc,userId} = req.body;

    const newReview = new Review({
       desc,
      userId,
    });
    await newReview.save();

    const reviews = await Review.find();
    res.status(201).json(reviews);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};




