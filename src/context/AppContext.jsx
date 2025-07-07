import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token"));
  const [user, setUser] = useState(() => {
    const cookieData = Cookies.get("user");
    return cookieData ? JSON.parse(cookieData) : null;
  });

  const loginAuth = (userData) => {
    console.log(userData, "userData==>");
    Cookies.set("token", userData?.token);
    Cookies.set("user", JSON.stringify(userData?.user));
    setToken(userData?.token);
    setUser(userData?.user);
  };

  const logout = () => {
    Cookies.remove("token");
  };

  const value = {
    loginAuth,
    logout,
    token,
    user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
