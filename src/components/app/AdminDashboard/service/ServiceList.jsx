/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";

const ServiceList = ({ data }) => {
  console.log("🚀 ~ ServiceList ~ data:", data);
  const navigate = useNavigate();

  const handleViewDetail = (userId) => {
    navigate(`/app/service-provider-detail/${userId}`);
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
          {data?.length > 0 ? (
            data?.map((user, index) => (
              <div
                key={user._id}
                className="grid grid-cols-[40px_1.2fr_1fr_1.3fr_1fr_2fr_0.8fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
              >
                <div>{index + 1}</div>
                <div className="flex items-center gap-2">
                  <img
                    src={
                      user.profilePicture ?? "https://i.pravatar.cc/40?img=1"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-[#63CFAC]  p-0.5"
                  />
                  <span>{user.name}</span>
                </div>
                <div>{user.clinicName}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>{user?.address?.address ?? "- -"}</div>
                <div className="capitalize">{user?.profileStatus}</div>
                <div
                  className="font-medium underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
                  onClick={() => handleViewDetail(user._id)}
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

export default ServiceList;
