import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateProperty.css'; // Import the CSS file here

const UpdateProperty = ({user,data }) => {
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
        postedBy: ''
    });

    console.log(data)
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`https://rentify-ycsk.onrender.com/properties/${user}`);
                setProperty(response.data);
            } catch (error) {
                console.error("There was an error fetching the property!", error);
            }
        };

        fetchProperty();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({ ...property, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://rentify-ycsk.onrender.com/properties/up/${user}`, property);
        
        } catch (error) {
            console.error("There was an error updating the property!", error);
        }
    };

    return (
        <div className="update-property-container">
            <h1>Update Property</h1>
            <form className="update-property-form" onSubmit={handleSubmit}>
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
                <button type="submit">Update Property</button>
            </form>
        </div>
    );
};

export default UpdateProperty;
