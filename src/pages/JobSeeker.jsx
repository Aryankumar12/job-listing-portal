import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Divider, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { UserContext } from '../context/UserContext';
import DOMPurify from 'dompurify'; // Import DOMPurify

const JobSeeker = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); 

  const [profile, setProfile] = useState({
    name: user.user?.name || '',
    email: user.user?.email || '',
    skills: '',
    education: '',
    experience: '',
  });

  const [resume, setResume] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Handle input changes for profile fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Sanitize the input value
    const sanitizedValue = DOMPurify.sanitize(value);
    setProfile({ ...profile, [name]: sanitizedValue });
  };

  // Handle resume file selection
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setSnackbarMessage(`Resume "${file.name}" selected successfully!`);
      setSnackbarOpen(true);
    }
  };

  // Handle closing of the snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Update profile and show snackbar notification
  const handleProfileUpdate = () => {
    // Here you would typically send the sanitized profile data to your backend
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarOpen(true);
  };

  // Navigate to job listings
  const handleJobSeekerClick = () => {
    navigate('/'); // Replace with actual path to job listings or apply page
  };

  return (
    <Layout>
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Job Seeker Profile
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Profile Management
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Skills"
                variant="outlined"
                fullWidth
                name="skills"
                value={profile.skills}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Education"
                variant="outlined"
                fullWidth
                name="education"
                value={profile.education}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Experience"
                variant="outlined"
                fullWidth
                name="experience"
                value={profile.experience}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileUpdate}
            sx={{ mt: 2 }}
          >
            Update Profile
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Resume Management
          </Typography>
          <Divider sx={{ my: 2 }} />
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleResumeChange}
            style={{ marginBottom: '16px' }}
          />
          {resume && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                Selected file: {resume.name}
              </Typography>
            </Box>
          )}
        </Box>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleJobSeekerClick}
          sx={{ mt: 2 }}
        >
          Apply for Jobs
        </Button>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default JobSeeker;
