import React from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000', // Changed to black
        padding: '16px',
        marginTop: 'auto',
        color: 'white', // Ensuring text is white for visibility
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" gutterBottom>
          © 2024 Job Portal. All rights reserved.
        </Typography>
        <Box>
          <IconButton color="inherit" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon sx={{ color: 'white' }} /> {/* Ensuring icons remain white */}
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterIcon sx={{ color: 'white' }} />
          </IconButton>
          <IconButton color="inherit" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
