/* eslint-disable react/prop-types */

import { getDateFormat } from "../../../../lib/helpers";

// import { useNavigate } from "react-router";

const UniqueReferralTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left text-sm text-gray-700">
        <thead>
          <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-gray-700 text-xs capitalize font-semibold tracking-wide">
            <th className="py-3 px-2 text-center w-12">#</th>
            <th className="py-3 px-2">Referral ID</th>
            <th className="py-3 px-2">Referral by</th>
            <th className="py-3 px-2">Referred Member</th>
            <th className="py-3 px-2">Member Email Address</th>
            <th className="py-3 px-2">Sign Up Date</th>
            <th className="py-3 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data?.map((appointment, index) => (
              <tr
                key={appointment.id || index}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-3 px-2 text-center text-gray-600">
                  {index + 1}
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {appointment?.referId}
                </td>
                <td className="py-3 px-2 text-gray-600">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        appointment?.referredBy?.profilePicture ??
                        "https://i.pravatar.cc/40?img=4"
                      }
                      alt={appointment?.referredBy?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-900 font-medium">
                      {appointment?.referredBy?.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-600">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        appointment?.referredUser?.profilePicture ??
                        "https://i.pravatar.cc/40?img=4"
                      }
                      alt={appointment?.referredUser?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-900 font-medium">
                      {appointment?.referredUser?.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {appointment?.email}
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {getDateFormat(appointment.createdAt)}
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {appointment.status === "active"
                    ? "Subscribed"
                    : "Unsubscribed"}
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
  );
};
export default UniqueReferralTable;
