import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const API_BASE_URL = "https://api.data.street.co.uk/street-data-api/v2";
const API_KEY = process.env.REACT_APP_STREET_API_KEY;  // ✅ Ensure API Key is loaded

const PropertyDetails = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPropertyDetails();
    }, []);

    const fetchPropertyDetails = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/properties/street-group-ids/${propertyId}?fields%5Bproperty%5D=address`,
                {
                    headers: {
                       "x-api-key": API_KEY  // ✅ Correct
 // ✅ Correct header
                    }
                }
            );

            setProperty(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching property details:", error);
            setError("Failed to load property details.");
        }
    };

    return (
        <div className="container">
            <BackButton />
            <h2>Property Details</h2>

            {error && <p className="error">{error}</p>}

            {property ? (
                <div className="property-details">
                    <h3>{property.address}</h3>
                    <p><strong>Postcode:</strong> {property.postcode}</p>
                    <p><strong>Property Type:</strong> {property.propertyType}</p>
                    <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                    <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                    <p><strong>Tenure:</strong> {property.tenure}</p>
                    <p><strong>Energy Performance:</strong> {property.energyPerformance}</p>
                    <p><strong>Estimated Market Value:</strong> £{property.estimatedValue}</p>
                    <p><strong>Flood Risk:</strong> {property.floodRisk}</p>
                    <p><strong>Council Tax Band:</strong> {property.councilTaxBand} (£{property.councilTaxAmount}/year)</p>
                    <button>Generate PDF Report</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PropertyDetails;
