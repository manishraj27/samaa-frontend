import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./widgetEntry";
import { useNavigate } from "react-router-dom";

export default function WidgetCard({ title, songs }) {
  const navigate = useNavigate();

  const handlePlayClick = (songId) => {
    // Navigate to /player with songId as state
    navigate(`/player`, { state: { songId } });
  };

  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {songs.map((song) => (
        <WidgetEntry
          key={song._id} // Ensure each entry has a unique key
          title={song.name}
          subtitle={song.artist}
          onClick={() => handlePlayClick(song._id)} // Pass songId to handlePlayClick
        />
      ))}
    </div>
  );
}
