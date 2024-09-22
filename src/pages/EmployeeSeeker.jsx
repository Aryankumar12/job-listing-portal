import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import Layout from '../components/Layout'; // Ensure you have the Layout component

const EmployeeSeeker = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState(50000); // Default salary value
  const [requirements, setRequirements] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user ? user.token : null;
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      await axios.post(
        'http://localhost:5000/api/jobs/employeeseeker/create',
        {
          title,
          company,
          type,
          location,
          description,
          salaryRange: salary, // Change this line
          requirements,
        },
        config
      );
  
      setSnackbarMessage('Job created successfully!');
      setSnackbarOpen(true);
      // Reset fields
      setTitle('');
      setCompany('');
      setType('');
      setLocation('');
      setDescription('');
      setSalary(50000); // Reset to default salary
      setRequirements('');
    } catch (error) {
      setError('Error creating job. Please try again.');
      console.error(error);
    }
  };
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSalaryChange = (event, newValue) => {
    setSalary(newValue);
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ marginY: 4, backgroundColor: '#f5f5f5', padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Create Job
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Job Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            margin="normal"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="job-type-label">Job Type</InputLabel>
            <Select
              labelId="job-type-label"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="Full-Time">Full-Time</MenuItem>
              <MenuItem value="Part-Time">Part-Time</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            label="Job Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <Typography gutterBottom>Salary: ${salary}</Typography>
          <Slider
            value={salary}
            onChange={handleSalaryChange}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
            step={1000}
            marks
          />
          <TextField
            label="Requirements"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
            sx={{ backgroundColor: 'white' }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, width: '100%' }}>
            Create Job
          </Button>
        </form>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default EmployeeSeeker;
