import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await fetch(`http://localhost:3001/reviews`, {
        method: 'GET',
      });
      const reviews1 = await reviews.json();
      setReviews(reviews1);
    };

    getReviews();
  }, []);

 /* const SubmitReview = () => {
    const navigate = useNavigate();
    const handleFormSubmit = async (values, onSubmitProps) => {
      const savedReview = await fetch('http://localhost:3001/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const review = await savedReview.json();
      onSubmitProps.resetForm();
  
      if (review) {
        onSubmitProps.resetForm();
      }
    };*/
  

  return (
    
    <Formik >
     <Typography>Reviews</Typography>
      <Box>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Box key={review._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <p>{review.desc}</p>
              <small>User: {review.userId}</small>
            </Box>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </Box>
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
      <form  style={{ marginTop: '20px' }}>
      <TextField
                label='Review'
                onBlur={handleBlur}
                onChange={handleChange}
               // value={values.firstName}
                name='review'
              //  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              //  helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
        <Button fullWidth
    type='submit'
    
    sx={{
      m: '2rem 0',
      p: '1rem',
      color: 'black',
    }} >Submit Review</Button>
      </form> )}
      </Formik>
  );
};








export default Review;
