import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileInput from '../fileInput/FileInput';
import styles from './styles.module.css';
import config from '../../config';

const EditPlaylist = ({ onClose, playlistId }) => {
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    img: null
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const authToken = localStorage.getItem('userAuthToken');
        const response = await axios.get(`${config.samaa_api}/api/playlists/${playlistId}`, {
          headers: {
            'x-auth-token': authToken
          }
        });
        const { name, desc, img } = response.data;
        // Populate the form data with fetched playlist data
        setFormData({ name, desc, img });
      } catch (error) {
        console.error('Error fetching playlist:', error.message);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputState = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('userAuthToken');
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('desc', formData.desc);
      formDataToSend.append('img', formData.img);

      const response = await axios.put(`${config.samaa_api}/api/playlists/edit/${playlistId}`, formDataToSend, {
        headers: {
          'x-auth-token': authToken
        }
      });

      console.log('Playlist updated:', response.data);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error updating playlist:', error.message);
      setSubmissionStatus('error');
    } finally {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className='screen-container'>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Edit Playlist</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Playlist Name"
            name="name"
            onChange={handleChange}
            value={formData.name} // Populate with playlist name
          />
          <textarea
            className={styles.input}
            placeholder="Playlist Description"
            name="desc"
            onChange={handleChange}
            value={formData.desc} // Populate with playlist description
          />
          <FileInput
            name="img"
            label="Choose Image"
            handleInputState={handleInputState}
            type="image"
            value={formData.img} // Populate with playlist image
          />
          <button type="submit" className={styles.submit_btn}>
            Save Changes
          </button>
        </form>
      </div>
      {submissionStatus === 'success' && (
        <p className={styles.successMessage}>Playlist updated successfully!</p>
      )}
      {submissionStatus === 'error' && (
        <p className={styles.errorMessage}>An error occurred. Please try again later.</p>
      )}
    </div>
  );
};

export default EditPlaylist;
