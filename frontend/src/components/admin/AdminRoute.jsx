// AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // or use context/state

  return user?.role === "admin" ? children : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
