/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";

const MemberTable = ({ data }) => {
  console.log("🚀 ~ MemberTable ~ data:", data);
  const navigate = useNavigate();

  return (
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
                  {member.isSubscribed ? "Subscribed" : "Unsubscribed"}
                </td>
                <td
                  onClick={() => navigate(`/app/member-details/${member?._id}`)}
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
  );
};
export default MemberTable;
