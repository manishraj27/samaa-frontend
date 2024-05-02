import "./SideBar.css"
import SideBarButton from "./SideBarButton";
import React from 'react'
import { IoHome } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

export default function SideBarMain() {
  return (
    <div className="sidebar-container">
      <div>
        <img src="samaalogo.svg" alt="logo" className="logo-img" />
      </div>
            <SideBarButton title="Home" to="/mainhome" icon={<IoHome />} />
            <SideBarButton title="Instructions" to="/instructions" icon={<MdOutlineIntegrationInstructions />} />
            <SideBarButton title="Sign Up" to="/userregistration" icon={<AiOutlineUserAdd/>} />
            <SideBarButton title="User Login" to="/userlogin" icon={<AiOutlineLogin />} />
            <SideBarButton title="Admin Login" to="/adminlogin" icon={<RiAdminLine />} />
            <SideBarButton title="About" to="/about" icon={<IoHome />} /> 
    </div>
  )
}


