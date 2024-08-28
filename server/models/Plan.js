import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    exercises: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model('Plan', PlanSchema);
export default Plan;
