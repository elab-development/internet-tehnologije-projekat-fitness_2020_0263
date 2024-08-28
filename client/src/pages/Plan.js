import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MyExercises from '../components/MyExercises';

const Plan = () => {
  const [exercises, setExercises] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getPlan = async () => {
      const userPlan = await fetch(`http://localhost:3001/plans/${user?._id}`, {
        method: 'GET',
      });
      const plan = await userPlan.json();
      setExercises(plan.exercises);
    };

    getPlan();
  }, []);

  return (
    <Box>
      {exercises.length === 0 ? (
        <Typography>You haven't added any exercises to your plan</Typography>
      ) : (
        <MyExercises exercises={exercises} />
      )}
    </Box>
  );
};

export default Plan;
