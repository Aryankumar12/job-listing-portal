import React from 'react'; // Import React
import { render, screen } from '@testing-library/react';
import JobCard from '../components/JobCard';

const mockJob = {
  _id: '1',
  title: 'Software Engineer',
  company: 'Tech Company',
  type: 'Full-time',
  location: 'Remote',
};

test('renders the JobCard component with job details', () => {
    render(<JobCard job={mockJob} />);
    
    // Check for job title
    const titleElement = screen.getByText(/Software Engineer/i);
    expect(titleElement).toBeInTheDocument();
    
    // Check for company name
    const companyElement = screen.getByText(/Tech Company/i);
    expect(companyElement).toBeInTheDocument();
    
    // Check for job type
    const typeElement = screen.getByText(/Type: Full-time/i);
    expect(typeElement).toBeInTheDocument();
    
    // Check for job location
    const locationElement = screen.getByText(/Location: Remote/i);
    expect(locationElement).toBeInTheDocument();

    // Check for the "Apply Now" button
    const applyButton = screen.getByRole('link', { name: /Apply Now/i });
    expect(applyButton).toBeInTheDocument();
});
