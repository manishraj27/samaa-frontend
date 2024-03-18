//import React, { useEffect, useState } from 'react'
import './SideBar.css'
import SideBarButton from './SideBarButton'
import { IoHome } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

export default function SideBar() {
  // const [image, setImage] = useState(
  //   "profilelogo.png"
  // );

  // const [name, setName] = useState(
  //   "USER"
  // );


  // useEffect(() => {
  //   apiClient.get("me").then((response) => {
  //     setImage(response.data.images[0].url);
  //   });
  // }, []);


  // useEffect(() => {
  //   apiClient.get("me").then((response) => {
  //     setName(response.data.display_name);
  //   });
  // }, []);

  return (
    <div className='sidebar-container'>
      <img src='samaalogo.svg' alt='logo' className='logo-img'/>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src = "profilelogo.png" alt='profile' className='profile-img'/>
    <div>
      <div>Hello!</div>
      <div>USER</div>
    </div>
  </div>
      <div>
        <SideBarButton title="Home" to="/home" icon={<IoHome/>}/>
        <SideBarButton title="Library" to="/library" icon={<MdLibraryMusic/>}/>
        <SideBarButton title="Feed" to="/feed" icon={<MdSpaceDashboard/>}/>
        <SideBarButton title="Player" to="/player" icon={<FaPlay/>}/>
        <SideBarButton title="Favourites" to="/favourites" icon={<MdFavorite/>}/>
        <SideBarButton title="Trending" to="/trending" icon={<FaFire/>}/>
        
      </div>
      <div>
      <SideBarButton title="About" to="/about" icon={<MdFeedback/>}/>
      <SideBarButton title="Log Out" to="/logout" icon={<PiSignOutBold/>}/>
      </div>
    </div>
  )
}
