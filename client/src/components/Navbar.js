import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';

import Logo from '../assets/images/Logo.png';
import { setLogout } from '../state';

const Navbar = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Stack
      direction='row'
      justifyContent='space-around'
      sx={{
        gap: { xs: '40px', sm: '122px' },
        mt: { xs: '20px', sm: '32px' },
        justifyContent: 'none',
      }}
      px='20px'
    >
      <Link to='/'>
        <img
          src={Logo}
          alt='logo'
          style={{ width: '48px', height: '48px', margin: '0 20px' }}
        />
      </Link>
      <Stack direction='row' gap='40px' fontSize='24px' alignItems='flex-end'>
        <Link
          to='/'
          style={{
            textDecoration: 'none',
            color: '#3a1212',
            borderBottom: '3px solid #ff2625',
          }}
        >
          Home
        </Link>
        {user?.admin && (
          <Link
            style={{
              textDecoration: 'none',
              color: '#3a1212',
              borderBottom: '3px solid #fffafb',
            }}
            to='/dashboard'
          >
            Dashboard
          </Link>
        )}
        {isAuth && !user?.admin && (
          <Link
            style={{
              textDecoration: 'none',
              color: '#3a1212',
              borderBottom: '3px solid #fffafb',
            }}
            to='/plan'
          >
            My Plan
          </Link>
        )}

        {isAuth ? (
          <Typography
            fontSize={24}
            onClick={() => {
              navigate('/');
              dispatch(setLogout());
            }}
            sx={{ cursor: 'pointer' }}
          >
            Logout
          </Typography>
        ) : (
          <Link
            to='/login'
            style={{
              textDecoration: 'none',
              color: '#3a1212',
            }}
          >
            Login
          </Link>
        )}
         <Link
          to='/reviews'
          style={{
            textDecoration: 'none',
            color: '#3a1212',
            borderBottom: '3px solid #ff2625',
          }}
        >
          Reviews
        </Link>
      </Stack>
    </Stack>
  );
};

export default Navbar;
