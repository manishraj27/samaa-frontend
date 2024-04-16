import React from 'react'
import MainNavBar from './main/MainNavBar'
import NavBar from './client/NavBar'
//import AdminNavBar from './admin/AdminNavBar'




export default function App() {
  return (
    <div>
      <MainNavBar/>
      {/* <AdminNavBar/> */}
      <NavBar/>
    </div>
  )
}
