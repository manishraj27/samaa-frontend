import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div>
      <h2>Register</h2>
      <button>Submit</button>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
}