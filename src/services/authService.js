// src/services/authService.js
import axios from '../api/axios';

export const register = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
