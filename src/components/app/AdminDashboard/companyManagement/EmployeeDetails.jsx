import Button from "../../../global/Button";
import { CompanyProfile } from "../../../../assets/export";
import { FiTrash2 } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import EmployeeBasicInfo from "./EmployeeBasicInfo";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import { useState } from "react";
import EditEmployeeModal from "./EditEmployeeModal";

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

const EmployeeDetails = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Employee Details
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
            <h3 className="font-[600] text-[24px] underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent">
              <span className="text-black">Basic Plan</span> (individual)
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
              onClick={() => setEditEmployeeModal(true)}
            />
          </div>
        </div>
      </div>
      <EmployeeBasicInfo provider={provider} />

      {deleteModal && (
        <DeleteEmployeeModal
          handleClick={() => setDeleteModal(false)}
          onClose={() => setDeleteModal(false)}
        />
      )}
      {editEmployeeModal && (
        <EditEmployeeModal
          handleSubmit={() => setEditEmployeeModal(false)}
          onClose={() => setEditEmployeeModal(false)}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
