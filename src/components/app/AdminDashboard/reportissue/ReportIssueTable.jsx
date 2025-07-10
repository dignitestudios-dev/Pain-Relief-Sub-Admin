import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";
import Button from "../../../global/Button";
import { getDateFormat } from "../../../../lib/helpers";

const staticUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    issue:
      "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
    date: "26 Feb, 2025",
    time: "08:00pm",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
];

const ReportIssueTable = ({ data, handleSearch, typeValue }) => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-[32px] font-[600] text-gray-900">
          Report an Issue
        </h1>

        <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[49px] shadow-sm">
          <IoSearch className="text-gray-400 mr-2 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
            value={typeValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
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
                <div className="text-gray-700">{user?.description}</div>
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
    </div>
  );
};

export default ReportIssueTable;
