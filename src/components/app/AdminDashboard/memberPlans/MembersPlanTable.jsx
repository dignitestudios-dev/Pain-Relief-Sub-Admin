import React, { useState } from "react";
import Button from "../../../global/Button";
import { FaPlus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const staticUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    benefit: "Massage Therapy, Chiropractic Care",
    memberType: "Monthly",
    memberPrice: "$9.99/mo",
  },
  {
    id: 2,
    name: "Bob Smith",
    description: "Access to wellness programs and online sessions.",
    benefit: "Online Consultation, Priority Booking",
    memberType: "Yearly",
    memberPrice: "$99.99/yr",
  },
];

const MembersPlanTable = ({ setMemberModal, handleViewDetail }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Membership Plan
          </h1>
        </div>

        <div className="flex gap-4 items-center">
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
          <div className="w-[61px]">
            <Button text={<FaPlus />} onClick={() => setMemberModal(true)} />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA]  rounded-md">
        <div
          className="grid grid-cols-[40px_1.2fr_2fr_2fr_1fr_1fr_1fr] gap-4 px-4 py-3 rounded-md text-[14px] font-[500] text-black"
          style={{
            background:
              "linear-gradient(234.85deg, rgba(41, 171, 226, 0.2) -20.45%, rgba(99, 207, 172, 0.2) 124.53%)",
          }}
        >
          <div>#</div>
          <div>Name</div>
          <div>Description</div>
          <div>Membership Benefits</div>
          <div>Membership Type</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        <div className="divide-y">
          {staticUsers.length > 0 ? (
            staticUsers.map((user, index) => (
              <div
                key={user.id}
                className="grid grid-cols-[40px_1.2fr_2fr_2fr_1fr_1fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
              >
                <div>{index + 1}</div>
                <div>{user.name}</div>
                <div>{user.description}</div>
                <div>{user.benefit}</div>
                <div>{user.memberType}</div>
                <div>{user.memberPrice}</div>
                <div
                  className="font-medium underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
                  onClick={handleViewDetail}
                >
                  View Detail
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 col-span-7">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersPlanTable;
