import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom'; // Dodaj ovu liniju
import Reviews from '../components/Reviews';


const Review = () => {
  const [initialValues, setInitialValues] = useState({
    desc: '',
    userId: '',
  });

  //const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
  
    const getUser = async () => {
      const response = await fetch('http://localhost:3001/reviews', {
        method: 'GET',
      });
      const user = await response.json();
      setUserId(user._id); // Assuming the user object has an _id field
      setInitialValues((prevValues) => ({
        ...prevValues,
        userId: user._id,
      }));
    };

    getUser();
  }, []);

  const handleFormSubmit = async (values,  onSubmitProps) => {
    try {
      const response = await fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const savedReview = await response.json();
     // setReviews((prevReviews) => [...prevReviews, savedReview]); // Dodaj novu recenziju
     onSubmitProps.resetForm();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
  
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
    >

      {({ values, handleChange, handleSubmit, handleBlur }) => (
        
        <form onSubmit={handleSubmit}>
          <Box> <Reviews></Reviews> </Box>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: 'span 4' },
            }}
          >
            <TextField
              label='Your review'
              name='desc'
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: '2rem 0',
                p: '1rem',
                color: 'black',
              }}
            >
              {'SUBMIT REVIEW'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Review;
