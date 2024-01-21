import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos?.length) return 'Loading...';

  return (
    <Box sx={{ marginTop: { xs: '20px', lg: '200px' } }} p='20px'>
      <Typography variant='h3' mb='33px' fontWeight='bold'>
        Watch{' '}
        <span style={{ color: '#ff2625', textTransform: 'capitalize' }}>
          {name}
        </span>{' '}
        exercise videos
      </Typography>
      <Stack
        justifyContent='flex-start'
        flexWrap='wrap'
        alignItems='center'
        sx={{
          flexDirection: { lg: 'row' },
          gap: { xs: '0', lg: '110px' },
        }}
      >
        {exerciseVideos?.slice(0, 3).map((item, index) => (
          <a
            href={`https://www.youtube.com/watch?v=${item?.video?.videoId}`}
            target='_blank'
            rel='noreferrer'
            key={index}
            style={{ textDecoration: 'none' }}
          >
            <Card
              sx={{
                width: 400,
                height: 350,
                borderTop: '4px solid #ff2625',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s all ease-in-out',
                marginBottom: '10px',
              }}
            >
              <CardMedia
                image={item?.video?.thumbnails[0]?.url}
                sx={{
                  height: '200px',
                  width: '100%',
                  mb: 2,
                  border: '2px solid #e3e3e3',
                }}
              />
              <CardContent>
                <Typography
                  variant='subtitle1'
                  fontWeight='bold'
                  lineHeight={1.5}
                >
                  {item?.video?.title}
                </Typography>
                <Typography variant='subtitle2'>
                  {item?.video?.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant='body1' textAlign='right' pt={2}>
                  by {item?.video?.channelName},
                </Typography>
                <Typography variant='body1' textAlign='right' pt={2}>
                  {item?.video?.publishedTimeText}
                </Typography>
              </CardActions>
            </Card>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
