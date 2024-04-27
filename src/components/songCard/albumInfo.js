import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ tt, ci }) {
  if (!tt || tt.length === 0 || ci < 0 || ci >= tt.length) {
    // If total is empty, return a placeholder or handle the case accordingly
    return <div>No song data available</div>;
  }

  const currentSong = tt[ci];
  // Ensure that currentSong is not undefined before accessing its properties
  if (!currentSong) {
    return <div>No song data available</div>;
  }

  return (
    <div className="albumInfo-card">
      <div className="albumName-container">
        <div className="marquee">
          <p>{currentSong.name}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{currentSong.artist}</p>
      </div>
      <div className="album-release">
        <p>Vibe On Samaa</p>
      </div>
    </div>
  );
}