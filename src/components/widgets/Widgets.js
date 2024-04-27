// Widgets.js
import React, { useState, useEffect } from "react";
import "./widgets.css";
import axios from 'axios'; // Import axios
import WidgetCard from "./widgetCard";
import config from "../../config";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Widgets() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getAllSongs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${config.samaa_api}/api/songs`);
        setSongs(shuffleArray(data.data)); // Shuffle the songs array
        console.log(data.data);
      } catch (error) {
        setError('Failed to fetch songs');
      } finally {
        setLoading(false);
      }
    };

    getAllSongs();
  }, []);

  return (
    <div className="widgets-body flex">
      {songs.length > 0 && (
        <>
          <WidgetCard title="New Releases" songs={songs.slice(0, 3)} />
          <WidgetCard title="Featured" songs={songs.slice(3, 6)} />
          <WidgetCard title="Similar Artists" songs={songs.slice(6, 9)} />
        </>
      )}
    </div>
  );
}
