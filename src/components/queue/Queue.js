import React from "react";
import "./queue.css";
import { FaPlay } from "react-icons/fa";

export default function Queue({ tracks, setCurrentIndex }) {
  
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Queue</p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className="queue-item flex"
              onClick={() => setCurrentIndex(index)}
            >
              <p className="track-name">{tracks[index].name}</p>
              <FaPlay/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}