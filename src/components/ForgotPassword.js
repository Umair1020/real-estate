import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Password reset link sent!");
        setMessage("");
        setError("");
      } else {
        toast.error(data.message || "Error sending reset link.");
        setError(data.message || "Error sending reset link.");
      }
    } catch (error) {
      toast.error("Server error. Try again later.");
      setError("An error occurred.");
    }
  };

  return (
    <div className="main d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <form onSubmit={handleForgotPassword} className="form-container">
        <h2 className="text-center">Forgot Password</h2>
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="submit-button">
          Send Reset Link
        </button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
