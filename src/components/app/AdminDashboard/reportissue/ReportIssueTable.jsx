/* eslint-disable react/prop-types */

import { getDateFormat } from "../../../../lib/helpers";

const ReportIssueTable = ({ data }) => {
  return (
    <div className="bg-[#FAFAFA] p-4 rounded-md">
      <div
        className="grid grid-cols-[40px_1.5fr_2fr_1.5fr_1fr] gap-4 px-4 py-3 rounded-md text-[14px] font-[500] text-black"
        style={{
          background:
            "linear-gradient(234.85deg, rgba(41, 171, 226, 0.2) -20.45%, rgba(99, 207, 172, 0.2) 124.53%)",
        }}
      >
        <div>#</div>
        <div>Member Name</div>
        <div>Issue</div>
        <div>Date</div>
        <div>Time</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {data?.length > 0 ? (
          data?.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-[40px_1.5fr_2fr_1.5fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
            >
              <div>{index + 1}</div>
              <div className="flex items-center gap-2">
                <img
                  src={user?.userDetails?.profilePicture}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-[#63CFAC] p-0.5"
                />
                <span>{user?.userDetails?.firstName}</span>
              </div>
              <div className="text-gray-700 break-words w-[350px]">
                {user?.description}
              </div>
              <div>{getDateFormat(user?.date)}</div>
              <div>
                {user?.createdAt
                  ?.split("T")[1]
                  ?.split(":")
                  .slice(0, 2)
                  .join(":")}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 col-span-5">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportIssueTable;
