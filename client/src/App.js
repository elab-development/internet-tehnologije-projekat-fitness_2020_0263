import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddExercise from './pages/AddExercise';
import Plan from './pages/Plan';
import Review from './pages/Review';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const isAdmin = Boolean(useSelector((state) => state.user?.admin));
  const [user, setUser] = useState([]);

  return (
    <Box width='400px' sx={{ width: { xl: '1488px' } }} m='auto'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/dashboard'
          element={isAuth && isAdmin ? <Dashboard /> : <Navigate to='/' />}
        />
        <Route
          path='/addexercise'
          element={isAuth && isAdmin ? <AddExercise /> : <Navigate to='/' />}
        />
        <Route
          path='/plan'
          element={!isAuth ? <Navigate to='/' /> : <Plan />}
        />
        <Route
          path='/login'
          element={isAuth ? <Navigate to='/' /> : <Login />}
        />
        <Route path='/exercise/:id' element={<ExerciseDetail />} />
        <Route path='/reviews' element={<Review />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
