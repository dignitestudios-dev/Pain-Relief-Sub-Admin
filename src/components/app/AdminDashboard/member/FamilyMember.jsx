/* eslint-disable react/prop-types */
import React from "react";

const FamilyMember = ({ provider }) => {
  return (
    <div className="max-w-7xl mx-auto p-6  min-h-screen bg-[#FAFAFA] rounded-md">
      <h1 className="text-[24px] font-[600] text-gray-900 mb-8">
        Family Members
      </h1>

      {provider.length > 0 ? (
        <div className="space-y-8">
          {provider?.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={
                        member?.profilePicture ??
                        "https://placeholder.vn/placeholder/300x200?bg=cccccc&color=333333&text=No+Image"
                      }
                      alt="avatar"
                      className="w-20 h-20 rounded-full border border-[#63CFAC]  p-0.5"
                    />
                  </div>

                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h2>
                    <p className="text-gray-600 text-sm">{member.email}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-gray-900 mb-1">Phone Number</p>
                  <p className="text-gray-600">{member.phone}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Age</p>
                  <p className="text-gray-600">{member.dateOfBirth}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Gender</p>
                  <p className="text-gray-600">{member.gender}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-52">
          No record found
        </div>
      )}
    </div>
  );
};

export default FamilyMember;
