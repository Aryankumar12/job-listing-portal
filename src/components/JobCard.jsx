import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Styled component for the card to add hover effect and custom shadow
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  overflow: 'visible',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'scale(1.02)',
  },
}));

// Styled component for the "Apply Now" button
const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 'bold',
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

// Styled component for Typography to adjust font weight and color
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const JobCard = ({ job }) => {
  return (
    <StyledCard>
      <CardContent>
        <StyledTypography variant="h6" component="div">
          {job.title}
        </StyledTypography>
        <Typography variant="body2" color="text.secondary">
          {job.company}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <StyledTypography variant="body2" color="text.primary">
          Type: {job.type}
        </StyledTypography>
        <StyledTypography variant="body2" color="text.primary">
          Location: {job.location}
        </StyledTypography>
      </CardContent>

      <CardActions>
        <StyledButton
          size="large"
          color="primary"
          variant="contained"
          component={Link}
          to={`/jobs/getJobById/${job._id}`} // Use job._id to navigate to the JobDetail page
        >
          Apply Now
        </StyledButton>
      </CardActions>
    </StyledCard>
  );
};

export default JobCard;
