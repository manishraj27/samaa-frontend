import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";
import "./songCard.css";

export default function SongCard({ currentTrack }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={currentTrack.img} />
      {/* <AlbumInfo album={album} /> */}
    </div>
  );
}