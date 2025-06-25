import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router"; // useNavigate comes from react-router-dom
import { IoLogOutOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { sidebarData } from "../../static/Sidebar";
import { logobig } from "../../assets/export";
import Logout from "../../components/app/Logout"; // Import the Logout modal

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 👈 modal control
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const handleLinkClick = (url) => setActiveLink(url);

  const handleLogoutConfirm = () => {
    Cookies.remove("token");
    navigate("/auth/login");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed lg:static ml-4 mt-4 mb-4 rounded-lg top-0 left-0 w-[270px] shadow bg-white py-4 flex flex-col transition-transform duration-300
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 z-40 min-h-[calc(100vh-2rem)] overflow-hidden`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 pl-6">
          <img src={logobig} alt="logo" className="h-[65px] w-[65px]" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800">Pain Relief USA</span>
            <span className="text-[12px] font-medium text-gray-500">Pain Relief Made Easy</span>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 mt-6 px-4 overflow-y-auto scrollbar-hide pb-6">
          <ul className="space-y-4">
            {sidebarData?.map((sidebar, index) => (
              <li key={index} className="flex items-center">
                <NavLink
                  to={sidebar.url}
                  onClick={() => handleLinkClick(sidebar.url)}
                  className={`flex items-center w-[98%] gap-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                    activeLink === sidebar.url
                      ? "bg-[linear-gradient(234.85deg,#29ABE2_-20.45%,#63CFAC_124.53%)] text-white"
                      : "text-black hover:bg-[linear-gradient(234.85deg,#29ABE2_-20.45%,#63CFAC_124.53%)] hover:text-white"
                  }`}
                >
                  <span className="text-xl">
                    <img
                      src={activeLink === sidebar.url ? sidebar.activeIcon : sidebar.icon}
                      alt={`${sidebar.title} Icon`}
                      className="w-5 h-5"
                    />
                  </span>
                  <span className="text-[13px] font-normal">{sidebar.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="px-6 mt-auto pt-4">
          <button
            onClick={() => setShowLogoutModal(true)} // 👈 show modal
            className="flex items-center gap-3 max-w-md rounded-lg text-white bg-[linear-gradient(234.85deg,#29ABE2_-20.45%,#63CFAC_124.53%)] hover:bg-gray-100 px-6 py-3"
          >
            {/* <IoLogOutOutline size={20} /> */}
            <span className="text-[14px] font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <Logout
            onConfirm={handleLogoutConfirm}
            onCancel={() => setShowLogoutModal(false)}
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
