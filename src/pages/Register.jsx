import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout'; // Import the Layout component

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'jobseeker' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log(response.data); // Log successful response

      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred'); // Improved error handling
    }
  };

  return (
    <Layout> {/* Wrap content with Layout component */}
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', p: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center', backgroundColor: 'white' }}>
          <Typography variant="h5" gutterBottom>Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              margin="normal"
              select
              SelectProps={{ native: true }}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employeeseeker">Employee Seeker</option>
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <a href="/login">Login</a>
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
