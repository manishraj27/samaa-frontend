import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userlogin.css'
import config from '../config';



export default function UserLogin({ onUserLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${config.samaa_api}/api/login`, { email, password });
      if (response.status === 200) {
        onUserLogin()
        localStorage.setItem('userAuthToken', response.data.authToken);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        console.log('Login successful:', response.data.message);
        navigate("/home");
      }
      else {
        console.error('Login failed:', response.data.message);
        setErrorMessage(response.data.message);
      }

    } catch (error) {
      console.error('Login error:', error.response);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-container">
      <div id="form-ui">
        <form onSubmit={handleSubmit} id="form">
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">Samaa</div>
              <div id="welcome-line-2">Dive into nirvana</div>
              <div id="welcome-line-2">Welcome Back!</div>
            </div>
            <div id="input-area">
              <input
                className="form-input"
                placeholder="Email Address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <input
                className="form-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div id="submit-button-cvr">
              <button id="submit-button" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
            {/* <div id="forgot-pass">
              <a href="#">Forgot password?</a>
            </div> */}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
