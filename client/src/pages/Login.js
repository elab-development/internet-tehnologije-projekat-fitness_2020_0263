import React from 'react';
import { Box, Typography } from '@mui/material';

import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <Box>
      <Box width='100%' p='1rem 6%' textAlign='center'></Box>
      <Box p='2rem' m='2rem auto' borderRadius='1.5rem'>
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
          Welcome to Fitness App!
        </Typography>
        <AuthForm />
      </Box>
    </Box>
  );
};

export default Login;
