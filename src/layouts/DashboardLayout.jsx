import { Outlet } from "react-router";
import DummyNavbar from "../components/layout/DummyNavbar";
import DummySidebaar from "../components/layout/DummySidebaar";
import { useEffect, useState } from "react";
import NoInternetModal from "../components/global/NoInternet";
import { NoInternetImage } from "../assets/export";

const DashboardLayout = () => {
  const [openNoInternet, setOpenNoInternet] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      setOpenNoInternet(true);
    }
  }, []);

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className=" h-full bg-gray-50">
        <DummySidebaar />
      </div>

      {/* Main content area including Navbar and page content */}
      <div className="flex flex-col w-[calc(100%-15rem)] h-full">
        {/* Navbar (aligned horizontally, taking full width minus sidebar) */}
        <div className="w-[97.5%] mt-4 ml-4 rounded-lg h-[94px] bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] flex justify-center items-center">
  <div className="w-[100%]">
    <DummyNavbar />
  </div>
</div>


        {/* Main page content */}
        <div className="w-full h-[calc(100%-2.5rem)] p-4 overflow-auto">
          <img src={NoInternetImage} alt="" className="hidden" />
          <NoInternetModal isOpen={openNoInternet} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
