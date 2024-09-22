// src/components/HeroSection.jsx
import React from 'react';
import Slider from 'react-slick';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styling for the hero container
const HeroContainer = styled(Box)(({ theme }) => ({
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden', // Prevents overflow of the carousel images
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}));

const SlideImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));

const SlideImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensures image covers the area without overflowing
});

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% opacity
  zIndex: 1,
}));

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         // Enable autoplay
    autoplaySpeed: 3000,    // Time in milliseconds for each slide
    arrows: false,          // Optional: Hide default arrows
  };

  return (
    <HeroContainer>
      <CarouselContainer>
        <Slider {...settings}>
          <SlideImageContainer>
            <SlideImage
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Slide 1"
            />
            <Overlay />
          </SlideImageContainer>
          <SlideImageContainer>
            <SlideImage
              src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Slide 2"
            />
            <Overlay />
          </SlideImageContainer>
          <SlideImageContainer>
            <SlideImage
              src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Slide 3"
            />
            <Overlay />
          </SlideImageContainer>
        </Slider>
      </CarouselContainer>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Responsive font size
            fontWeight: 'bold', // Make text bold
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Add shadow for better readability
          }}
        >
          Find Your Dream Job
        </Typography>
       
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
