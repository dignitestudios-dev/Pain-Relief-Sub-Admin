import { useState } from "react";
import { AppointmentData } from "../../../../static/Static";
import { useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import DropDownCalender from "../../../global/DropDownCalender";

const UniqueReferralTable = () => {
  const navigate = useNavigate();
  const tabs = ["User Referral", "Chiropractor Referral"];
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
            Unique Referral
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
        {/* Search */}
        <div className="flex gap-4">
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
          <div
            onClick={() => setFilterDropDown((prev) => !prev)}
            className="flex w-[40px] cursor-pointer justify-center items-center  bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] h-[41px] rounded-[8px] "
          >
            <CiFilter color="white" size={25} />
          </div>
        </div>
      </div>
      {filterDropDown && <DropDownCalender onClose={()=>setFilterDropDown(false)} />}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-gray-700 text-xs capitalize font-semibold tracking-wide">
              <th className="py-3 px-2 text-center w-12">#</th>
              <th className="py-3 px-2">Appointment ID</th>
              <th className="py-3 px-2">Referral by</th>
              <th className="py-3 px-2">Referred Member</th>
              <th className="py-3 px-2">Member Email Address</th>
              <th className="py-3 px-2">Sign Up Date</th>
              <th className="py-3 px-2">Status</th>
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
                  <td className="py-3 px-2 text-gray-600">johnalex@mail.com</td>
                  <td className="py-3 px-2 text-gray-600">
                    {appointment.date}
                  </td>
                  <td className="py-3 px-2 text-gray-600">Subscribed</td>
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
export default UniqueReferralTable;
