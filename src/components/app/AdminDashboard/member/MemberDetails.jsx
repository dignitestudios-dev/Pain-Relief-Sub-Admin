import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../../global/Button";
import ReferalTable from "./ReferalTable";
import FamilyMember from "./FamilyMember";
import BasicInfo from "./BasicInfo";
import { useFetchById } from "../../../../hooks/api/Get";
import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io";

const MemberDetails = () => {
  const navigate =useNavigate()
  const [activeTab, setActiveTab] = useState("Basic Info");
  const { id } = useParams();
  const { data, loading } = useFetchById(`/admin/get-member/${id}`);
  const { data: referralData, loading: loader } = useFetchById(
    `/admin/get-member-referral?userId=${id}`
  );
  console.log("🚀 ~ MemberDetails ~ referralData:", referralData);

  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <div className="flex items-center cursor-pointer " onClick={()=>navigate(-1)}>
        <IoIosArrowRoundBack size={18} />
        <p className="text-[14px] font-[600] ">Back</p>
      </div>
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Members Details
      </h2>

      <div className="flex justify-between items-center  rounded-lg shadow-sm mb-10  bg-[#FAFAFA] p-4">
        <div className="flex items-center  mb-4">
          <img
            src={data?.profilePicture ?? "https://i.pravatar.cc/100?img=5"}
            alt="avatar"
            className="w-[116px] h-[116px] rounded-full border border-[#63CFAC] mr-6 p-0.5"
          />
          <div>
            <h3 className="text-[32px] font-[600]">
              {data?.firstName} {data?.lastName}
            </h3>
            <p className="text-[#565656] text-[16px] font-[500] ">
              {data?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-end">
            <span className=" text-[16px] font-[500] text-[#565656] ">
              Current Plan
            </span>
            <h3 className="font-[600] text-[24px] text-[#000000]">
              {data?.currentPlan ?? "Unsubscribed"}
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

      {activeTab === "Basic Info" && <BasicInfo provider={data} />}

      {activeTab === "Family Members" && (
        <FamilyMember provider={data?.familyMembers} />
      )}

      {activeTab === "Referral Friends" && (
        <ReferalTable referralData={referralData} loader={loader} />
      )}
    </div>
  );
};

export default MemberDetails;
