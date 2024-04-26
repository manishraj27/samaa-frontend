import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css';
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";

export default function Favourites() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [hoveredSongId, setHoveredSongId] = useState(null); 

  useEffect(() => {
    // Fetch liked songs for the current user
    const fetchLikedSongs = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const response = await axios.get(`http://localhost:3001/api/songs/like/${userId}`);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='screen-container'>
      <h2>Liked Songs</h2>
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
                    <AiFillPlayCircle />
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
