import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    desc: {
        type: String,
       required: true,
    },
    userId: {
        type: String,
       required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);
export default Review;