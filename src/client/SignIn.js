import React from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      <button>Sign in</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}