import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.data.street.co.uk/street-data-api/v2";

const MarketStats = ({ property }) => {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMarketStats();
    }, []);

    const fetchMarketStats = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/properties/areas/postcodes?postcode=${property.postcode}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer hzT44Uq9Ar-TJLVwWLTINA7KIhjyfk0PKE8QfOA61TE`
                    }
                }
            );

            setStats(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching market stats:", error);
            setError("Failed to load market statistics.");
        }
    };

    const compareValue = () => {
        if (!stats || !property) return "N/A";

        const avgPrice = stats.averagePrice;
        const estimatedValue = property.estimatedValue;

        const percentageDiff = ((estimatedValue - avgPrice) / avgPrice) * 100;

        if (percentageDiff < -20) return "Good Deal";
        if (percentageDiff >= -20 && percentageDiff <= 20) return "Correct Value";
        return "Poor Deal";
    };

    return (
        <div className="container">
            <h2>Market Statistics</h2>
            {error && <p className="error">{error}</p>}

            {stats ? (
                <div className="stats">
                    <p><strong>Average Property Price:</strong> £{stats.averagePrice}</p>
                    <p><strong>Estimated Property Value:</strong> £{property.estimatedValue}</p>
                    <p><strong>Comparison:</strong> {compareValue()}</p>
                </div>
            ) : (
                <p>Loading market data...</p>
            )}
        </div>
    );
};

export default MarketStats;
