import React from 'react';
import { Box, Typography, Button } from '@mui/material';

import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        mt: { xs: '70px', lg: '212px' },
        ml: { sm: '50px' },
      }}
      position='relative'
      p='20px'
    >
      <Typography color='#ff2625' fontWeight={600} fontSize='26px'>
        FITNESS CLUB
      </Typography>
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { xs: '40px', lg: '44px' },
        }}
        mb='23px'
        mt='30px'
      >
        Sweat, Smile <br /> & Repeat
      </Typography>
      <Typography fontSize='22px' lineHeight='35px' mb={4}>
        Check out the most effective exercises
      </Typography>
      <Button
        variant='contained'
        color='error'
        href='#exercises'
        sx={{
          backgroundColor: '#ff2625',
          padding: '10px 20px',
          borderRadius: '30px',
        }}
      >
        Explore Exercises
      </Button>
      <Typography
        fontWeight={600}
        color='#ff2625'
        sx={{
          opacity: 0.1,
          display: { xs: 'none', lg: 'block' },
        }}
        fontSize='200px'
        mt={5}
      >
        Exercise
      </Typography>
      <img src={HeroBannerImage} alt='banner' className='hero-banner-img' />
    </Box>
  );
};

export default HeroBanner;
