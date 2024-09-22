import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" overflow="hidden">
      <Header />
      <Box component="main" flexGrow={1} paddingX={2} marginY={3}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;