// src/pages/CreateJob.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the token from localStorage or context (after login)
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in Authorization header
        },
      };

      const response = await axios.post(
        'http://localhost:5000/api/jobs/create',
        { title, company, type, location }, // Payload for job creation
        config
      );

      setSuccess('Job created successfully!');
      setTitle('');
      setCompany('');
      setType('');
      setLocation('');
    } catch (error) {
      setError('Error creating job. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Job Listing
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Job Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Job
        </Button>
      </form>
    </Container>
  );
};

export default CreateJob;
