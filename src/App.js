import React, { useEffect, useState } from 'react';
import MainNavBar from './main/MainNavBar';
import NavBar from './client/NavBar';
import AdminNavBar from './admin/AdminNavBar';

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminAuthToken');
    const userToken = localStorage.getItem('token');
  
    let adminLoggedIn = false;
    let userLoggedIn = false;
  
    if (adminToken) {
      adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    }
  
    if (userToken) {
      userLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    }

    setIsAdminLoggedIn(adminLoggedIn);
    setIsUserLoggedIn(userLoggedIn);
  }, []);
  

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  }

  const onUserLogin = () => {
    localStorage.setItem('isUserLoggedIn', 'true');
    setIsUserLoggedIn(true);
  }

  return (
    <div>
      {isAdminLoggedIn ? (
        <AdminNavBar />
      ) : isUserLoggedIn ? (
        <NavBar />
      ) : (
        <MainNavBar
          onAdminLogin={onAdminLogin} 
          onUserLogin={onUserLogin} 
        />
      )}
    </div>
  )
}
