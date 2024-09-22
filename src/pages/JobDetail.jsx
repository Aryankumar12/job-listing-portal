import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Box, Divider, Grid, Chip, IconButton, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import DOMPurify from 'dompurify'; // Import dompurify

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/getJobById/${id}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    const fetchUser = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData ? userData.user : null);
    };

    fetchJobDetails();
    fetchUser();
  }, [id]);

  const handleApply = async () => {
    if (!jobDetails || !user) return;

    if (user.role !== 'jobseeker') {
      setSnackbarMessage('Only job seekers can apply for this job.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/jobs/jobseeker/apply',
        { jobId: jobDetails._id, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbarMessage('Application submitted successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Failed to submit application. Please try again.');
      setSnackbarSeverity('error');
      console.error('Error applying for job:', error.response.data);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const snackbarStyle = {
    backgroundColor: snackbarSeverity === 'error' ? 'red' : snackbarSeverity === 'success' ? 'green' : 'blue',
  };

  if (!jobDetails) return <Typography>Loading...</Typography>;

  // Sanitize the job description and requirements
  const sanitizedDescription = DOMPurify.sanitize(jobDetails.description);
  const sanitizedRequirements = jobDetails.requirements ? jobDetails.requirements.split(',').map(req => DOMPurify.sanitize(req.trim())) : [];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold' }}>
          {jobDetails.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 3 }}>
          {jobDetails.company} | {jobDetails.type} | {jobDetails.location}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 2, boxShadow: 6 }}>
              <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 2 }}>
                Job Description
              </Typography>
              <Typography paragraph sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: sanitizedDescription }} /> {/* Use dangerouslySetInnerHTML here */}

              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Requirements
              </Typography>
              <Box sx={{ mb: 3 }}>
                {sanitizedRequirements.length > 0 ? (
                  sanitizedRequirements.map((req, index) => (
                    <Chip
                      key={index}
                      label={req}
                      sx={{ m: 0.5 }}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                  ))
                ) : (
                  <Typography>No requirements listed.</Typography>
                )}
              </Box>

              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                Salary Range
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold', mb: 3 }}>
                $ {jobDetails.salaryRange}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {user && user.role === 'jobseeker' ? (
                  <Button variant="contained" color="primary" size="large" onClick={handleApply}>
                    Apply Now
                  </Button>
                ) : (
                  <Typography color="text.secondary">Only job seekers can apply for this job.</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          ContentProps={{
            sx: snackbarStyle,
          }}
        />
      </Container>
    </Layout>
  );
};

export default JobDetail;
