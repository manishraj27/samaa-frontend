import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import { Typography, Button, Grid } from '@mui/material';

export default function AdminHome() {
  return (
    <div className='screen-container'>
      <Typography variant="h4" gutterBottom>Welcome Admin!</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" component={Link} to="/admin/songs">
            Manage Songs
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" component={Link} to="/admin/users">
            Manage Users
          </Button>
        </Grid>
        {/* Add more grid items for other functionalities */}
      </Grid>
    </div>
  );
}
