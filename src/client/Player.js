// Player.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Player.css";
import { useLocation } from "react-router-dom";
// import SongCard from "../components/songCard/SongCard";
// import Queue from "../components/queue/Queue";
import AudioPlayer from "../components/audioPlayer/AudioPlayer";
// import Widgets from "../components/widgets/Widgets";


export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);




  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.source === "spotify") {
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
            console.log("songs:",response.data.items);
            setCurrentTrack(response.data.items[0]?.track);
            console.log("url:",response.data.items[0]?.track)
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
    if (tracks && tracks.length > 0 && currentIndex >= 0 && currentIndex < tracks.length) {
      const currentTrackData = tracks[currentIndex];
      const isSpotifyTrack = currentTrackData.hasOwnProperty('song');
      setCurrentTrack(isSpotifyTrack ? currentTrackData.track : currentTrackData.song);
    }
  }, [currentIndex, tracks]);
  

useEffect(() => {
  const fetchSammaPlaylist = async () => {
    if (location.state && location.state.source === "samma") {
      const token = localStorage.getItem("userAuthToken");
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/playlists/${location.state.id}`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          );
          if (response.data.data.songs) {
            const sammaTracks = response.data.data.songs
            setTracks(sammaTracks);
            console.log("songs array:",sammaTracks)
            setCurrentTrack(sammaTracks[0]);
            console.log("current song:",sammaTracks[0])
            console.log("current song url:",sammaTracks[0].song )
          } else {
            console.error("Error: No playlist data found.");
          }
        } catch (error) {
          console.error("Error fetching Samma playlist tracks:", error);
        }
      } else {
        console.error("User authentication token not found.");
      }
    }
  };

  fetchSammaPlaylist();
}, [location.state]); // Run this effect whenever location.state changes


  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      {/* <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div> */}
    </div>
  );
}
