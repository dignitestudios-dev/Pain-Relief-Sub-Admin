import { useState } from "react";
import Button from "../../../global/Button";
import BasicInfo from "./BasicInfo";
import MedicalLicense from "./MedicalLicense";
import { useParams } from "react-router";
import { useFetchById } from "../../../../hooks/api/Get";

const DetailPage = () => {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const { id } = useParams();
  const { data, loading } = useFetchById(`/admin/get-provider/${id}`);

  console.log("🚀 ~ DetailPage ~ data:", data);
  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
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
            <h3 className="text-[32px] font-[600]">{data.name}</h3>
            <p className="text-[#565656] text-[16px] font-[500] ">
              {data.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <button className="border rounded-[8px] font-[500]  border-[#C31736] text-[#C31736]  w-[184px] h-[49px] ">
              Reject
            </button>
          </div>
          <div className="w-[184px]">
            <Button text={"Accept"} />
          </div>
        </div>
      </div>

      <div className="flex gap-4 rounded-md shadow p-2 mb-6">
        {["Basic Info", "Medical License"].map((tab) => (
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
      {activeTab === "Medical License" && <MedicalLicense provider={data} />}

      {/* {activeTab === "Family Members" && <FamilyMember />}

      {activeTab === "Referral Friends" && <ReferalTable />} */}
    </div>
  );
};

export default DetailPage;
