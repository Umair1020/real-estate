import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "./Pages/Welcome";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PurchaseCredits from "./Pages/Purchase";
import Contact from "./Pages/Contact";
import PurchaseConfirmation from "./Pages/PurchaseConfirmation";
import Logout from "./Pages/Logout";
import AccountTypeSelection from "./Pages/Account";
import PurchaseSuccess from "./Pages/PurchaseSuccess";

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => setUserToken(localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);
  
  useEffect(() => {
    const loginListener = () => setUserToken(localStorage.getItem("token"));
    window.addEventListener("login", loginListener);
    return () => window.removeEventListener("login", loginListener);
  }, []);
  
  return (
    <Router>
      <Routes>

        <Route path="/" element={userToken ? <Navigate to="/home" /> : <AccountTypeSelection />} />
        <Route path="/welcome" element={userToken ? <Navigate to="/home" /> : <WelcomePage />} />
        <Route path="/login" element={userToken ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route path="/home" element={userToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/buy-credits" element={userToken ? <PurchaseCredits /> : <Navigate to="/login" />} />
        <Route path="/confirmation" element={userToken ? <PurchaseConfirmation /> : <Navigate to="/login" />} />
        <Route path="/success" element={userToken ? <PurchaseSuccess  /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
