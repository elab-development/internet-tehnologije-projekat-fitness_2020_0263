import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({ exerciseDetail, additional, sets }) => {
  const [inPlan, setInPlan] = useState(false);
  const isAuth = Boolean(useSelector((state) => state.token));
  const { name, target, equipment, bodyPart, gifUrl } = exerciseDetail;
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];
const handleAdd = async () => {
  const res = await fetch('http://localhost:3001/plans', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user._id,
      exerciseId: id,
    }),
  });

  if (res.ok) {
    setInPlan(true);
  }
};

const handleRemove = async () => {
  const res = await fetch('http://localhost:3001/plans', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user._id,
      exerciseId: id,
    }),
  });

  if (res.ok) {
    setInPlan(false);
  }
};

useEffect(() => {
  const getPlan = async () => {
    if (user?._id) {
      const userPlan = await fetch(`http://localhost:3001/plans/${user._id}`, {
        method: 'GET',
      });
      const plan = await userPlan.json();

      plan?.exercises.forEach((exercise) => {
        if (exercise === id) {
          setInPlan(true);
        }
      });
    }
  };

  getPlan();
}, [id, user?._id]); 

  return (
    <Stack
      gap='60px'
      sx={{
        flexDirection: { lg: 'row' },
        p: '20px',
        alignItems: 'center',
      }}
    >
      <img src={gifUrl} alt={name} loading='lazy' className='detail-image' />
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography
          sx={{ fontSize: { lg: '64px', xs: '30px' } }}
          fontWeight={700}
          textTransform='capitalize'
        >
          {name}
        </Typography>
        <Typography
          sx={{ fontSize: { lg: '24px', xs: '18px' } }}
          color='#4F4C4C'
        >
          Exercises keep you strong.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> bup is one
          of the best <br /> exercises to target your {target}. It will help you
          improve your <br /> mood and gain energy.
        </Typography>
        {isAuth && (
          <>
            {sets.length > 0 && (
              <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }}>
                Number of sets: {sets}
              </Typography>
            )}
            {additional.length > 0 && (
              <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }}>
                Our Trainers said: {additional}
              </Typography>
            )}
            {!user.admin && (
              <>
              {!inPlan && (
            <Button
              sx={{
                background: '#FFF2DB',
                width: '200px',
                height: '50px',
                color: '#000',
                border: '2px solid #ff2625',
              }}
              onClick={handleAdd}
             // disabled={inPlan}
            >
              Add To Your Plan
            </Button>
            )}
            {inPlan && (
            <Button
            sx={{
              background: '#FFF2DB',
              width: '250px',
              height: '50px',
              color: '#000',
              border: '2px solid #ff2625',
            }}
            onClick={handleRemove}
            //disabled={!inPlan}
          >
            Remove From Your Plan
          </Button>
          )}
          </>
            )}
          </>
        )}

        {extraDetail?.map((item) => (
          <Stack key={item.name} direction='row' gap='24px' alignItems='center'>
            <Button
              sx={{
                background: '#FFF2DB',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
              }}
            >
              <img
                src={item.icon}
                alt={bodyPart}
                style={{ width: '50px', height: '50px' }}
              />
            </Button>
            <Typography
              textTransform='capitalize'
              sx={{ fontSize: { lg: '30px', xs: '20px' } }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
