import axios from 'axios';

const API_BASE_URL = "https://api.data.street.co.uk/street-data-api/v2";
const API_KEY = "OURbqmZANX9RGltE-7FNJvjd6YiJJnUvLJ5S1mKl_iM"; // Replace with your actual API key

// Function to fetch property by address
export const fetchPropertyByAddress = async (address) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/properties/addresses`,
            { addresses: [address] },
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching property by address:", error);
        return null;
    }
};

// Function to fetch property by UPRN
export const fetchPropertyByUPRN = async (uprn) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/properties/uprns/${uprn}`, {
            headers: { "Authorization": `Bearer ${API_KEY}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching property by UPRN:", error);
        return null;
    }
};

// Function to fetch property by UDPRN
export const fetchPropertyByUDPRN = async (udprn) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/properties/udprns/${udprn}`, {
            headers: { "Authorization": `Bearer ${API_KEY}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching property by UDPRN:", error);
        return null;
    }
};

// Function to fetch properties in a radius
export const fetchPropertiesByRadius = async (latitude, longitude, radius) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/properties/areas/point-radius`, {
            params: { lat: latitude, lon: longitude, radius: radius },
            headers: { "Authorization": `Bearer ${API_KEY}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching properties by radius:", error);
        return null;
    }
};
