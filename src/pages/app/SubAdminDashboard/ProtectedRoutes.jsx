// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookies.get("token");

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
