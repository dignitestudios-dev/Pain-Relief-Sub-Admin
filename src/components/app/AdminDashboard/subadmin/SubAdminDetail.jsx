import { useState } from "react";
import Button from "../../../global/Button";
import SubAdminBasicInfo from "./SubAdminBasicInfo";
import SubAdminEditModal from "./SubAdminEditModal";

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

const SubAdminDetail = () => {
  const [editModal, setEditModal] = useState(false);
  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Sub Admin Details
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

        <div className="w-[184px]">
          <Button text={"Edit"} onClick={() => setEditModal(true)} />
        </div>
      </div>
      <SubAdminBasicInfo provider={provider} />
      {editModal && <SubAdminEditModal onCLose={() => setEditModal(false)} />}
    </div>
  );
};

export default SubAdminDetail;
