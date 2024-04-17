//import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";
import Feed from "./Feed";
import Player from "./Player";
import Trending from "./Trending";
import About from "./About";
import Favourites from "./Favourites";
import "./NavBar.css";
import SideBar from "../components/sidebar/SideBar";

export default function NavBar() {
  
  return (
    <Router>
      <div className="main-body">
        <SideBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/player" element={<Player />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}
