import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const resetPasswordSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  newPassword: yup.string().required('required'),
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const initialValuesResetPassword = {
  email: '',
  newPassword: '',
};

const AuthForm = () => {
  const [pageType, setPageType] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = pageType === 'login';
  const isRegister = pageType === 'register';
  const isResetPassword = pageType === 'resetPassword'; //////

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      // creating empty plan
      await fetch('http://localhost:3001/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: savedUser._id,
        }),
      });
      setPageType('login');
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInUserResponse = await fetch(
      'http://localhost:3001/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInUserResponse.json();


    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      console.log(loggedIn.user._id);
      navigate('/');
    }
  };
const resetPassword = async (values, onSubmitProps) => {
  const response = await fetch('http://localhost:3001/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  const result = await response.json();
  onSubmitProps.resetForm();

  if (result) {
    alert('Password reset successful. You can now log in with the new password.');
    setPageType('login');
  } else {
    alert(result.message || 'An error occurred while resetting the password.');
  }
};

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
    if (isResetPassword) await resetPassword(values, onSubmitProps);
    
  };


return (
  <Formik
    onSubmit={handleFormSubmit}
    initialValues={isLogin ? initialValuesLogin : isRegister ? initialValuesRegister : initialValuesResetPassword}
    validationSchema={isLogin ? loginSchema : isRegister ? registerSchema : resetPasswordSchema}
  >
    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
      <form onSubmit={handleSubmit}>
        <Box
          display='grid'
          gap='30px'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          sx={{
            '& > div': { gridColumn: 'span 4' },
          }}
        >
          {isRegister && (
            <>
              <TextField
                label='First name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name='firstName'
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                label='Last name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name='lastName'
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: 'span 2' }}
              />
            </>
          )}

          {(isLogin || isRegister) && (
            <>
              <TextField
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label='Password'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name='password'
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
            </>
          )}

          {isResetPassword && (
            <>
              <TextField
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name='email'
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label='New Password'
                type='password'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.newPassword}
                name='newPassword'
                error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                sx={{ gridColumn: 'span 4' }}
              />
            </>
          )}
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
    {isLogin ? 'LOGIN' : isRegister ? 'REGISTER' : 'RESET PASSWORD'}
  </Button>

  {isLogin && (
    <>
      <Typography
        onClick={() => {
          setPageType('register');
          resetForm();
        }}
        sx={{
          textDecoration: 'underline',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        Don't have an account? Sign Up here.
      </Typography>

      <Typography
        onClick={() => {
          console.log('Reset password clicked');
          setPageType('resetPassword');
          resetForm();
        }}
        sx={{
          textDecoration: 'underline',
          '&:hover': {
            cursor: 'pointer',
          },
          mt: '1rem',
        }}
      >
        Forgot your password? Reset here.
      </Typography>
    </>
  )}

  {!isLogin && (
    <Typography
      onClick={() => {
        setPageType('login');
        resetForm();
      }}
      sx={{
        textDecoration: 'underline',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      Already have an account? Login here.
    </Typography>
  )}
</Box>
</form>
      )}
    </Formik>
  );
};

export default AuthForm;
