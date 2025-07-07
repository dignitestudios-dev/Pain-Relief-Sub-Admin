import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { sidebarDataAdmin, sidebarDataSubAdmin } from "../../static/Sidebar";
import { DesktopLogo } from "../../assets/export";
import Logout from "../app/SubAdminDashboard/Logout";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const handleLinkClick = (url) => setActiveLink(url);

  const handleLogoutConfirm = () => {
    Cookies.remove("token");
    navigate("/auth/login");
  };

  const userData = Cookies.get("user");

  const parsedUser = userData ? JSON.parse(userData) : null;

  const role = parsedUser?.role;

  console.log(role);
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <>
      {/* Sidebar */}
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
        className={`fixed lg:static ml-4 mt-4 mb-4 rounded-lg top-0 left-0 w-[270px]  bg-white py-4 flex flex-col transition-transform duration-300
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 z-40 min-h-[calc(100vh-2rem)] overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-2">
          <img src={DesktopLogo} alt="logo" className="h-[65px] w-[236px]" />
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 mt-6 px-4 overflow-y-auto scrollbar-hide pb-6">
          <ul className="space-y-4">
            {(role === "sub-admin"
              ? sidebarDataSubAdmin
              : sidebarDataAdmin
            )?.map((sidebar, index) => (
              <li key={index} className="flex items-center">
                <NavLink
                  to={sidebar.url}
                  onClick={() => handleLinkClick(sidebar.url)}
                  className={({ isActive }) =>
                    `group flex items-center w-[98%] gap-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[linear-gradient(234.85deg,#29ABE2_-20.45%,#63CFAC_124.53%)] text-white"
                        : "text-black hover:bg-[linear-gradient(234.85deg,#29ABE2_-20.45%,#63CFAC_124.53%)] hover:text-white"
                    }`
                  }
                >
                  <span className="text-xl relative w-[20px] h-[20px]">
                    {/* Default icon */}
                    <img
                      src={sidebar.icon}
                      alt="icon"
                      className="w-full h-full object-contain group-hover:hidden"
                    />
                    {/* Active icon */}
                    <img
                      src={sidebar.activeIcon}
                      alt="active icon"
                      className={`w-full h-full object-contain absolute top-0 left-0 ${
                        activeLink === sidebar.url
                          ? "block"
                          : "hidden group-hover:block"
                      }`}
                    />
                  </span>

                  <span
                    className={`${
                      activeLink === sidebar.url
                        ? "text-white"
                        : "text-black group-hover:text-white"
                    } text-[14px] font-[500]`}
                  >
                    {sidebar.title}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="px-6 mt-auto pt-4">
          <button
            onClick={() => setShowLogoutModal(true)}
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
