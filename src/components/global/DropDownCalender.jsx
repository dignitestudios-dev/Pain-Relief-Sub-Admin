import React, { useState } from "react";
import { CrossImag } from "../../assets/export";
import { IoChevronDown } from "react-icons/io5";
import Calender from "./DatePicker";
import Button from "./Button";

const DropDownCalender = ({ onClose }) => {
  const [referralType, setReferralType] = useState("Select Referral Type");
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleSelect = (option) => {
    setReferralType(option);
    setShowDropdown(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end bg-black/30">
      <div className="bg-white absolute top-52 right-12 rounded-[13px] w-[371px] p-3 shadow-md">
        <div
          className="flex justify-between items-center border-b pb-2"
          onClick={onClose}
        >
          <h2 className="text-[18px]  font-[600] ">Filter</h2>
          <img
            src={CrossImag}
            className="w-[22px] h-[22px] cursor-pointer"
            alt="Close"
          />
        </div>

        <div className="flex justify-between gap-4 my-4">
          <Calender
            endDate={true}
            startDate={startDate ? startDate.toISOString().split("T")[0] : ""}
            setStartDate={setStartDate}
            text={"DD/MM/YY"}
            isStyle={true}
            label={"Start Date"}
          />
          <Calender
            endDate={true}
            startDate={endDate ? endDate.toISOString().split("T")[0] : ""}
            setStartDate={setEndDate}
            text={"DD/MM/YY"}
            isStyle={true}
            label={"End Date"}
          />
        </div>

        <h2 className="text-[14px] font-[500] mb-2">Referral Type</h2>
        <div className="relative mb-4">
          <div
            className="border px-4 py-3 rounded-[8px] text-sm cursor-pointer flex justify-between items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{referralType}</span>
            <IoChevronDown className="text-gray-600" />
          </div>

          {showDropdown && (
            <div className="absolute h-[90px] top-full left-0 mt-1 w-full bg-white border rounded-md shadow z-50">
              {["Subscribed", "Unsubscribed"].map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button className="bg-[#DCDCDC] w-[165px] rounded-[8px] h-[49px] font-medium">
            Clear
          </button>
          <div className="w-[165px]">
            <Button text="Apply" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownCalender;
