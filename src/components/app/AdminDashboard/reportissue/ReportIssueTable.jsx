/* eslint-disable react/prop-types */

import { useState } from "react";
import { getDateFormat } from "../../../../lib/helpers";

const ReportIssueTable = ({ data }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  return (
    <div className="bg-[#FAFAFA] p-4 rounded-md">
      {/* Header Row */}
      <div
        className="grid grid-cols-[40px_1.5fr_2fr_1.5fr_1fr_1fr] gap-4 px-4 py-3 rounded-md text-[14px] font-[500] text-black"
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
        <div>Action</div>
      </div>

      {/* Data Rows */}
      <div className="divide-y">
        {data?.length > 0 ? (
          data.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-[40px_1.5fr_2fr_1.5fr_1fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
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
  {user?.description?.length > 40
    ? `${user.description.slice(0, 40)}...`
    : user.description}
</div>

              <div>{getDateFormat(user?.date)}</div>
              <div>
                {user?.createdAt?.split("T")[1]?.split(":").slice(0, 2).join(":")}
              </div>
              <div>
                <button
                  onClick={() => handleViewDetails(user)}
                    className="py-3 font-[500]   px-2 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent cursor-pointer hover:border-b-[#63CFAC]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500 col-span-6">No results found.</div>
        )}
      </div>

      {/* Modal */}
{isModalOpen && selectedIssue && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5 border-t-4 border-[#63CFAC]">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#29ABE2]">Issue Details</h2>
        <button
          onClick={handleCloseModal}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <span className="font-medium text-gray-600">Member:</span>{" "}
          {selectedIssue.userDetails?.firstName}
        </div>

        <div>
          <span className="font-medium text-gray-600">Date:</span>{" "}
          {getDateFormat(selectedIssue.date)}
        </div>

        <div>
          <span className="font-medium text-gray-600">Time:</span>{" "}
          {selectedIssue.createdAt?.split("T")[1]?.split(":").slice(0, 2).join(":")}
        </div>

        <div>
          <span className="font-medium text-gray-600">Description:</span>
          <div className="mt-1 p-2 bg-gray-50 border rounded text-gray-800 whitespace-pre-line break-words max-h-[400px] overflow-y-auto">
            {selectedIssue.description}
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end mt-5">
        <button
          onClick={handleCloseModal}
          className="bg-[#29ABE2] hover:bg-[#63CFAC] text-white px-4 py-1.5 rounded-md text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default ReportIssueTable;
