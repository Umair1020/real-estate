import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element }) => {
    const userCookie = Cookies.get("user");

    return userCookie ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
