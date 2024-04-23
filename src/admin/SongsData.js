import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Box } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import SongForm from '../components/songForm/SongForm';
import EditSongForm from '../components/songForm/EditSongForm';


export default function SongsData() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSong, setEditingSong] = useState(null);

  const getAllSongs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3001/api/songs");
      setSongs(data.data);
    } catch (error) {
      setError('Failed to fetch songs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  const handleSongCreated = () => {
    getAllSongs();
    setShowForm(false);
  };

  const handleDeleteSong = async (id) => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('adminAuthToken');
      await axios.delete(`http://localhost:3001/api/songs/${id}`, {
        headers: {
          'x-auth-token': authToken
        }
      });
      getAllSongs(); // Refresh songs after deletion
    } catch (error) {
      console.error('Failed to delete song:', error);
      setError('Failed to delete song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSong = (song) => {
    setEditingSong(song);
  };

  const handleCloseEditForm = () => {
    setEditingSong(null);
    getAllSongs()
  };

  const handleCloseForm = () => {
    setShowForm(false);
    getAllSongs();
  }

  return (
    <div className='screen-container'>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={5}>
        <Typography variant="h4" color={"white"} padding={"20px"}>Songs</Typography>
        <Box display="flex" justifyContent="flex-start" paddingLeft={"20px"} marginRight={"30px"}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setShowForm(true)}>Add Song</Button>
        </Box>
      </Box>
      <Box display="flex">
        <Paper elevation={6} style={{ flex: 1, marginRight: 30, marginLeft: 40 }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : songs.length === 0 ? (
            <p style={{ fontWeight: "bold" }}>No songs uploaded. Be the first to add one!</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">Artist</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">Image</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">Song</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songs.map((song) => (
                  <TableRow key={song._id}>
                    <TableCell>{song.name}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell><img src={song.img} alt="song_img" style={{ width: 50, borderRadius: 100 }} /></TableCell>
                    <TableCell><audio src={song.song} controls /></TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteSong(song._id)}>Delete</Button>
                      <Button style={{ marginLeft: 8 }} variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => handleEditSong(song)}>Edit</Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
        <Paper elevation={3} style={{ width: 300, height: 0, marginRight: 10 }}>
          {showForm && <SongForm onSongCreated={handleSongCreated} onClose={handleCloseForm} />}
          {editingSong && <EditSongForm song={editingSong} onClose={handleCloseEditForm} />}
        </Paper>
      </Box>
    </div>
  );
}
