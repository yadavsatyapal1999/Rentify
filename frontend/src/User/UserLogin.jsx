import React, { useState } from 'react';
import './login.css';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom"


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate()
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
     // console.log('Login data submitted:', formData);
      axios
        .post("http://localhost:5000/user/login", formData)
        .then((response) => {
          //console.log(" Login successful");
          //console.log(response.data)
           window.alert("Login sucessfull");
            navigate("/");
           localStorage.setItem('token',response.data.Token)
           localStorage.setItem('mail',response.data.mail)
           localStorage.setItem('yourId',response.data.ID)
        })
        .catch((error) => {
          window.alert("Login failed");
          console.log(error)
        });
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <button className="submit-button" type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <Link to="/register" >Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;