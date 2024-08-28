import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';



const exerciseSchema = yup.object().shape({
  rapidApiId: yup.string().required('required'),
  set: yup.string().required('required'),
  description: yup.string().required('required'),
});

const initialValues = {
  rapidApiId: '',
  set: '',
  description: '',
};

const AddExercise = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (values, onSubmitProps) => {
    const savedExercise = await fetch('http://localhost:3001/exercises/rapid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const exercise = await savedExercise.json();
    onSubmitProps.resetForm();

    if (exercise) {
      onSubmitProps.resetForm();
    }
  };

  return (
    <div className='addexercise'>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={exerciseSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: 'span 4' },
              }}
            >
              <TextField
                label='RapidAPI ID'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rapidApiId}
                name='rapidApiId'
                error={
                  Boolean(touched.rapidApiId) && Boolean(errors.rapidApiId)
                }
                helperText={touched.rapidApiId && errors.rapidApiId}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                label='Number of sets'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.set}
                name='set'
                error={Boolean(touched.set) && Boolean(errors.set)}
                helperText={touched.set && errors.set}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                label='Additional instructions'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name='description'
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: '2rem 0',
                p: '1rem',
                color: 'black',
              }}
              onClick={() => navigate('/')}
            >
              Add an instruction for exercise
              
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddExercise;
