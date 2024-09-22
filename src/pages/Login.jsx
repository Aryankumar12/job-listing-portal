import React, { useContext, useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserContext';
import { useLocation } from 'react-router-dom';


const LoginPage = () => {
  const { login } = useContext(UserContext);
  const location = useLocation(); // Get the current location (URL)
const queryParams = new URLSearchParams(location.search); // Extract query params
const roleFromUrl = queryParams.get('role'); // Get the 'role' parameter

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validateForm = () => {
    setEmailError(!email);
    setPasswordError(!password);
    return email && password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setLoading(false);
      
      if (response.ok && data.token) {
        login(data);
      
        console.log('Role from URL:', roleFromUrl); // Debugging role
      
        // Ensure roleFromUrl is valid and trimmed
        if (roleFromUrl?.trim() === 'jobseeker') {
          navigate('/jobseeker');
        } else if (roleFromUrl?.trim() === 'employeeseeker') {
          navigate('/employeeseeker');
        } else {
          // Default case if role doesn't match
          navigate('/');
        }
      } else {
        setError('Invalid email or password');
      }
      
    } catch (err) {
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign In
          </Typography>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? 'Email is required' : ''}
              autoComplete="email"
              autoFocus
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? 'Password is required' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs>
                <Typography variant="body2" color="textSecondary">
                  <a href="/forgot-password">Forgot password?</a>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Don’t have an account? <a href="/register">Register</a>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
