import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import FileInput from './../fileInput/FileInput';

const EditSongForm = ({ song, onClose }) => {
  const [editedData, setEditedData] = useState({ ...song });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = ({ currentTarget: input }) => {
    setEditedData({ ...editedData, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('adminAuthToken');
      const url = `http://localhost:3001/api/songs/${song._id}`;
      const { data: res } = await axios.put(url, editedData, {
        headers: {
          'x-auth-token': authToken,
        },
      });
      console.log(res);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error updating song:', error);
      setSubmissionStatus('error');
    } finally {
      // Close the edit form after a short delay to allow the submission status message to be displayed
      setTimeout(() => {
        onClose();
      }, 1000); // Adjust the delay time as needed
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Edit Song</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Song Name"
            name="name"
            onChange={handleChange}
            value={editedData.name}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Artist Name"
            name="artist"
            onChange={handleChange}
            value={editedData.artist}
          />
          <FileInput
            name="img"
            label="Choose Image"
            handleInputState={handleInputState}
            type="image"
            value={editedData.img}
          />
          <FileInput
            name="song"
            label="Choose Song"
            handleInputState={handleInputState}
            type="audio"
            value={editedData.song}
          />
          <button type="submit" className={styles.submit_btn}>
            Update
          </button>
        </form>
      </div>
      {submissionStatus === 'success' && (
        <p className={styles.successMessage}>Song updated successfully!</p>
      )}
      {submissionStatus === 'error' && (
        <p className={styles.errorMessage}>An error occurred. Please try again later.</p>
      )}
    </div>
  );
};

export default EditSongForm;
