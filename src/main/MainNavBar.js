import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './mainNavBar.css'
import SideBarMain from '../components/sidebar/SideBarMain'
import MainHome from './MainHome'
import UserRegistration from '../client/UserRegistration'
import UserLogin from './../client/UserLogin';
import AdminLogin from './../admin/AdminLogin';
import About from './../client/About';

export default function MainNavBar() {
  return (
    <Router>
      <div className="main-body">
        <SideBarMain />
        < Routes>
          <Route path="/mainhome" element={<MainHome />} />
          <Route path="/userregistration" element={<UserRegistration />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}
