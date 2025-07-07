import { useState } from "react";
import { AppointmentData } from "../../../../static/Static";
import { useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import DropDownCalender from "../../../global/DropDownCalender";
import Button from "../../../global/Button";
import FilterDropRevenue from "./FilterDropRevenue";

const RevenueTable = () => {
  const navigate = useNavigate();
  const tabs = ["All", "Standard Plan", "Premium Plan "];
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [filterDropDown, setFilterDropDown] = useState(false);
  // Filter members by tab

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Revenue
          </h1>

          <nav className="flex gap-6 items-center text-[16px] font-[500] text-gray-600">
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

        <div className="flex gap-4">
          <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[49px] shadow-sm">
            <IoSearch className="text-gray-400 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-[122px]">
            <Button text={"Export CSV"} />
          </div>
          <div
            onClick={() => setFilterDropDown((prev) => !prev)}
            className="flex w-[50px] h-[49px] cursor-pointer justify-center items-center  bg-gradient-to-l to-[#63CFAC] from-[#29ABE2]  rounded-[8px] "
          >
            <CiFilter color="white" size={25} />
          </div>
        </div>
      </div>
      {filterDropDown && (
        <FilterDropRevenue onClose={() => setFilterDropDown(false)} />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-gray-700 text-[14px] capitalize font-[500] tracking-wide">
              <th className="py-3 px-2">User Name</th>
              <th className="py-3 px-2">Main Plan</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Plan Date</th>
              <th className="py-3 px-2">Plan Duration</th>
              <th className="py-3 px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {AppointmentData.length > 0 ? (
              AppointmentData.map((appointment, index) => (
                <tr
                  key={appointment.id || index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  {/* User Name */}
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

                  {/* Main Plan */}
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.appoitmentId || "Standard Plan"}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.category || "General"}
                  </td>

                  {/* Plan Date */}
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.date}
                  </td>

                  {/* Plan Duration */}
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.duration || "Monthly"}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-2 text-gray-600">
                    ${appointment.amount || "49.99"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
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
export default RevenueTable;
