import { useNavigate } from "react-router";
import { ErrorToast } from "../components/global/Toaster";

export const processSignup = (data, navigate) => {
  if (data?.success) {
    navigate("/app/dashboard");
    return;
  }
};

export const processLogin = (data, navigate, loginAuth) => {
  if (data?.success) {
    loginAuth(data?.data);
    navigate("/app/dashboard");
    return;
  }
};

export const processForget = (data, navigate, _unused, email) => {
  if (data?.success) {
    sessionStorage.setItem("email", email);
    navigate("/auth/verify-otp");
    return;
  }
};
export const processUpdatePassword = (
  data,
  navigate,
  _unused,
  email = null,
  setIsModal
) => {
  if (data?.success) {
    setIsModal(true);
    return;
  }
};

export const processError = (error) => {
  if (error?.response?.data?.message) {
    ErrorToast(error?.response?.data?.message);
    return;
  } else {
    ErrorToast("Something went wrong");
  }
};
