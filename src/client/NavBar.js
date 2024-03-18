import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './Home';
import Library from './Library';
import Feed from './Feed';
import Player from './Player';
import Trending from './Trending';
import About from './About';
import Favourites from './Favourites';
import './NavBar.css';
import SideBar from '../components/sidebar/SideBar';


export default function NavBar() {

// const [token,setToken] = useState("")

// useEffect(() => {
//   const token = window.localStorage.getItem("token")//after refreshing the page we don't have to take the token again and again it will take from storage
//   const hash = window.location.hash
//   //console.log(hash.split("&")[0].split('=')[1]) -- this is used to extract the access token
//   window.location.hash=""
//   if(!token&&hash){
//   const _token = hash.split("&")[0].split('=')[1]
//   window.localStorage.setItem("token",_token)
//   setToken(_token)
//   setClientToken(_token)
//   }
//   else{
//     setToken(token)
//     setClientToken(token)
//   }
// }, []);
  
return (//!token ? 
//<Login/>:
<Router>
    {/* <Route path="/" element={<LandingPage/>}/>
    <Route path="/signin" element={<LogIn/>}/>
    <Route path="/signup" element={<Register/>}/> */}
<div className='main-body'>
  
    <SideBar/>
    <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/player" element={<Player/>}/>
        <Route path="/trending" element={<Trending/>}/>
        <Route path="/favourites" element={<Favourites/>}/>
        <Route path="/about" element={<About/>}/>
    </Routes>

</div>
</Router>
)
}