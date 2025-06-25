import { useState } from "react";
import { useNavigate } from "react-router";
import { OtpLogo, SideImg } from "../../assets/export";
import AuthInput from "../../components/app/AuthInput";
import Button from "../../components/app/Button";
import axios from "../../axios"; // Make sure axios is set up correctly
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";

const UpdatePassword = () => {
  const navigate = useNavigate();

  // State hooks for password, confirm password, errors, and loading
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }

    // Clear error message if passwords match
    setPasswordMatchError("");

    // Check if new password is valid (can add further validation if required)
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Proceed with API call
    setLoading(true);
    try {
      const response = await axios.post("/auth/reset-password", {
        newPassword,
      });

      SuccessToast(response?.data?.message || "Password reset successfully!");
      
      // Navigate to login or other appropriate page
      navigate("/auth/login");
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Password reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
      {/* Left Image Panel */}
      <div className="p-4 hidden lg:block">
        <img src={SideImg} alt="Side visual" className="w-full h-full object-cover" />
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center lg:h-auto h-screen p-6">
        <div className="text-center w-[330px] flex flex-col justify-center items-center">
          <div className="mb-8">
            <img src={OtpLogo} alt="OTP Logo" className="w-[216px]" />
          </div>
          <p className="text-[32px] font-semibold capitalize">Set New Password</p>
          <p className="text-[16px] mb-4 text-[#565656]">
            Enter new password to Continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 lg:w-[350px] md:w-[550px] w-[320px]">
            {/* New Password Input */}
            <AuthInput
              text="New Password"
              placeholder="New Password"
              type="password"
              id="password"
              name="password"
              value={newPassword}
              maxLength={50}
              onChange={(e) => setNewPassword(e.target.value)}
              error={error}
              touched={true}
            />

            {/* Confirm Password Input */}
            <AuthInput
              text="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              id="cPassword"
              name="cPassword"
              value={confirmPassword}
              maxLength={50}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={passwordMatchError}
              touched={true}
            />
          </div>

          {/* Display error if passwords don't match */}
          {passwordMatchError && (
            <p className="text-red-600 text-[14px] mt-2">{passwordMatchError}</p>
          )}

          <div className="xl:w-[350px] lg:w-[350px] md:w-[550px] w-full mt-6">
            <Button text="Save" loading={loading} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
