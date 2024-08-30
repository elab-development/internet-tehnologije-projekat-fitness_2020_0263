import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState([]);
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
    <Formik
     // onSubmit={handleFormSubmit}
      //initialValues={isLogin ? initialValuesLogin : isRegister ? initialValuesRegister : initialValuesResetPassword}
      //validationSchema={isLogin ? loginSchema : isRegister ? registerSchema : resetPasswordSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
      
        <form >
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
                  //type='password'
                 // onBlur={handleBlur}
                  //onChange={handleChange}
                  //value={values.newPassword}
                  name='review'
              //    error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
                 // helperText={touched.newPassword && errors.newPassword}
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
      { 'SUBMIT REVIEW'}
    </Button>
  
  </Box>
  </form>
        )}
      </Formik>
    );
};









export default Review;
