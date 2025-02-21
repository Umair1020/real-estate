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
import ForgotPassword from "./components/ForgotPassword";
import AccountDetails from "./Pages/Accoutdetails";
import PropertySearch from "./Pages/PropertySearch";
import PropertyDetails from "./Pages/AccountDet";  // ✅ Property Details Page
import MarketStats from "./Pages/MarketStats";  // ✅ Market Stats Page


// ✅ Protected Route Component
const ProtectedRoute = ({ element }) => {
  const userToken = localStorage.getItem("token");
  return userToken ? element : <Navigate to="/login" />;
};

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => setUserToken(localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={userToken ? <Navigate to="/home" /> : <AccountTypeSelection />} />
        <Route path="/welcome" element={userToken ? <Navigate to="/home" /> : <WelcomePage />} />
        <Route path="/login" element={userToken ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/logout" element={<Logout />} />

        {/* ✅ Protected Routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/buy-credits" element={<ProtectedRoute element={<PurchaseCredits />} />} />
        <Route path="/confirmation" element={<ProtectedRoute element={<PurchaseConfirmation />} />} />
        <Route path="/success" element={<ProtectedRoute element={<PurchaseSuccess />} />} />
        <Route path="/account-details" element={<ProtectedRoute element={<AccountDetails />} />} />
        <Route path="/search-property" element={<ProtectedRoute element={<PropertySearch />} />} />
        <Route path="/property/:propertyId" element={<ProtectedRoute element={<PropertyDetails />} />} />  {/* ✅ Property Details */}
        <Route path="/market-stats" element={<ProtectedRoute element={<MarketStats />} />} />  {/* ✅ Market Stats */}
      
        {/* ✅ Catch-all Route (404 Page) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
