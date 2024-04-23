import { useState } from "react";
import axios from 'axios';
import styles from "./styles.module.css";
import FileInput from './../fileInput/FileInput';

const SongForm = () => {
  const [data, setData] = useState({
    name: "",
    artist: "",
    song: "",
    img: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const authToken = localStorage.getItem("adminAuthToken");
      const url = "http://localhost:3001/api/songs"
      const { data: res } = await axios.post(url, data, {
        headers: {
          'x-auth-token': authToken
        }
      });
      
      console.log(res)
      setSubmissionStatus('success');
    } catch (error) {
      console.log(error)
      setSubmissionStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} >
        <h1 className={styles.heading}>Song Form</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Song Name"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Artist Name"
          name="artist"
          onChange={handleChange}
          value={data.artist}
        />
        <FileInput
          name="img"
          label="Choose Image"
          handleInputState={handleInputState}
          type="image"
          value={data.img}
        />
        <FileInput
          name="song"
          label="Choose Song"
          handleInputState={handleInputState}
          type="audio"
          value={data.song}
        />
        <button type="submit" className={styles.submit_btn} >
          Submit
        </button>
      </form>
      {submissionStatus === 'success' && (
        <p className={styles.successMessage}>Form submitted successfully!</p>
      )}
      {submissionStatus === 'error' && (
        <p className={styles.errorMessage}>An error occurred. Please try again later.</p>
      )}
      
    </div>
  );
};

export default SongForm;