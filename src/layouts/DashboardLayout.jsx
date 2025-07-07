import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      setOpenNoInternet(true);
    }
  }, []);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className=" h-full bg-gray-50 overflow-y-auto overflow-hidden scrollbar-hidden">
        <Sidebar />
      </div>

      <div className="flex flex-col w-[calc(100%-15rem)] h-full">
        <div className="w-[97.5%] mt-4 ml-4 rounded-lg h-[94px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] flex justify-center items-center">
          <div className="w-[100%]">
            <Navbar />
          </div>
        </div>

        <div className="w-full h-[calc(100%-2.5rem)] p-4  overflow-auto scrollbar-hidden">
          <img src={NoInternetImage} alt="" className="hidden" />
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
