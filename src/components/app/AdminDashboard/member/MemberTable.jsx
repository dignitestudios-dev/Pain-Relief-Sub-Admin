/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";

const MemberTable = ({
  data,
  handleTab,
  activeTab,
  typeValue,
  handleSearch,
}) => {
  console.log("🚀 ~ MemberTable ~ data:", data);
  const navigate = useNavigate();
  const tabs = ["All", "Subscribed", "Unsubscribed"];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Members
          </h1>

          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTab(tab)}
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
        <div className="mt-4 md:mt-0">
          <input
            type="search"
            placeholder="Search"
            value={typeValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-48 border border-gray-300 rounded-md py-2 px-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-blue-50 text-gray-700 text-xs uppercase font-semibold tracking-wide">
              <th className="py-3 px-2 text-center w-12">#</th>
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email Address</th>
              <th className="py-3 px-2">Phone Number</th>
              <th className="py-3 px-2">Location</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data?.map((member, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 px-2 text-center text-gray-600">
                    {index + 1}
                  </td>
                  <td className="flex items-center gap-3 py-3 px-2">
                    <img
                      src={member?.profilePicture}
                      alt={member?.firstName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-900 font-medium">
                      {member?.firstName} {member?.lastName}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-600">{member.email}</td>
                  <td className="py-3 px-2 text-gray-600">{member.phone}</td>
                  <td className="py-3 px-2 text-gray-600">
                    {member.country}, {member.state}
                  </td>
                  <td className="py-3 px-2 text-gray-900 font-semibold">
                    {member.isSubscribed ? "Subscribed" : "Un Subscribed"}
                  </td>
                  <td
                    onClick={() =>
                      navigate(`/app/member-details/${member?._id}`)
                    }
                    className="py-3 px-2  bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent cursor-pointer hover:border-b-[#63CFAC]"
                  >
                    View Detail
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
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
export default MemberTable;
