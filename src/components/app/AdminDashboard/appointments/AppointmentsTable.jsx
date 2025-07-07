/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";

const AppointmentsTable = ({ data }) => {
  console.log("🚀 ~ AppointmentsTable ~ data:", data);
  const navigate = useNavigate();

  return (
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
                  {appointment?.shortCode}
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {appointment.appointmentDate}
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {appointment.appointmentTime}
                </td>
                <td className="py-3 px-2 text-gray-600">
                  <div className="flex items-center gap-3">
                    <img
                      src={appointment?.user?.profilePicture}
                      alt={"and"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-900 font-medium">
                      {appointment?.user?.firstName}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-600">
                  <div className="flex items-center gap-3">
                    <img
                      src={appointment?.provider?.profilePicture}
                      alt={"anc"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-900 font-medium ">
                      {appointment?.provider?.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-600 capitalize">
                  {appointment.status}
                </td>
                <td
                  onClick={() =>
                    navigate(`/app/appoitmentDetail/${appointment?._id}`)
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
  );
};
export default AppointmentsTable;
