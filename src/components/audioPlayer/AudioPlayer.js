import React, { useState, useRef, useEffect } from "react";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";
import "./audioPlayer.css";

export default function NewAudioPlayer({
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);

  useEffect(() => {
    const audioSrc = total[currentIndex]?.song;
    audioRef.current.src = audioSrc;
    audioRef.current.load();

    const onCanPlayThrough = () => {
      isReady.current = true;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error: play() request was interrupted by pause()', error);
        });
        startTimer();
      }
    };

    const onError = (error) => {
      console.error('Error: Failed to load because no supported source was found.', error);
    };

    audioRef.current.addEventListener("canplaythrough", onCanPlayThrough);
    audioRef.current.addEventListener("error", onError);

    return () => {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
      audioRef.current.removeEventListener("canplaythrough", onCanPlayThrough);
      audioRef.current.removeEventListener("error", onError);
    };
  }, [currentIndex, total, isPlaying]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? total.length - 1 : prevIndex - 1));
  };

  const togglePlay = () => {
    if (audioRef.current.paused && isReady.current) {
      audioRef.current.play().catch(error => {
        console.error('Error: play() failed:', error);
      });
    } else {
      audioRef.current.pause();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isReady.current) {
      togglePlay();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const formatDuration = (duration) => {
    if (isNaN(duration) || duration === 0) return "0:00";
  
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
  
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={isPlaying}
          image={total[currentIndex]?.img}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{total[currentIndex]?.name}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">{formatTime(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">{formatDuration(duration)}</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying} // Correct prop name
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}