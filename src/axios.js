import axios from "axios";
import { ErrorToast } from "./components/global/Toaster"; // Import your toaster functions
import Cookies from "js-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const baseUrl = "https://api.painreliefusa.com";

async function getDeviceFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();

  return result.visitorId;
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    devicemodel: getDeviceFingerprint(),
    deviceuniqueid: getDeviceFingerprint(),
  },
});

instance.interceptors.request.use(
  async (request) => {
    if (!navigator.onLine) {
      ErrorToast(
        "No internet connection. Please check your network and try again."
      );
      return Promise.reject(new Error("No internet connection"));
    }

    const token = Cookies.get("token");

    const visitorId = await getDeviceFingerprint();

    request.headers = {
      ...request.headers,
      Accept: "application/json, text/plain, */*",
      devicemodel: visitorId,
      deviceuniqueid: visitorId,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      // Slow internet or request timeout
      ErrorToast("Your internet connection is slow. Please try again.");
    }

    if (error.response && error.response.status === 401) {
      // Unauthorized error
      Cookies.remove("token");
      Cookies.remove("user");
      ErrorToast("Session expired. Please relogin");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default instance;
