import React, { useEffect, useState } from 'react';
import "./home.css";


export default function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = useState(user ? user.name : '');
  
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  
  return (
    <div className='screen-container'>
    <div className="card">
      <h1 className="title">Welcome Again!</h1>
      <h2 className="subtitle">{name}!</h2>
      <p className="description">
        Your favorite songs and artists are just a click away. <br>
        </br>Rediscover the magic of your top picks.
      </p>
      <div className="user-info">
        <div className="user-profile">
          <img
            src="https://placehold.co/100x100"
            alt="Album Art"
            className="avatar"
            crossorigin="anonymous"
          />
          <div>
            <p className="label">ANTERIOR</p>
            <div className="user-icons">
              <img
                src="https://placehold.co/20x20"
                alt="User Icon"
                className="user-icon"
                crossorigin="anonymous"
              />
              <img
                src="https://placehold.co/20x20"
                alt="User Icon"
                className="user-icon"
                crossorigin="anonymous"
              />
            </div>
          </div>
        </div>
        <div className="likes">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="like-icon"
          >

          </svg>
        </div>
      </div>
    </div>
  </div>
  
  );
}
