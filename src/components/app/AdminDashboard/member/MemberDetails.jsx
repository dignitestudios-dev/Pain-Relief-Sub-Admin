import { useState } from "react";
import Button from "../../../global/Button";
import ReferalTable from "./ReferalTable";
import FamilyMember from "./FamilyMember";
import BasicInfo from "./BasicInfo";

const provider = {
  name: "John Alex",
  email: "john.alex@gmail.com",
  avatar: "https://i.pravatar.cc/100?img=5",
  fullName: "Clinic Title",
  phone: "+000 0000 000",
  age: "25",
  gender: "Male",
  location: "Dallas, TX – 802 PainEase Plaza",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
};

const MemberDetails = () => {
  const [activeTab, setActiveTab] = useState("Basic Info");

  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Members Details
      </h2>

      <div className="flex justify-between items-center  rounded-lg shadow-sm mb-10  bg-[#FAFAFA] p-4">
        <div className="flex items-center  mb-4">
          <img
            src={provider.avatar}
            alt="avatar"
            className="w-[116px] h-[116px] rounded-full border border-[#63CFAC] mr-6 p-0.5"
          />
          <div>
            <h3 className="text-[32px] font-[600]">{provider.name}</h3>
            <p className="text-[#565656] text-[16px] font-[500] ">
              {provider.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-end">
            <span className=" text-[16px] font-[500] text-[#565656] ">
              Current Plan
            </span>
            <h3 className="font-[600] text-[24px] text-[#000000]">
              Standard Plan
            </h3>
          </div>
          <div className="w-[184px]">
            <Button text={"Disable"} />
          </div>
        </div>
      </div>

      <div className="flex gap-4 rounded-md shadow p-2 mb-6">
        {["Basic Info", "Family Members", "Referral Friends"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 h-[50px] rounded-md text-[18px] font-[500]  ${
              activeTab === tab
                ? "bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] text-white "
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Basic Info" && <BasicInfo provider={provider} />}

      {activeTab === "Family Members" && <FamilyMember />}

      {activeTab === "Referral Friends" && <ReferalTable />}
    </div>
  );
};

export default MemberDetails;
