import { useState } from "react";
import Button from "../../../global/Button";
import { CompanyProfile } from "../../../../assets/export";
import { FiTrash2 } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import CompanyBasiInfo from "./CompanyBasiInfo";
import EmployessTable from "./EmployessTable";
import InVoiceDetail from "./InVoiceDetail";
import DeleteCompanyModal from "./DeleteCompanyModal";
import EditCompanyModal from "./EditCompanyModal";

const provider = {
  name: "John Alex",
  email: "john.alex@gmail.com",
  avatar: CompanyProfile,
  fullName: "Clinic Title",
  phone: "+000 0000 000",
  age: "25",
  gender: "Male",
  location: "Dallas, TX – 802 PainEase Plaza",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
};

const CompanyDetail = () => {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [deleteModal, setDeleteModal] = useState(false);
  const [companyEmployeeModal, setEditCompanyModal] = useState(false);
  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Company Details
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
              Cost Per Employee
            </span>
            <h3 className="font-[600] text-[24px] underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent">
              $30
            </h3>
          </div>
          <div
            onClick={() => setDeleteModal(true)}
            className="w-[58px] bg-[#FF5D5D] h-[49px]  flex justify-center items-center rounded-[10px]"
          >
            <FiTrash2 size={25} color="white" />
          </div>
          <div className="w-[58px]">
            <Button
              text={<BiEdit color="white" size={25} />}
              onClick={() => setEditCompanyModal(true)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 rounded-md shadow p-2 mb-6">
        {["Basic Info", "Employees", "Invoice"].map((tab) => (
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
      {activeTab === "Basic Info" && <CompanyBasiInfo provider={provider} />}
      {activeTab === "Employees" && <EmployessTable provider={provider} />}
      {activeTab === "Invoice" && <InVoiceDetail provider={provider} />}
      {deleteModal && (
        <DeleteCompanyModal
          handleClick={() => setDeleteModal(false)}
          onClose={() => setDeleteModal(false)}
        />
      )}
      {companyEmployeeModal && (
        <EditCompanyModal
          handleSubmit={() => setEditCompanyModal(false)}
          onCLose={() => setEditCompanyModal(false)}
        />
      )}
    </div>
  );
};

export default CompanyDetail;
