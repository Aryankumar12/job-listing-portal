import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // retrieve token
      const response = await axios.post(
        'http://localhost:5000/api/jobs',
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token in header
          },
        }
      );
      navigate('/'); // Redirect to homepage or job listing page after successful job creation
    } catch (err) {
      setError('Failed to create job');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Create New Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Job Type"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            margin="normal"
            select
            SelectProps={{ native: true }}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Create Job
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default JobForm;
