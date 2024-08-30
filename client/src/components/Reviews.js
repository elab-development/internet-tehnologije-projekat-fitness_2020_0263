import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const Reviews = () => {

    const [reviews, setReviews] = useState([]);
useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch('http://localhost:3001/reviews');
        const reviewsData = await response.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    getReviews();
  }, []);

  return(
    <form>

  
  <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
            Reviews
          </Typography>
          <Box>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Box key={review._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                  <p>{review.desc}</p>
                  <small>User: {review.userId.email}</small> 
                </Box>
              ))
            ) : (
              <p>No reviews available</p>
            )}
          </Box>
          </form>
  );
};
  export default Reviews;