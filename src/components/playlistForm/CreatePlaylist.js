import { useState } from "react";
import axios from 'axios';
import styles from "./styles.module.css";
import FileInput from './../fileInput/FileInput';
import config from "../../config";

const CreatePlaylist = ({ onClose }) => {
  const [data, setData] = useState({
    name: "",
    desc: "",
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
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("userAuthToken");
      const user = JSON.parse(localStorage.getItem("user"));
      const url = `${config.samaa_api}/api/playlists`;
      const requestData = {
        ...data,
        user: user._id
      };
      const { data: res } = await axios.post(url, requestData, {
        headers: {
          "x-auth-token": authToken,
        },
      });

      console.log(res);
      setSubmissionStatus("success");
    } catch (error) {
      console.log(error);
      setSubmissionStatus("error");
    } finally {
      // Call the onClose callback after 1 second
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit} >
          <h1 className={styles.heading}>Playlist Form</h1>
          <input
            type="text"
            className={styles.input}
            placeholder="Playlist Name"
            name="name"
            onChange={handleChange}
            value={data.name}
          />
          <textarea
            className={styles.input}
            placeholder="Playlist Description"
            name="desc"
            onChange={handleChange}
            value={data.desc}
          />
          <FileInput
            name="img"
            label="Choose Image"
            handleInputState={handleInputState}
            type="image"
            value={data.img}
          />
          <button type="submit" className={styles.submit_btn} >
            Submit
          </button>
        </form>
      </div>
      {submissionStatus === 'success' && (
        <p className={styles.successMessage}>Form submitted successfully!</p>
      )}
      {submissionStatus === 'error' && (
        <p className={styles.errorMessage}>An error occurred. Please try again later.</p>
      )}
    </div>
  );
};

export default CreatePlaylist;
