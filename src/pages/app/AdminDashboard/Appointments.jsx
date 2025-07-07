import React, { useState } from "react";
import AppointmentsTable from "../../../components/app/AdminDashboard/appointments/AppointmentsTable";
import { useFetchData } from "../../../hooks/api/Get";
import { IoSearch } from "react-icons/io5";
import TableLoader from "../../../components/global/TableLoader";

const Appointments = () => {
  const tabs = ["All", "Pending", "Approved", "Completed", "Canceled"];
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const { data, loading } = useFetchData(`/admin/get-appointments`, {}, 1);
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Appointment
          </h1>

          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-1 ${
                  activeTab === tab
                    ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#63CFAC] after:rounded"
                    : "hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        {/* Search */}
        <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[39px] shadow-sm">
          <IoSearch className="text-gray-400 mr-2 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? <TableLoader /> : <AppointmentsTable data={data} />}
    </div>
  );
};

export default Appointments;
