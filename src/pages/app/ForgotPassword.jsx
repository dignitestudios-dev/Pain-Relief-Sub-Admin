import { useState } from "react";
import { useNavigate } from "react-router";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { OtpLogo, SideImg } from "../../assets/export";
import AuthInput from "../../components/app/AuthInput";
import Button from "../../components/app/Button";
import axios from "../../axios"; // Adjust path as needed
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      SuccessToast(response?.data?.message || "OTP sent successfully!");
      // Optionally redirect to OTP screen
navigate("/auth/verify-otp", { state: { email } });
      setEmail("");
      setTouched(false);
    } catch (err) {
      ErrorToast(
        err?.response?.data?.message || "Failed to send reset email. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full min-h-screen bg-[#fcfcfc]">
      {/* Left Side Image */}
      <div className="p-4 hidden lg:block">
        <img
          src={SideImg}
          alt="Side visual"
          className="w-full h-full object-cover"
        />  
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col pt-32 items-center px-6 py-10">
        {/* Logo and Text */}
        <div className="text-center w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="w-[158px] h-[158px]">
              <img src={OtpLogo} alt="Otp Logo" />
            </div>
          </div>

          <p className="text-[32px] font-[600] capitalize mb-1">
            Forgot Password
          </p>
          <p className="text-[16px] capitalize text-[#565656]">
            Enter your registered email address below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mt-8 lg:w-[350px] md:w-[550px] w-[320px]">
            <AuthInput
              placeholder="Enter email here"
              type="email"
              name="email"
              maxLength={50}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              onBlur={() => setTouched(true)}
              error={error}
              touched={touched}
            />
          </div>

          <div className="w-[350px] mt-6 mb-4">
            <Button text="Send" loading={loading} type="submit" />
          </div>
        </form>

        {/* Back Button */}
        <button
          type="button"
          className="w-full flex justify-center items-center gap-1 mt-4"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowDropleftCircle className="text-lg text-[#212121]" />
          <p className="text-[12px] uppercase font-bold tracking-wider text-[#212121]">
            Back
          </p>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
