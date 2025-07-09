/* eslint-disable react/prop-types */

import { useNavigate } from "react-router";

const SubAdminTable = ({ data }) => {
  const navigate = useNavigate();
  const handleViewDetail = (user) => {
    navigate(`/app/sub-admin-detail/${user?._id}`, { state: { user } });
  };
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
        <div>Name</div>
        <div>Email Address</div>
        <div>Phone Number</div>
        <div>Action</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {data?.length > 0 ? (
          data?.map((user, index) => (
            <div
              key={user._id}
              className="grid grid-cols-[40px_1.5fr_2fr_1.5fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
            >
              <div>{index + 1}</div>
              <div className="flex items-center gap-2">
                <img
                  src={user?.profilePicture}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-[#63CFAC]  p-0.5"
                />
                <span>
                  {user.firstName} {user.firstName}
                </span>
              </div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
              <div
                className="font-medium underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
                onClick={() => handleViewDetail(user)}
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
  );
};

export default SubAdminTable;
