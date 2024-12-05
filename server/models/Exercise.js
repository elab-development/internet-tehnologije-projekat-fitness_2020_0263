import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema(
  {
    rapidId: {
      type: String,
    },
    set: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise', ExerciseSchema);
export default Exercise;
