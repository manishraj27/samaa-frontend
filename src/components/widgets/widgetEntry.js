// WidgetEntry.js
import React from "react";
import "./WidgetEntry.css";
import { FaPlay } from "react-icons/fa";

export default function WidgetEntry({ title, subtitle, onClick }) {

  const handlePlayClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling to the parent element
    onClick(); // Invoke the onClick function passed from the parent
  };


  return (
    <div className="entry-body flex">
      <div className="entry-right-body flex">
        <p className="entry-title">{title}</p>
        <p className="entry-subtitle">{subtitle}</p>
      </div>
      <div className="play-icon" onClick={handlePlayClick}>
        <FaPlay />
      </div>
    </div>
  );
}
