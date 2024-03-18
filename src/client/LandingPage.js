import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <h2>Landing Page</h2>
      <Link to="/signin"><button >Sign In</button></Link>
      <Link to="/signup"><button>Sign Up</button></Link>
    </div>
  );
}