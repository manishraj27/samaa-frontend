// Library.js
import axios from 'axios';
import React, { useState, useEffect } from "react";
import "./Library.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import CreatePlaylist from '../components/playlistForm/CreatePlaylist';
import EditPlaylist from '../components/playlistForm/EditPlaylis';
import config from '../config';

const clientId = "9de33fca64244882a06ddec17de75c7e";
const redirectUri = `https://samaa-frontend.vercel.app/library`;

const Library = () => {
  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [hoveredPlaylistId, setHoveredPlaylistId] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);


//**Navigating to player according to the playlist selected */
  const navigateToPlayer = (id) => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");
    if (token) {
      navigate("/player", { state: { id: id, source: "spotify", accessToken: token } });
    } else {
      navigate("/player", { state: { id: id, source: "samma" } });
    }
  };


  //**Fetching Our Own Playlist i.e Samaa Playlits**/
  const fetchSammaPlaylist = async () => {
    try {
      const response = await axios.get(`${config.samaa_api}/api/playlists/user-playlists`, {
        headers: {
          "x-auth-token": localStorage.getItem("userAuthToken"),
        },
      });
      if (response.status === 200) {
        const sammaPlaylists = response.data.data.map((playlist) => ({
          id: playlist._id,
          name: playlist.name,
          images: playlist.img ? [{ url: playlist.img }] : [],
          tracks: { total: playlist.songs.length },
        }));
        setPlaylists(sammaPlaylists);
      } else {
        setError("Failed to fetch user playlists.");
        setPlaylists([]);
      }
    } catch (error) {
      setError("Error fetching user playlists: " + error.message);
      setPlaylists([]);
    }
  };



//**Fetching Samaa Playlists */
  const handleFetchPlaylists = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-read-private%20playlist-read-private`;
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

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    fetchSammaPlaylist();
  };

  const onCreatePlaylist = (newPlaylist) => {
    setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
  };

  const handleDeletePlaylist = async (id) => {
    try {
      const response = await axios.delete(`${config.samaa_api}/api/playlists/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("userAuthToken"),
        },
      });
      if (response.status === 200) {
        // Remove the deleted playlist from the state
        setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist.id !== id));
        console.log("Playlist deleted successfully.");
      } else {
        console.error("Failed to delete playlist.");
      }
    } catch (error) {
      console.error("Error deleting playlist:", error.message);
    }
  };

  const handleUpdatePlaylist = (id) => {
    setSelectedPlaylistId(id); // Set the selected playlist id
    setShowUpdateForm(true); // Show the update form
  };

  if (showUpdateForm) {
    return <EditPlaylist onClose={() => setShowUpdateForm(false)} playlistId={selectedPlaylistId} />;
  }
  return (
    <div className="screen-container">
      <header className="header">
        <h1 className="header-title">Library</h1>
        <div className="header-buttons">
          <button className="samma-button" onClick={fetchSammaPlaylist}>
            Samma Playlist
          </button>
          <button className="fetch-button" onClick={handleFetchPlaylists}>
            Fetch Playlists from Spotify
          </button>
          <button className="fetch-button" onClick={toggleCreateForm}>
            Create Playlist
          </button>
        </div>
      </header>
      <div className="library-body">
        {showCreateForm ? (
          <CreatePlaylist onClose={toggleCreateForm} onCreatePlaylist={onCreatePlaylist} />
        ) : (
          <>
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
                      onMouseEnter={() => setHoveredPlaylistId(playlist.id)}
                      onMouseLeave={() => setHoveredPlaylistId(null)}
                    >
                      <img
                        src={
                          playlist.images.length >0
                            ? playlist.images[0].url
                            : "default_image_url.png"
                        }
                        className="playlist-image"
                        alt="Playlist-Art"
                      />
                      <p className="playlist-title">{playlist.name}</p>
                      <p className="playlist-subtitle">
                        {playlist.tracks.total -1} Songs
                      </p>
                      <div className="playlist-fade">
                        <IconContext.Provider value={{ size: "50px", color: "#c1ffb6" }}>
                          <AiFillPlayCircle
                            key={playlist.id}
                            onMouseEnter={() => setHoveredPlaylistId(playlist.id)}
                            onMouseLeave={() => setHoveredPlaylistId(null)}
                            onClick={() => navigateToPlayer(playlist.id)} />
                        </IconContext.Provider>
                      </div>
                      {hoveredPlaylistId === playlist.id && (
                        <div className="playlist-options">
                          <FaEllipsisV values={{color:"#c1ffb6"}}
                          onClick={() => setShowDropdown(true)} />
                          {showDropdown && (
                            <div className="playlist-dropdown">
                              <ul>
                                <li onClick={() => handleDeletePlaylist(playlist.id)}>Delete Playlist</li>
                                <li onClick={() => handleUpdatePlaylist(playlist.id)}>Update Playlist</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No playlists found.</p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;
