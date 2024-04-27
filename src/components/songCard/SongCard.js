import React from "react";
import AlbumImage from "./albumImage";
import "./songCard.css";
import AlbumInfo from './albumInfo';

export default function SongCard({ total, currentIndex }) {
  const tt=total
  const ci=currentIndex
  if (!total || total.length === 0 || currentIndex < 0 || currentIndex >= total.length) {
    // If total is empty, return a placeholder or handle the case accordingly
    return <div>No song data available</div>;
  }

  const currentSong = total[currentIndex];
  // Ensure that currentSong is not undefined before accessing its properties
  if (!currentSong) {
    return <div>No song data available</div>;
  }

  return (
    <div className="songCard-body flex">
      <AlbumImage url={currentSong.img} />
      <AlbumInfo tt={tt} ci={ci} />
    </div>
  );
}
