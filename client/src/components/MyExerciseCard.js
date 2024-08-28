import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 
import { exerciseOptions, fetchData } from '../utils/fetchData';
 
const MyExerciseCard = ({ exercise }) => {
  const [rapidExercise, setRapidExercise] = useState(null);

  useEffect(() => {
    const getRapidExercise = async () => {
      const exercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${exercise}`,
        exerciseOptions
      );
      setRapidExercise(exercisesData);
    };
 
    getRapidExercise();
  }, [exercise]);
  
  return (
    <Box>
    <Link to={`/exercise/${exercise}`} className='exercise-card'>
      <img
        src={rapidExercise?.gifUrl}
        alt={rapidExercise?.name}
        loading='lazy'
      />
      </Link>
      <Stack direction='row'>
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#ffa9a9',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {rapidExercise?.bodyPart}
        </Button>
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: '#fcc757',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize',
          }}
        >
          {rapidExercise?.target}
        </Button>        
      </Stack>
      <Typography
        ml='21px'
        color='#000'
        fontWeight='bold'
        mt='11px'
        pb='10px'
        textTransform='capitalize'
        fontSize='22px'
      >
        {rapidExercise?.name}
      </Typography>
      </Box>
  );
};
 
export default MyExerciseCard;