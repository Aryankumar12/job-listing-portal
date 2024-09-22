import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', padding: '0.75rem 1rem' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1.5,
            color: '#fff',
          }}
        >
          JOB PORTAL
        </Typography>

        <Box sx={{ flexGrow: 1 }} /> {/* Empty box to push content to the right */}

        {user && (
          <Typography
            variant="body1"
            sx={{
              display: 'inline-block', // Makes the background only cover the text
              backgroundColor: '#fff', // White background for username
              color: '#000', // Black text color
              padding: '0.5rem', // Add some padding
              fontWeight: 'bold',
              borderRadius: '4px', // Optional: rounded corners
              marginRight: 2, // Space between the text and buttons
            }}
          >
            Hello, {user.user.name || user.user.email}
          </Typography>
        )}

        <Box>
          {user ? (
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: '#fff', // White background for Logout
                color: '#000', // Black text color
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#f0f0f0' } // Light gray on hover
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                onClick={handleLogin}
                sx={{
                  backgroundColor: '#fff', // White background for Login
                  color: '#000', // Black text color
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#f0f0f0' } // Light gray on hover
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleRegister}
                sx={{
                  ml: 2,
                  backgroundColor: '#fff', // White background for Register
                  color: '#000', // Black text color
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#f0f0f0' } // Light gray on hover
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
