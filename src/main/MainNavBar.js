import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserRegistration from '../client/UserRegistration';
import UserLogin from '../client/UserLogin';
import AdminLogin from '../admin/AdminLogin';
import MainHome from './MainHome';
import './MainNavBar.css'; // Importing the CSS file

export default function MainNavBar() {
  return (
    <div color='green'>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/userregistration">User Registration</Link></li>
          <li><Link to="/userlogin">User Login</Link></li>
          <li><Link to="/adminlogin">Admin Login</Link></li>
        </ul>

        <Routes>
          <Route path="/" element={<MainHome />} exact />
          <Route path="/userregistration" element={<UserRegistration />} exact />
          <Route path="/userlogin" element={<UserLogin/>} exact />
          <Route path="/adminlogin" element={<AdminLogin/>} exact />
        </Routes>
      </nav>
    </div>
  );
}
