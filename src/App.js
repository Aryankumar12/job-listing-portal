import React from 'react';
import JobListing from './pages/JobListing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import JobDetail from './pages/JobDetail';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import JobSeeker from './pages/JobSeeker';
import EmployeeSeeker from './pages/EmployeeSeeker';
import CreateJob from './pages/CreateJob';

function App() {
  return (
    
    <UserProvider> {/* Wrap the app with UserProvider */}
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<JobListing />} />
            <Route path='/jobs/getJobById/:id' element={<JobDetail />} />
            <Route path="/jobseeker" element={<JobSeeker />} />
            {/* <Route path="/create-job" element={<CreateJob />} /> */}
            <Route path='/employeeseeker' element={<EmployeeSeeker />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
