import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import BackButton from "../components/BackButton";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";
const stripePromise = loadStripe("pk_test_51P2ZKBP2rKrOH9q6wUNCsMJkJMeGXNIrHf9HJrlgPEEMbGrDrsz7SNn5lwryqZIsWnUHxTPQR5M7Hv6r2hkZQ8gc00ja44v10c");

const PurchaseCreditsForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [packageName, setPackageName] = useState("");
    const [amount, setAmount] = useState(0);
    const [credits, setCredits] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [userCredits, setUserCredits] = useState(0); // Store user credits

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated.");
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/user`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setFirstName(data.first_name);
                    setUserCredits(data.credits); // Store fetched credits
                } else {
                    setError("Failed to fetch user data.");
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        fetchUser();
    }, []);

    const handleViewCredits = () => {
        navigate("/confirmation", { state: { credits: userCredits } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            toast.error("Stripe is not loaded yet.");
            return;
        }

        const tokens = localStorage.getItem("token");
        if (!tokens) {
            setError("Please login first.");
            navigate("/login");
            setIsSubmitting(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { token: stripeToken, error } = await stripe.createToken(cardElement);

        if (error) {
            toast.error(error.message);
            return;
        }

        console.log("Stripe Token:", stripeToken.id);

        const payload = {
            package_name: "basic",
            amount: 10.0,
            credits: 20,
            stripeToken: stripeToken.id,
        };

        try {
            const response = await axios.post(
                `${API_BASE_URL}/purchase-credits`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokens}`,
                    },
                }
            );

            console.log("Response:", response.data);
            toast.success("Payment Successful!");
            navigate("/confirmation", { state: { credits: response.data.credits } });
        } catch (err) {
            console.error("Payment Error:", err.response?.data || err.message);
            toast.error(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div>
            <div className="main-container main">
                <div className="content-wrapper">
                    <div className="welcome-box d-flex  justify-content-between">
                      <BackButton />  <h1>Welcome, {firstName}</h1>
                    </div>

                    <h1>Buy Credits</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <div className="input-box">
                                <input type="text" placeholder="Package Name" onChange={(e) => setPackageName(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <input type="number" placeholder="Credits" onChange={(e) => setCredits(e.target.value)} required />
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="text" name="cardholderName" placeholder="Cardholder Name" className="form-control" required />
                        </div>
                        <br />
                        <div className="form-group">
                            <CardElement className="form-control" />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !stripe}>
                            {isSubmitting ? "Processing..." : "Pay Now"}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleViewCredits} style={{ marginLeft: "10px" }}>
                            View Credits ({userCredits})
                        </button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

const PurchaseCredits = () => {
    return (
        <Elements stripe={stripePromise}>
            <PurchaseCreditsForm />
            <ToastContainer />
        </Elements>
    );
};

export default PurchaseCredits;
