import React, { useState } from "react";
import "./user.css";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contact: "",
    type: "buyer", // default to 'buyer'
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "First Name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.contact.trim())
      newErrors.contact = "Phone Number is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Form data submitted:", formData);
      axios
        .post("https://rentify-ycsk.onrender.com/user/register", formData)
        .then((response) => {
          console.log("Registration successful");
          
            window.alert("user registered sucessfullt");
            navigate("/login");
          
        })
        .catch((error) => {
          window.alert("Registration failed");
          console.log(error)
        });
    }
  };

  return (
    <form className="create-user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input
          className="form-input"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        {errors.firstname && (
          <span className="error-text">{errors.firstname}</span>
        )}
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          className="form-input"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        {errors.lastname && (
          <span className="error-text">{errors.lastname}</span>
        )}
      </div>
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
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          className="form-input"
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        {errors.contact && (
          <span className="error-text">{errors.contact}</span>
        )}
      </div>
      <div className="form-group">
        <label>User Type:</label>
        <select
          className="form-input"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>
      <button className="submit-button" type="submit">
        Create User
      </button>
    </form>
  );
};

export default CreateUserForm;
