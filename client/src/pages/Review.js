import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import Reviews from '../components/Reviews';
import { useSelector } from 'react-redux';


const Review = () => {
  const isAdmin = Boolean(useSelector((state) => state.user?.admin));
  const user = useSelector((state) => state.user);
  const [initialValues, setInitialValues] = useState({
    desc: '',
    userId: user._id,
  });
  
  console.log(initialValues);

  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null); 

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3001/reviews');
      const data = await response.json();
      setReviews(data);  // Set the fetched reviews
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);


  const handleFormSubmit = async (values,  onSubmitProps) => {
    try {
      const response = await fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      console.log(values);
      const savedReview = await response.json();
     // setReviews((prevReviews) => [...prevReviews, savedReview]); // Dodaj novu recenziju
     onSubmitProps.resetForm();

     if (savedReview) {
      //onSubmitProps.resetForm();
      fetchReviews();
    }
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
          <Box> <Reviews reviews={reviews}></Reviews> </Box>
          
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: 'span 4' },
            }}
          >
            {!isAdmin && (
              <>
            <TextField
              label='Your review'
              name='desc'
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ gridColumn: 'span 4' }}
            />
             </>
            )}
          </Box>

          <Box>
          {!isAdmin && (
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
          )}
          </Box>
         
        </form>
      )}
    </Formik>
  );
};

export default Review;
