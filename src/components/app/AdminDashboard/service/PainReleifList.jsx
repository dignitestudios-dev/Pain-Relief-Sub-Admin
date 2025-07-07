import React, { useState } from "react";
import { useNavigate } from "react-router";
const staticUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    clinicTitle: "Downtown Clinic",
    email: "alice@example.com",
    phone: "+123 456 7890",
    clinicLocation: "New York, NY – 123 Main St",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Bob Smith",
    clinicTitle: "Healthy Life Clinic",
    email: "bob@example.com",
    phone: "+987 654 3210",
    clinicLocation: "Los Angeles, CA – 456 Sunset Blvd",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Carla Davis",
    clinicTitle: "WellCare Clinic",
    email: "carla@example.com",
    phone: "+111 222 3333",
    clinicLocation: "Chicago, IL – 789 Lake Shore Dr",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
];

const PainReleifList = ({ search, setSearch }) => {
  const navigate = useNavigate(); // ✅ initialize navigation

  const filteredData = staticUsers.filter((user) =>
    user.name?.toLowerCase().includes(search?.toLowerCase())
  );

  const handleViewDetail = (userId) => {
    navigate(`/app/user-details`); // or `/app/user-details?id=${userId}` if using query params
  };

  return (
    <div>
      <div className="bg-[#FAFAFA] p-4 rounded-md">
        <div
          className="grid grid-cols-[40px_1.2fr_1fr_1.3fr_1fr_2fr_0.8fr_1fr] gap-4 px-4 py-3 rounded-md text-sm text-black"
          style={{
            background:
              "linear-gradient(234.85deg, rgba(41, 171, 226, 0.2) -20.45%, rgba(99, 207, 172, 0.2) 124.53%)",
          }}
        >
          <div>#</div>
          <div>Name</div>
          <div>Clinic Name</div>
          <div>Email Address</div>
          <div>Phone Number</div>
          <div>Clinic Location</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {filteredData.length > 0 ? (
            filteredData.map((user, index) => (
              <div
                key={user.id}
                className="grid grid-cols-[40px_1.2fr_1fr_1.3fr_1fr_2fr_0.8fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
              >
                <div>{index + 1}</div>
                <div className="flex items-center gap-2">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-[#63CFAC]  p-0.5"
                  />
                  <span>{user.name}</span>
                </div>
                <div>{user.clinicTitle}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>{user.clinicLocation}</div>
                <div>Pending</div>
                <div
                  className="font-medium underline cursor-pointer text-[#63CFAC]"
                  onClick={() => handleViewDetail(user.id)} // ✅ click handler here
                >
                  View Detail
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 col-span-8">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PainReleifList;
