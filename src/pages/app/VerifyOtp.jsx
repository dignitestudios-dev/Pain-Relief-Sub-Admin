import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { OtpLogo, SideImg } from "../../assets/export";
import Button from "../../components/app/Button";
import axios from "../../axios";
import { SuccessToast, ErrorToast } from "../../components/global/Toaster";
import Cookies from "js-cookie";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location?.state?.email || ""; // Passed from ForgotPassword



  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Focus next input on keypress
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = async (e) => {
  e.preventDefault();
  const enteredOtp = otp.join("");

  if (enteredOtp.length < 4 || !email) {
    setError("Please enter a valid 4-digit OTP and email.");
    return;
  }

  setLoading(true);
  try {
    // Send OTP and email for verification
    const response = await axios.post("/auth/verify-reset-otp", {
      email,
      otp: enteredOtp,
      type: "email",
    });

    // Check if the response is successful
    if (response?.data?.success) {
      SuccessToast(response?.data?.message || "OTP verified!");
      
      // Save token to cookies
      const token = response?.data?.data?.token;
      if (token) {
        Cookies.set("token", token);
      }

      // Navigate to the next step
      navigate("/auth/update-password");
    } else {
      ErrorToast(response?.data?.message || "Invalid OTP. Try again.");
    }
  } catch (err) {
    ErrorToast(err?.response?.data?.message || "Error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
      {/* Left Image Panel */}
      <div className="p-4 hidden lg:block">
        <img src={SideImg} alt="Side" className="w-full h-full object-cover" />
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center lg:h-auto h-screen p-6">
        <div className="text-center w-[330px] flex flex-col justify-center items-center">
          <div className="mb-8">
            <img src={OtpLogo} alt="OTP Logo" />
          </div>
          <p className="text-[32px] font-semibold capitalize">Verify OTP</p>
          <p className="text-[16px] mt-3 text-[#565656]">
            The code was sent to <span className="text-black">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify}>
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="grid grid-cols-4 gap-4 xl:w-[300px] lg:w-[350px] md:w-[550px] w-full pl-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  placeholder="0"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="h-[49px] w-[49px] rounded-[12px] outline-none text-center border-[1px] border-[#D9D9D9] placeholder:text-[#181818] placeholder:text-[16px] focus-within:border-[#8A8A8A]"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-600 text-[14px] mt-2">{error}</p>
            )}

            <div className="xl:w-[290px] lg:w-[350px] md:w-[550px] w-full mt-4">
              <Button text="Verify" loading={loading} type="submit" />
            </div>
          </div>
        </form>

        {/* Resend OTP */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-3 relative z-10">
          <p className="text-center text-[16px] leading-[21.6px] text-[#565656]">
            Didn't receive the code yet?
            <span className="text-[#181818] font-medium pl-1 cursor-pointer">
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
