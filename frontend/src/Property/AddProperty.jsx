import React, { useState } from 'react';
import axios from 'axios';
import './AddProperty.css'; // Import the CSS file here
import { useNavigate } from 'react-router-dom';

const AddProperty = ({ history }) => {
    const [property, setProperty] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        images: '',
        amenities: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        isAvailable: true,
        postedBy: '' // This should be set to the logged-in user's ID
    });
const navigate =useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({ ...property, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
       // console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    
        try {
            const response = await axios.post('http://localhost:5000/prop/new', property, config);
            console.log("Property created successfully:", response.data);
            window.alert("Added Sucssfully");
            navigate("/")
            
        } catch (error) {
            console.log(error)
        }
    };
    
// console.log(property)
    return (
        <div className="add-property-container">
            <h1>Add New Property</h1>
            <form className="add-property-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={property.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={property.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={property.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={property.location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="images"
                    placeholder="Images"
                    value={property.images}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="amenities"
                    placeholder="Amenities"
                    value={property.amenities}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    value={property.bedrooms}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    value={property.bathrooms}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="size"
                    placeholder="Size"
                    value={property.size}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="postedBy"
                    placeholder="Posted By"
                    value={property.postedBy}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

export default AddProperty;
