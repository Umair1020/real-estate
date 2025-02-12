import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const PurchaseConfirmation = () => {
    const navigate = useNavigate();
    const [credits, setCredits] = useState(0);
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/user`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setFirstName(data.first_name);
                    setCredits(data.credits);
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="main d-flex align-items-center justify-content-center" style={{ height: "100vh", flexDirection: "column" }}>
            <h1>Purchase Confirmation</h1>
            <p className="fs-2 color">Welcome, {firstName}! You now have {credits} credits.</p>
            <button onClick={() => navigate("/home")} className="btn btn-secondary">Return to home</button>
        </div>
    );
};

export default PurchaseConfirmation;
