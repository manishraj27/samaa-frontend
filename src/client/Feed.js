import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './feed.css';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const fetchPlaylistsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get('https://saavn.dev/api/search/playlists', {
        params: {
          query: category,
        },
      });
      if (response.data.success) {
        const playlistData = response.data.data.results.map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          images: playlist.image ? [{ url: playlist.image[2].url }] : [],
          tracks: { total: playlist.songCount },
        }));
        setPlaylists(playlistData);
      } else {
        setError(`Failed to fetch ${category} playlists.`);
        setPlaylists([]);
      }
    } catch (error) {
      setError(`Error fetching ${category} playlists: ${error.message}`);
      setPlaylists([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaylistsByCategory('Pop');
  }, []);

  const handleCategoryClick = (category) => {
    fetchPlaylistsByCategory(category);
  };

  const navigateToPlayer = (id) => {
    navigate("/player", { state: { id: id, source: "saavn" } });
  };

  return (
    <div className='screen-container'>
      <div className="background-black text-white padding-big">
        <div className="grid grid-2 gap-big">
          <div>
            <h2 className="font-large bold margin-bottom">Categories</h2>
            <div className="grid grid-3 gap-small">
              <div className="bg-purple padding-small rounded" onClick={() => handleCategoryClick('Pop')}>Pop</div>
              <div className="bg-red padding-small rounded" onClick={() => handleCategoryClick('Chill')}>Chill</div>
              <div className="bg-green padding-small rounded" onClick={() => handleCategoryClick('Sad')}>Sad</div>
              <div className="bg-blue padding-small rounded" onClick={() => handleCategoryClick('Lofi')}>Lofi</div>
              <div className="bg-yellow padding-small rounded" onClick={() => handleCategoryClick('Romantic')}>Romantic</div>
              <div className="bg-orange padding-small rounded" onClick={() => handleCategoryClick('Party')}>Party</div>
              <div className="bg-pink padding-small rounded" onClick={() => handleCategoryClick('Workout')}>Workout</div>
              <div className="bg-indigo padding-small rounded" onClick={() => handleCategoryClick('Focus')}>Focus</div>
              <div className="bg-lightgreen padding-small rounded" onClick={() => handleCategoryClick('Sleep')}>Sleep</div>
            </div>
          </div>
          <div>
            <h2 className="font-large bold margin-bottom">OLD IS GOLD</h2>
            <div className="grid grid-1 gap-small">
              <div className="bg-light padding-small rounded" onClick={() => handleCategoryClick('2000s')}>Golden age of 20s</div>
              <div className="bg-light padding-small rounded" onClick={() => handleCategoryClick('1990s')}>Golden age of 90s</div>
              <div className="bg-light padding-small rounded" onClick={() => handleCategoryClick('1980s')}>Golden age of 80s</div>
              <div className="bg-light padding-small rounded" onClick={() => handleCategoryClick('1970s')}>Golden age of 70s</div>
            </div>
          </div>
        </div>

        <div className="margin-top-big">
          <h2 className="font-large bold margin-bottom flex align-center">
            Playlists
            {loading && <span className="text-red margin-left-small">🔴</span>}
          </h2>
          <div className="grid grid-3 gap-big">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              playlists.map((playlist) => (
                <div className="card" key={playlist.id} onClick={() => navigateToPlayer(playlist.id)}>
                  <img src={playlist.images.length > 0 ? playlist.images[0].url : "default_image_url.png"} alt="Playlist Art" className="card-image" />
                  <div className="card-content">
                    <div>
                      <h3 className="card-title">{playlist.name}</h3>
                      <p className="card-description">{playlist.tracks.total} Songs</p>
                    </div>
                  </div>
                  <button className="card-button">Listen Now</button>
                </div>

              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
