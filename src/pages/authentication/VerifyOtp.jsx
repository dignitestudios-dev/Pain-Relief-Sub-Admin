import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import CountDown from "../../components/global/CountDown";
import axios from "../../axios";
import { OtpLogo, SideImg } from "../../assets/export";
import Button from "../../components/global/Button";
const VerifyOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const email = sessionStorage.getItem("email");

  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputs = useRef([]);
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      const nextIndex = index + 1;
      if (nextIndex < otp.length && !newOtp[nextIndex]) {
        inputs.current[nextIndex].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const getOtpValue = () => {
    sessionStorage.getItem("token");
    return parseInt(otp.join(""), 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isOtpFilled = otp.every((digit) => digit !== "");

    if (!isOtpFilled) {
      ErrorToast("Please enter all OTP digits");
      return;
    }

    setLoading(true);
    try {
      let obj = {
        email: email,
        otp: getOtpValue(),
      };
      const response = await axios.post("/auth/verify-reset-otp", obj);

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        Cookies.set("token", response?.data?.data?.token);
        navigate("/auth/update-password");
      }
    } catch (err) {
      setOtp(Array(4).fill(""));
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { email: email };

      const response = await axios.post("/auth/forgot-password", obj);

      if (response.status === 200) {
        SuccessToast(response?.data?.message);
        setResendLoading(false);
        setOtp(Array(4).fill(""));
        handleRestart();
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleRestart = () => {
    setSeconds(30);
    setIsActive(true);
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
      <div className="p-4 lg:block hidden">
        <img src={SideImg} />
      </div>

      <div className="flex flex-col mt-24 items-center lg:h-auto h-screen p-3">
        <div className="pb-4 text-center">
          <div className="flex justify-center">
            <div className="w-[210.88px] mb-8">
              <img src={OtpLogo} />
            </div>
          </div>
          <p className="text-[32px] font-semibold capitalize">Verify OTP </p>
          <p className="text-[16px] mt-3 capitalize text-[#565656]">
            The code was sent to <span className="text-black">{email}</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-4 gap-4 xl:w-[300px] lg:w-[350px] md:w-[550px] w-full pl-2 ">
              {otp.map((digit, index) => (
                <input
                  inputMode="numeric"
                  key={index}
                  type="password"
                  placeholder="0"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputs.current[index] = el)}
                  className="h-[49px] w-[49px] rounded-[12px] outline-none text-center border-[1px] border-[#D9D9D9] placeholder:text-[#181818]
                  placeholder:text-[16px] focus-within:border-[#8A8A8A] flex items-center justify-center"
                />
              ))}
            </div>
            <div className="xl:w-[290px] lg:w-[350px] md:w-[550px] w-full mt-3 ">
              <Button loading={loading} text="Verify" />
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center gap-2  mt-4 mb-3 relative z-10">
          <p className="text-center text-[16px] leading-[21.6px] text-[#565656]">
            Didn&apos;t receive the code yet?
            {isActive ? (
              <CountDown
                isActive={isActive}
                setIsActive={setIsActive}
                seconds={seconds}
                setSeconds={setSeconds}
              />
            ) : (
              <span
                type="button"
                disabled={resendLoading}
                onClick={handleResendOtp}
                className="text-[#181818] font-medium pl-1 cursor-pointer"
              >
                {resendLoading ? "Resending..." : "Resend"}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
