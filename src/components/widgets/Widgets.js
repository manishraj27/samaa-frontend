import React, { useState, useEffect } from "react";
import "./widgets.css";
import axios from 'axios'; // Import axios

import WidgetCard from "./widgetCard";

export default function Widgets({ artistID }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (artistID) {
          const params = new URLSearchParams(window.location.hash.substring(1));
          const token = params.get("access_token");

          // Fetch related artists
          const relatedArtistsResponse = await axios.get(`/artists/${artistID}/related-artists`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const relatedArtists = relatedArtistsResponse.data?.artists.slice(0, 3);
          setSimilar(relatedArtists);

          // Fetch featured playlists
          const featuredPlaylistsResponse = await axios.get(`/browse/featured-playlists`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const featuredPlaylists = featuredPlaylistsResponse.data?.playlists.items.slice(0, 3);
          setFeatured(featuredPlaylists);

          // Fetch new releases
          const newReleasesResponse = await axios.get(`/browse/new-releases`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const newReleases = newReleasesResponse.data?.albums.items.slice(0, 3);
          setNewRelease(newReleases);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [artistID]);

  return (
    <div className="widgets-body flex">
      This is the Widgets component. Under Devekopment
      {similar.length > 0 && <WidgetCard title="Similar Artists" similar={similar} />}
      {featured.length > 0 && <WidgetCard title="Made For You" featured={featured} />}
      {newRelease.length > 0 && <WidgetCard title="New Releases" newRelease={newRelease} />}
    </div>
  );
}
