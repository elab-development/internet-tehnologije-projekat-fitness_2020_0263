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
     //  type: mongoose.Schema.Types.ObjectId, // Ispravka: ObjectId umesto String
       ref: 'User', // Referenca na model User
      },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);
export default Review;