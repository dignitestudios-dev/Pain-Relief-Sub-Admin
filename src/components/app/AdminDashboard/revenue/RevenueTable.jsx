import { getDateFormat } from "../../../../lib/helpers";

const RevenueTable = ({ data }) => {
  return (
    <div>
      {/* Header and Tabs */}

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
            {data?.length > 0 ? (
              data?.map((appointment, index) => (
                <tr
                  key={appointment.id || index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  {/* User Name */}
                  <td className="py-3 px-2 text-gray-600">
                    <div className="flex items-center gap-3">
                      <img
                        src={appointment?.profilePicture}
                        alt={appointment?.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-900 font-medium">
                        {appointment?.userName}
                      </span>
                    </div>
                  </td>

                  {/* Main Plan */}
                  <td className="py-3 px-2 text-gray-600">
                    {appointment?.planName}
                  </td>

                  {/* Category */}
                  <td className="py-3 px-2 text-gray-600">
                    {appointment?.category}
                  </td>

                  {/* Plan Date */}
                  <td className="py-3 px-2 text-gray-600">
                    {getDateFormat(appointment?.planDate)}
                  </td>

                  {/* Plan Duration */}
                  <td className="py-3 px-2 text-gray-600">
                    {appointment?.planDuration}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-2 text-gray-600">
                    ${appointment?.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-gray-500 py-10 font-medium"
                >
                  No revenue found.
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
