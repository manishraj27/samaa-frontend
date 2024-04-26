import React, { useEffect, useState } from 'react';
import "./home.css";
import axios from 'axios';
import SongItem from '../components/songItem/SongItem';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = useState(user ? user.name : '');

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);


  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getAllSongs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3001/api/songs");
      setSongs(data.data);
      console.log(data.data);
    } catch (error) {
      setError('Failed to fetch songs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSongs();
  }, []);




  return (
    <div className='screen-container'>
      <div className='screen-container-home'>

      <div className='welcomeCardAndSongBody'>
      <div className="card">
        <h1 className="title">Dive into Nirvana!</h1>
        <h2 className="subtitle">Welcome {name}</h2>
        <p className="description">
          Your favorite songs and artists are just a click away. Rediscover the magic of your top picks.
        </p>
        <div className="user-info">
          <div className="user-profile">
            <img
              src="samaa_home_screen_logo.png"
              alt="Album Art"
              className="avatar"
              crossorigin="anonymous"
            />
            <div>
              <p className="label">समा</p>
            </div>
          </div>
        </div>
      </div>
      <div className="song-body">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="song-list">
            {songs.map(song => (
              <SongItem key={song._id} song={song} />
            ))}
          </div>
        )}
      </div>
      </div>

        <div className='welcomeAndPlaylistbody'>
        <h2>hi hffffffffffffffffffff</h2>
        </div>
      </div>
    </div>
  );
}
