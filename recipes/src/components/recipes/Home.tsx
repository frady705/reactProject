import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

const HomeContainer = styled(Box)({
  position: 'relative',
  width: '100vw', 
  height: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden', 
  marginTop: '64px', 
});

const BackgroundImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', 
  zIndex: 0, 
  opacity: 0.6,
});

const Title = styled(Typography)({
  color: 'white',
  fontSize: '3rem',
  textAlign: 'center',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
  zIndex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  padding: '10px 20px', 
  borderRadius: '10px', 
  boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)', 
});

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <BackgroundImage src="/images/6726658.jpg" alt="background" />
      <Title>ספר המתכונים שלי</Title>
    </HomeContainer>
  );
};

export default Home;
