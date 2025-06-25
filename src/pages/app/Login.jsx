import { useState } from "react";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster"; // Toaster functions for success/error messages
import { useNavigate } from "react-router"; // For navigation
import Button from "../../components/app/Button";
import AuthInput from "../../components/app/AuthInput";
import Cookies from "js-cookie"; // For handling cookies
import axios from "../../axios"; // Axios instance with interceptors
import { SideImg, logobig } from "../../assets/export"; // Import your side image

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For navigation after successful login
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValues((prev) => ({
    ...prev,
    [name]: value.trimStart(),
  }));
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = formValues;

  // Basic frontend validation
  if (!email.trim() || !password.trim()) {
    ErrorToast("Email and password are required.");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
      fcmToken: "123",
      role: "sub-admin",
    });

    const { token, user } = response.data.data;

    if (!token || !user) {
      throw new Error("Missing token or user in the response");
    }

    Cookies.set("token", token, { expires: 1, path: "/" });
    Cookies.set("user", JSON.stringify(user), { expires: 1, path: "/" });

    SuccessToast("Login successful!");
    navigate("/app/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    ErrorToast("Login failed. Please check your credentials.");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full bg-[#fcfcfc]">
      {/* Left Image Panel */}
      <div className="p-4 lg:block hidden">
        <img src={SideImg} alt="Side visual" />
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center h-auto">
        {/* Logo and Branding */}
        <div className="my-4 text-center">
          <div className="w-[158px] h-[158px] mx-auto">
            <img src={logobig} alt="Logo" />
          </div>
          {/* <p className="text-[26px] mt-2 font-semibold capitalize">Pain Relief USA</p>
          <p className="text-[14px] font-[500] capitalize text-[#565656]">Pain Relief made easy</p> */}
        </div>

        {/* Welcome Text */}
        <div className="py-4">
          <p className="text-[32px] font-[600] capitalize">Welcome Back</p>
          <p className="text-[16px] capitalize text-[#565656]">Please enter details to continue</p>
        </div>

        {/* Static Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 lg:w-[350px] md:w-[550px] w-[320px]">
            <AuthInput
              placeholder={"Enter email here"}
              type={"email"}
              name={"email"}
              maxLength={50}
              value={formValues.email}
              onChange={handleChange}
              onBlur={() => {}}
              error={""}
              touched={false}
            />

            <AuthInput
  placeholder={"Password"}
  type={showPassword ? "text" : "password"}
  name={"password"}
  maxLength={50}
  value={formValues.password}
  onChange={handleChange}
  onBlur={() => {}}
  error={""}
  touched={false}
  showToggle={true}
  onToggle={() => setShowPassword((prev) => !prev)}
  isPasswordVisible={showPassword}

/>

          </div>

          <div className="flex my-2 justify-end lg:w-[350px] md:w-[550px] w-[320px]">
  <p
    className="text-[#181818] text-[12px] font-[500] pt-1 cursor-pointer"
    onClick={() => navigate("/auth/forgot-password")}
  >
    Forgot password
  </p>
</div>


          <div className="w-[350px] mt-3 mb-4">
            <Button text={"Login"} loading={loading} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
