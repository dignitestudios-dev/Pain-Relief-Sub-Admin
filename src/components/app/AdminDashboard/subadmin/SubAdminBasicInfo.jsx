/* eslint-disable react/prop-types */
import React from "react";

const SubAdminBasicInfo = ({ provider }) => {
  return (
    <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-6">
      <p className="text-[24px] font-[600] ">Sub Admin Info</p>
      <span className="w-full border border-b flex"></span>
      <InfoRow
        label="Full Name"
        value={provider.firstName + "" + provider.firstName}
      />
      <InfoRow label="Email Address" value={provider.email} />
      <InfoRow label="Mobile Number" value={provider.phone} />
    </div>
  );
};
const InfoRow = ({ label, value, multi, last }) => (
  <div className={`py-2 ${!last ? "border-b border-gray-300" : ""}`}>
    <p className="text-[#565656] text-[14px] font-[500] mb-1">{label}</p>
    <p
      className={`text-black font-[500] text-[16px] ${
        multi ? "whitespace-pre-line" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
export default SubAdminBasicInfo;
