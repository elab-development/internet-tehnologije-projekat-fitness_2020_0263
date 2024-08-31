import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Img from '../assets/icons/body-part.png';
import Img2 from '../assets/icons/gym.png';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box height='60vh'>
      <Typography variant='h2' sx={{ marginTop: '50px' }}>
        Admin Dashboard
      </Typography>
      <div className='admin-dash'>
        <div className='admin-card' onClick={() => navigate('/addexercise')}>
          <img src={Img} />
          <Typography variant='h5'>Add an instruction for exercise</Typography>
        </div>
      </div>
    </Box>

    
  );
};

export default Dashboard;
