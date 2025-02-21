import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import BackButton from "../components/BackButton";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const AccountInvoice = () => {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
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
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("Full API Response:", data);

            if (response.ok) {
                setUser({
                    firstName: data.first_name || "N/A",
                    lastName: data.last_name || "N/A",
                    email: data.email || "N/A",
                    phone: data.phone_number || "N/A",
                    accountType: data.account_type || "N/A",
                    credits: data.credits !== undefined ? data.credits : "N/A",
                    userType: data.user_type || "N/A",
                    verifiedAccount: data.verified_account ? "Yes" : "No",
                    subscribeForNews: data.subscribe_for_news ? "Yes" : "No",
                    createdAt: data.created_at ? data.created_at.split("T")[0] : "N/A",
                    updatedAt: data.updated_at ? data.updated_at.split("T")[0] : "N/A",
                });

                // ✅ Transactions Generate Karne Ka Code
                const transactionHistory = [];
                if (data.credits > 0) {
                    transactionHistory.push({
                        date: data.updated_at ? data.updated_at.split("T")[0] : "N/A",
                        price: `£${data.credits * 10}`, // £10 per credit
                        credits: data.credits,
                    });
                }
                setTransactions(transactionHistory);
            } else {
                setError("Failed to fetch user data.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("An error occurred while fetching user data.");
        }
    };

    const downloadInvoice = () => {
        if (!user) return;

        const doc = new jsPDF();
        doc.text("Invoice", 20, 20);
        doc.text(`Name: ${user.firstName} ${user.lastName}`, 20, 40);
        doc.text(`Email: ${user.email}`, 20, 50);
        doc.text(`Phone: ${user.phone}`, 20, 60);
        doc.text(`Account Type: ${user.accountType}`, 20, 70);
        doc.text(`Verified: ${user.verifiedAccount}`, 20, 90);
        doc.text(`Credits: ${user.credits}`, 20, 100);
        doc.text(`Subscribed to Newsletter: ${user.subscribeForNews}`, 20, 110);
        doc.text(`Account Created: ${user.createdAt}`, 20, 120);
        doc.text(`Last Updated: ${user.updatedAt}`, 20, 130);

        doc.text("Transaction History:", 20, 150);
        transactions.forEach((transaction, index) => {
            doc.text(`Date: ${transaction.date} | Price: ${transaction.price} | Credits: ${transaction.credits}`, 20, 160 + index * 10);
        });

        doc.save(`Invoice_${user.firstName}.pdf`);
    };

    return (
        <div className="main">
            <div className="container">
                <div className="card">
                    <div className="d-flex  justify-content-between">
                    <BackButton />
                    <h3 className="title">Account Information</h3>
                    </div>
                   
                    {error && <p className="error">{error}</p>}
                    <br />
                    {user ? (
                        <>
                            <p><strong>Name:</strong> {user.firstName}</p>
                            <p><strong>Surname:</strong> {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone Number:</strong> {user.phone}</p>
                            <p><strong>Account Type:</strong> {user.accountType}</p>
                            <p><strong>User Type:</strong> {user.userType}</p>
                            <p><strong>Verified Account:</strong> {user.verifiedAccount}</p>
                            <p><strong>Credits:</strong> {user.credits}</p>
                            <p><strong>Subscribe to Newsletter:</strong> {user.subscribeForNews}</p>
                            <p><strong>Account Created:</strong> {user.createdAt}</p>
                            <p><strong>Last Updated:</strong> {user.updatedAt}</p>

                            <h3 className="transaction-title">Transaction History</h3>
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <div key={index} className="transaction-item">
                                        <p><strong>Date:</strong> {transaction.date}</p>
                                        <p><strong>Price:</strong> {transaction.price}</p>
                                        <p><strong>Credits Purchased:</strong> {transaction.credits}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No transactions found.</p>
                            )}

                            <h3 className="invoice-title">Invoice</h3>
                            <p>Invoice Date: {user.createdAt}</p>
                            <button className="download-btn" onClick={downloadInvoice}>Download PDF</button>
                        </>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountInvoice;
