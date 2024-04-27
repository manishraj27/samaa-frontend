import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import { Typography, Button, Grid } from '@mui/material';

export default function AdminHome() {
  return (
    <div className='screen-container'>
      <Typography variant="h4" gutterBottom>Welcome Admin!</Typography>
    </div>
  );
}
