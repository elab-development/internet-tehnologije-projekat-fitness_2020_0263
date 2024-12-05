import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );
      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search)
      );

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      setSearch('');
      setExercises(searchedExercises);
    }
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );
      if (bodyPartsData) {
        setBodyParts(['all', ...bodyPartsData]);
      }
    };
    fetchExercisesData();
  }, []);

  return (
    <Stack alignItems='center' mt='37px' justifyContent='center' p='20px'>
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { xs: '30px', lg: '44px' },
        }}
        mb='50px'
        textAlign='center'
      >
        Awesome Exercises <br />
        You Should Know
      </Typography>
      <Box position='relative' mb='72px'>
        <TextField
          height='76px'
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder='Search Exercises...'
          type='text'
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { xs: '350px', lg: '1170px' },
            backgroundColor: '#fff',
            borderRadius: '40px',
          }}
        />
        <Button
          className='search-btn'
          sx={{
            bgcolor: '#ff2625',
            color: '#fff',
            textTransform: 'none',
            width: { xs: '80px', lg: '173px' },
            fontSize: { xs: '14px', lg: '20px' },
            height: '56px',
            position: 'absolute',
            right: '0px',
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        {bodyParts ? (
          <HorizontalScrollbar
            data={bodyParts}
            bodyParts
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        ) : (
          <Loader />
        )}
      </Box>
    </Stack>
  );
};

export default SearchExercises;
