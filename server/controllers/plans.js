import Plan from '../models/Plan.js';

export const getPlanByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findOne({
      userId: id,
    });
    res.status(200).json(plan);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPlan = async (req, res) => {
  try {
    const { id } = req.body;

    const newPlan = new Plan({
      userId: id,
    });
    await newPlan.save();

    const plans = await Plan.find();
    res.status(201).json(plans);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { userId, exerciseId } = req.body;

    const plan = await Plan.findOne({
      userId: userId,
    });
    let exercisesArray = plan.exercises;
    exercisesArray.push(exerciseId);

    const updatedPlan = await Plan.findOneAndUpdate(
      { userId: userId },
      {
        exercises: exercisesArray,
      },
      { new: true }
    );

    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const removeExerciseFromPlan = async (req, res) => {
  try {
    
    const { userId, exerciseId } = req.body;

    const plan = await Plan.findOne({
      userId: userId,
    });
    let exercisesArray = plan.exercises;
    console.log(exercisesArray);
    const index = exercisesArray.indexOf(exerciseId);
    if (index !== -1) {
      // Remove the element using splice
      exercisesArray.splice(index, 1);
    }
    
    console.log(exercisesArray);
    //exercisesArray.pull(exerciseId);

    const updatedPlan = await Plan.findOneAndUpdate(
      { userId: userId },
      { exercises: exercisesArray, }, 
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
