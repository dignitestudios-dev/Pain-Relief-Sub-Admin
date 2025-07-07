import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className=" min-h-screen  flex justify-center items-center auth_bg p-3 md:py-3">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
