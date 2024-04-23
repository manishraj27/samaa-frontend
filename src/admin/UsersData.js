import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Box } from '@mui/material';

export default function UsersData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('adminAuthToken');
      const { data } = await axios.get("http://localhost:3001/api/users", {
        headers: {
          'x-auth-token': authToken
        }
      });
      setUsers(data.data);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('adminAuthToken');
      await axios.delete(`http://localhost:3001/api/users/${id}`, {
        headers: {
          'x-auth-token': authToken
        }
      });
      getAllUsers(); // Refresh users after deletion
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='screen-container'>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={5}>
        <Typography variant="h4" color={"white"} padding={"20px"}>Users</Typography>
      </Box>
      <Paper elevation={3} style={{ marginRight: 30, marginLeft: 40 }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">Gender</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">Verified</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">Created At</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="bold">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </div>
  );
}
