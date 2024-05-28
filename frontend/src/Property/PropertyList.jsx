import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PropertyList.css'; // Import the CSS file here

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/prop/get');
                console.log(response)
                setProperties(response.data);
            } catch (error) {
                console.error("There was an error fetching the properties!");
            }
        };

        fetchProperties();
    }, []);

    const deleteProperty = async (id) => {
        try {
            await axios.delete(`/http://localhost:5000/prop/del/${id}`);
            setProperties(properties.filter(property => property._id !== id));
        } catch (error) {
            console.error("There was an error deleting the property!", error);
        }
    };

    return (
        <div className="property-list-container">
            <h1>Property List</h1>
            <div className="property-list">
                <ul>
                    {properties && Array.isArray(properties) &&  properties.map(property => (
                        <li key={property._id}>
                            <span>{property.title} - ${property.price}</span>
                            <span>
                                <Link to={`/update/${property._id}`}>Update</Link>
                                <button onClick={() => deleteProperty(property._id)}>Delete</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PropertyList;
