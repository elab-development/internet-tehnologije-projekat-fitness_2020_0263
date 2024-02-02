import React, { useState } from 'react';
import { Box } from '@mui/material';

//import HeroBanner from '../components/HeroBanner';
import Exercises from '../components/Exercises';

const AllExercises = () => {
  const [bodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);

  return (
    <Box>
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default AllExercises;