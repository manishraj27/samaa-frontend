import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import './glass.css'
const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const schema = Joi.object({
    name: Joi.string().min(5).max(10).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: passwordComplexity().required(),
    gender: Joi.string().valid('male', 'female', 'non-binary').required()
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      for (let item of error.details) {
        validationErrors[item.path[0]] = item.message;
      }
      setErrors(validationErrors);
      return;
    }

    const displaySuccessMessage = (message) => {
      setSuccessMessage(message);
    };

    try {
      const response = await axios.post('http://localhost:3001/api/users/', formData);
      if (response.status === 200) {
        console.log('Registration successful:', response.data.message);
        // Clear form data
        setFormData({
          name: '',
          email: '',
          password: '',
          gender: ''
        });
        displaySuccessMessage(response.data.message);
      } else {
        console.error('Registration failed:', response.data.message);
        // Handle registration error
      }
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
      // Handle registration error
    }
  };

  return (
    <div className='screen-container'>
      <div className='glass-container'>
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-Binary</option>
            </select>
            {errors.gender && <div className="error">{errors.gender}</div>}
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </div>
    </div>
  );
};

export default UserRegistration;
