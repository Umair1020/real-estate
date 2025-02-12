import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove stored authentication data
        localStorage.removeItem("token");  // Remove JWT token
        Cookies.remove("user");  // Remove user cookie (if used)

        // Redirect to login page
        navigate("/login");
        window.location.reload();  // Force reloading to clear user session
    };

    return <button onClick={handleLogout} className="btn btn-secondary">Logout</button>;
};

export default Logout;
