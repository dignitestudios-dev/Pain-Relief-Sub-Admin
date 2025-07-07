import { useState } from "react";

import { useNavigate } from "react-router";
import { AppointmentData } from "../../../../static/Static";
import { IoSearch } from "react-icons/io5";

const AppointmentsTable = () => {
  const navigate = useNavigate();
  const tabs = ["All", "Pending", "Approved", "Completed", "Canceled"];
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-gray-700 text-xs capitalize font-semibold tracking-wide">
              <th className="py-3 px-2 text-center w-12">#</th>
              <th className="py-3 px-2">Appointment ID</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Time</th>
              <th className="py-3 px-2">Scheduled By</th>
              <th className="py-3 px-2">Chiropractor</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {AppointmentData.length > 0 ? (
              AppointmentData.map((appointment, index) => (
                <tr
                  key={appointment.id || index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 px-2 text-center text-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.appoitmentId}
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.date}
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.time}
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    <div className="flex items-center gap-3">
                      <img
                        src={appointment.scheduledImg}
                        alt={appointment.scheduledname}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-900 font-medium">
                        {appointment.scheduledname}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    <div className="flex items-center gap-3">
                      <img
                        src={appointment.chiropractorImg}
                        alt={appointment.chiropractorname}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-900 font-medium">
                        {appointment.chiropractorname}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.status}
                  </td>
                  <td
                    onClick={() =>
                      navigate(`/app/appoitmentDetail/${appointment?.id}`)
                    }
                    className="py-3 font-[500]   px-2 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent cursor-pointer hover:border-b-[#63CFAC]"
                  >
                    View Detail
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-gray-500 py-10 font-medium"
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AppointmentsTable;
