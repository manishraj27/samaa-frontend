// Library.js
import axios from 'axios';
import React, { useState, useEffect } from "react";
import "./Library.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const clientId = "9de33fca64244882a06ddec17de75c7e";
const redirectUri = "http://localhost:3000/library";

const Library = () => {
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const fetchSammaPlaylist = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/playlists/user-playlists", {
        headers: {
          "x-auth-token": localStorage.getItem("userAuthToken"),
        },
      });
      if (response.status === 200) {
        // Assuming the response data structure is similar to Spotify's playlists
        // Modify the data structure to match Spotify's playlists
        const sammaPlaylists = response.data.data.map((playlist) => ({
          id: playlist._id,
          name: playlist.name,
          images: playlist.img ? [{ url: playlist.img }] : [],
          tracks: { total: playlist.songs.length }, 
        }));
        setPlaylists(sammaPlaylists);
        console.log(sammaPlaylists);
      } else {
        setError("Failed to fetch user playlists.");
        setPlaylists([]);
      }
    } catch (error) {
      setError("Error fetching user playlists: " + error.message);
      setPlaylists([]);
    }
  };
  



  const handleFetchPlaylists = () => {
    // Redirect user to Spotify authentication page
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-read-private%20playlist-read-private`;
  
  };

  const navigateToPlayer = (id) => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");
  
    // Check if the token is available
    if (token) {
      navigate("/player", { state: { id: id, accessToken: token } });
    } else {
      navigate("/player", { state: { id: id } }); // No access token provided
    }
  };

  const fetchPlaylists = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPlaylists(response.data.items);
      } else {
        setError("Failed to fetch playlists.");
        setPlaylists([]);
      }
    } catch (error) {
      setError("Error fetching playlists: " + error.message);
      setPlaylists([]);
    }
    setLoading(false);
  };


  

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");
    if (token) {
      fetchPlaylists(token);
    }
  }, []);

  return (
    <div className="screen-container">
      <header className="header">
        <h1 className="header-title">Library</h1>
        <div className="header-buttons">
          <button className="fetch-button" onClick={handleFetchPlaylists}>
            Fetch Playlists from Spotify
          </button>
          <button className="samma-button" onClick={fetchSammaPlaylist}>
            Samma Playlist
          </button>
        </div>
      </header>
      <div className="library-body">
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div
                  className="playlist-card"
                  key={playlist.id}
                  onClick={() => navigateToPlayer(playlist.id)}
                >
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
              <p>No playlists found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;