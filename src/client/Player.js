// Player.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Player.css";
import { useLocation } from "react-router-dom";
import SongCard from "../components/songCard/SongCard";
import Queue from "../components/queue/Queue";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";
import Widgets from "../components/widgets/Widgets";


export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state) {
        const token = location.state.accessToken;
        if (token) {
          try {
            const response = await axios.get(
              `https://api.spotify.com/v1/playlists/${location.state.id}/tracks`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setTracks(response.data.items);
            setCurrentTrack(response.data.items[0]?.track);
          } catch (error) {
            console.error("Error fetching playlist tracks:", error);
          }
        } else {
          console.error("Access token not found.");
        }
      }
    };

    fetchData();
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
