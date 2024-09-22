// src/services/jobService.js
import axios from '../api/axios';

export const getJobs = async () => {
  try {
    const response = await axios.get('/jobs');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createJob = async (jobData, token) => {
  try {
    const response = await axios.post('/jobs/create', jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const applyForJob = async (applicationData, token) => {
  try {
    const response = await axios.post('/jobs/apply', applicationData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
