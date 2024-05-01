import React from "react";
import "./controls.css";
import { IconContext } from "react-icons";
import { MdShuffleOn } from "react-icons/md";
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";
import { PiShuffleBold } from "react-icons/pi";
import { FaRepeat } from "react-icons/fa6";
import { LuRepeat1 } from "react-icons/lu";;




export default function Controls({
  isPlaying,
  setIsPlaying,
  handleNext,
  handlePrev,
  toggleRepeat,
  toggleShuffle,
  isRepeat,
  isShuffle,
}) {
  return (
    <IconContext.Provider value={{ size: "35px", color: "#C4D0E3" }}>
      <div className="controls-wrapper flex">
        {/* Shuffle Button */}
        <div
          className={isShuffle ? "shuffle-btn active" : "shuffle-btn"}
          onClick={toggleShuffle}
        >
          {isShuffle ? <MdShuffleOn size={30} /> : <PiShuffleBold size={30} />}
        </div>


        <div className="action-btn flex" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div
          className={
            isPlaying ? "play-pause-btn flex active" : "play-pause-btn flex"
          }
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <IoPlay />}
        </div>
        <div className="action-btn flex" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>

        {/* Repeat Button */}
        <div
          className={isRepeat ? "repeat-btn active" : "repeat-btn"}
          onClick={toggleRepeat}
        >
          {isRepeat ? <LuRepeat1 size={30} /> : <FaRepeat size={30} />}
        </div>


      </div>
    </IconContext.Provider>
  );
}