import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Library.css';
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import config from '../config';

export default function Favourites() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch liked songs for the current user
    const fetchLikedSongs = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await axios.get(`${config.samaa_api}/api/songs/like/${userId}`);
        setLikedSongs(response.data.data);
        console.log('Liked songs:', response.data.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching liked songs.');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedSongs();
  }, []);

  const handlePlayClick = (songId) => {
    // Navigate to /player with songId
    navigate(`/player`, {state: {songId}});
  };

  if (loading) {
    return <div className='screen-container'>
        <header className="header">
        <h1 className="header-title">Liked Songs Loading...</h1>
      </header>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='screen-container'>
      <header className="header">
        <h1 className="header-title">Liked Songs</h1>
      </header>
      <div className="library-body">
        {likedSongs.length > 0 ? (
          likedSongs.map((song) => (
            <div className="playlist-card" key={song._id}>
              <img src={song.img} className="playlist-image" alt="Song-Art" />
              <p className="playlist-title">{song.name}</p>
              <p className="playlist-subtitle">{song.artist}</p>
              <div className="playlist-fade">
                {/* You can add play button or other actions here */}
                <IconContext.Provider value={{ size: "50px", color: "#c1ffb6" }}>
                  <AiFillPlayCircle onClick={() => handlePlayClick(song._id)} />
                </IconContext.Provider>
              </div>
            </div>
          ))
        ) : (
          <p>No liked songs found.</p>
        )}
      </div>
    </div>
  );
}
