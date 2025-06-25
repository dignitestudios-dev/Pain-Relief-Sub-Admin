import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import DummyHome from "./pages/app/DummyHome";
import DummyLogin from "./pages/authentication/DummyLogin";
import AuthLayout from "./layouts/AuthLayout";
import UniqueReferral from "./pages/app/UniqueReferral";
import UserDetails from "./pages/app/UserDetails";
import Profile from "./pages/app/Profile";
import Login from "./pages/app/Login";
import ForgotPassword from "./pages/app/ForgotPassword";
import VerifyOtp from "./pages/app/VerifyOtp";
import UpdatePassword from "./pages/app/UpdatePassword";
import ProtectedRoute from "./pages/app/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DummyHome />} />
          <Route path="unique-referral" element={<UniqueReferral />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Public auth routes */}
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOtp />} />
        <Route path="update-password" element={<UpdatePassword />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<div className="text-7xl">Page Not Found</div>} />
    </Routes>
  );
}

export default App;
