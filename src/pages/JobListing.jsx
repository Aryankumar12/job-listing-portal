import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  TextField,
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from '@mui/material';
import JobCard from '../components/JobCard';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [jobTypeAnchorEl, setJobTypeAnchorEl] = useState(null);
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get user context

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (jobTypeFilter === '' || job.type === jobTypeFilter) &&
    (locationFilter === '' || job.location === locationFilter)
  );

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleJobTypeClick = (event) => {
    setJobTypeAnchorEl(event.currentTarget);
  };

  const handleLocationClick = (event) => {
    setLocationAnchorEl(event.currentTarget);
  };

  const handleJobTypeSelect = (type) => {
    setJobTypeFilter(type);
    setJobTypeAnchorEl(null);
    setFilterAnchorEl(null);
  };

  const handleLocationSelect = (location) => {
    setLocationFilter(location);
    setLocationAnchorEl(null);
    setFilterAnchorEl(null);
  };

  const handleClose = () => {
    setFilterAnchorEl(null);
    setJobTypeAnchorEl(null);
    setLocationAnchorEl(null);
  };

  const handleJobSeekerClick = () => {
    if (!user) {
      setSnackbarMessage('User not logged in. Please log in to continue.');
      setSnackbarOpen(true);
    } else {
      navigate('/jobseeker');
    }
  };

  const handleEmployeeSeekerClick = () => {
    if (!user) {
      setSnackbarMessage('User not logged in. Please log in to continue.');
      setSnackbarOpen(true);
    } else if (user.user.role === 'employeeseeker') {
      navigate('/employeeseeker');
    } else {
      setSnackbarMessage('You do not have permission to access this page.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Layout>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Listings
          </Typography>
          <Button
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: 'gray',
              },
              marginRight: 2,
            }}
            onClick={handleJobSeekerClick}
          >
            Job Seeker
          </Button>
          <Button
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: 'gray',
              },
            }}
            onClick={handleEmployeeSeekerClick}
          >
            Employee Seeker
          </Button>
        </Toolbar>
      </AppBar>
      <HeroSection />
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Listings
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <TextField
            label="Search Jobs"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterClick}
            style={{ marginLeft: '16px' }}
          >
            Filter
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleJobTypeClick}>Job Type</MenuItem>
            <MenuItem onClick={handleLocationClick}>Location</MenuItem>
          </Menu>
          <Menu
            anchorEl={jobTypeAnchorEl}
            open={Boolean(jobTypeAnchorEl)}
            onClose={() => setJobTypeAnchorEl(null)}
          >
            <MenuItem onClick={() => handleJobTypeSelect('')}>All Job Types</MenuItem>
            <MenuItem onClick={() => handleJobTypeSelect('Full-Time')}>Full-Time</MenuItem>
            <MenuItem onClick={() => handleJobTypeSelect('Part-Time')}>Part-Time</MenuItem>
            <MenuItem onClick={() => handleJobTypeSelect('Freelance')}>Freelance</MenuItem>
          </Menu>
          <Menu
            anchorEl={locationAnchorEl}
            open={Boolean(locationAnchorEl)}
            onClose={() => setLocationAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLocationSelect('')}>All Locations</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Noida')}>Noida</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Delhi')}>Delhi</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Mumbai')}>Mumbai</MenuItem>
            <MenuItem onClick={() => handleLocationSelect('Pune')}>Pune</MenuItem>
          </Menu>
        </div>
        <Grid container spacing={3}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job._id}>
                <JobCard job={job} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No jobs found</Typography>
          )}
        </Grid>
      </Container>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default JobListings;
