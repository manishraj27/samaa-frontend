import axios from 'axios';
import React, { useState, useEffect } from "react";
import "./Library.css" // Assuming you have a CSS file for styling
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const [loading, setLoading] = useState(false);
  const [trendingPlaylists, setTrendingPlaylists] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTrendingPlaylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://saavn.dev/api/search/playlists', {
        params: {
          query: 'trending',
        },
      });
      if (response.data.success) {
        const trendingData = response.data.data.results.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          images: playlist.image ? [{ url: playlist.image[2].url }] : [],
          tracks: { total: playlist.songCount },
        }));
        setTrendingPlaylists(trendingData);
        console.log(trendingData);
      } else {
        setError('Failed to fetch trending playlists.');
        setTrendingPlaylists([]);
      }
    } catch (error) {
      setError('Error fetching trending playlists: ' + error.message);
      setTrendingPlaylists([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingPlaylists();
  }, []);

  const navigateToPlayer = (id) => {
    navigate("/player", { state: { id: id, source: "saavn" } });
    console.log('saavn playlist id:',id);
  };

  return (
    <div className="screen-container">
      <header className="header">
        <h1 className="header-title">Trending Playlists</h1>
      </header>
      <div className="library-body">
        {loading ? (
          <p color='white'>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            {trendingPlaylists.length > 0 ? (
              trendingPlaylists.map((playlist) => (
                <div className="playlist-card" 
                key={playlist.id} 
                onClick={() => navigateToPlayer(playlist.id)}>
                  <img
                    src={
                      playlist.images.length > 0
                        ? playlist.images[0].url
                        : "default_image_url.png"
                    }
                    className="playlist-image"
                    alt="Playlist-Art"
                  />
                  <p className="playlist-title">{playlist.name}</p>
                  <p className="playlist-subtitle">
                    {playlist.tracks.total} Songs
                  </p>
                  <div className="playlist-fade">
                    <IconContext.Provider
                      value={{ size: "50px", color: "#E99D72" }}
                    >
                      <AiFillPlayCircle />
                    </IconContext.Provider>
                  </div>
                </div>
              ))
            ) : (
              <p>No trending playlists found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Trending;
