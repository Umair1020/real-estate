import React from "react";
import { Link } from "react-router-dom";

const PurchaseSuccess = () => {
    return (
        <div className="success-container">
            <h1>🎉 Payment Successful!</h1>
            <p>Your credits have been added to your account.</p>
            <Link to="/confirmation" className="btn btn-primary">Go to Dashboard</Link>
        </div>
    );
};

export default PurchaseSuccess;
