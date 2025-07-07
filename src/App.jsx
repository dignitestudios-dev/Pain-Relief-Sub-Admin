import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/authentication/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import VerifyOtp from "./pages/authentication/VerifyOtp";
import UpdatePassword from "./pages/authentication/UpdatePassword";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

import { AdminDashboardRoutes } from "./routes/app/AdminDashboardRoutes";
import { SubAdminDashboard } from "./routes/app/SubAdminDashboard";

function App() {
  const { user } = useContext(AppContext);
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="app" element={<DashboardLayout />}>
        {user?.role === "admin"
          ? AdminDashboardRoutes.map((route, index) => (
              <Route key={index} path={route.url} element={route.page} />
            ))
          : SubAdminDashboard.map((route, index) => (
              <Route key={index} path={route.url} element={route.page} />
            ))}
      </Route>

      {/* Public auth routes */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="update-password" element={<UpdatePassword />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
