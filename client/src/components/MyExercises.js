import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyExerciseCard from './MyExerciseCard';

const MyExercises = ({ exercises }) => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [inPlan, setInPlan] = useState(false);

  const handleRemove = async () => {
    console.log("delete");
    const res = await fetch('http://localhost:3001/plans', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user._id,
        exerciseId: id,
      }),
    });
    console.log("delete");

    if (res) {
      setInPlan(false);
    }
    console.log("delete");
  };
  useEffect(() => {
    const getPlan = async () => {
      const userPlan = await fetch(`http://localhost:3001/plans/${user?._id}`, {
        method: 'GET',
      });
      const plan = await userPlan.json();

      plan?.exercises.map((exercise) => {
        if (exercise === id) {
          setInPlan(false);
        }
      });
    };

    getPlan();
  }, [id]);

  return (
    <Box
      id='exercises'
      sx={{
        mt: { lg: '110px' },
      }}
      mt='50px'
      p='20px'
    >
      <Typography variant='h3' mb='46px'>
        Your Exercises
      </Typography>
      <Stack
        direction='row'
        sx={{
          gap: { xs: '50px', lg: '110px' },
        }}
        flexWrap='wrap'
        justifyContent='center'
      >
        
        {exercises.map((exercise, index) => (
          
          <MyExerciseCard exercise={exercise} key={index}/>
          
              
        ))}
        
      </Stack>
    </Box>
  );
};

export default MyExercises;
