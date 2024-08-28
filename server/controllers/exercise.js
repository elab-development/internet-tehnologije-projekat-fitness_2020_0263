import Exercise from '../models/Exercise.js';
 
export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
 
export const getExerciseByRapid = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findOne({
      rapidId: id,
    });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
 
export const createExerciseWithoutRapid = async (req, res) => {
  try {
    const { name, description } = req.body;
 
    const newExercise = new Exercise({
      name,
      description,
    });
    await newExercise.save();
 
    const exercises = await Exercise.find();
    res.status(201).json(exercises);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
 
export const createExerciseWithRapid = async (req, res) => {
  try {
    const { rapidApiId, name, description } = req.body;
 
    const newExercise = new Exercise({
      rapidId: rapidApiId,
      name,
      description,
    });
    await newExercise.save();
 
    const exercises = await Exercise.find();
    res.status(201).json(exercises);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};