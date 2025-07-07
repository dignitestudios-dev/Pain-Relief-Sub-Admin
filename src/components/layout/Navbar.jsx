import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/app/profile");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    return names
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <div className="w-full px-4 py-8 flex justify-end items-center gap-3">
      <div
        onClick={handleProfileClick}
        className="flex items-center gap-3 cursor-pointer"
      >
        <span className="text-white font-medium">{user?.firstName}</span>

        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold">
          {getInitials(user?.firstName)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
