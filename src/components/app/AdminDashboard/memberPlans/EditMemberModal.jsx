import React, { useState } from "react";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";
import { FaTrashAlt } from "react-icons/fa";
import AuthInput from "../../../global/AuthInput";

const EditMemberModal = ({ onClose }) => {
  const [duration, setDuration] = useState("Monthly");
  const [membershipName, setMembershipName] = useState("");
  const [price, setPrice] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [description, setDescription] = useState("");

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  const removeBenefit = (index) => {
    const updated = [...benefits];
    updated.splice(index, 1);
    setBenefits(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[18px] shadow-lg p-6">
        {/* Modal Header */}
        <div className="flex border-b pb-4 justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121]">
            Edit Membership Plan
          </h2>
          <img
            src={CrossImag}
            onClick={onClose}
            alt="close"
            className="w-[22px] h-[22px] cursor-pointer"
          />
        </div>
        <h2 className="text-[16px] font-[400] text-[#000000] mb-2 ">
          Duration
        </h2>
        {/* Duration Tabs */}
        <div className="flex gap-3 mb-4">
          {["Monthly", "Yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setDuration(type)}
              className={`w-[150px] h-[40px] rounded-md font-medium text-sm ${
                duration === type
                  ? "bg-gradient-to-r from-[#29ABE2] to-[#63CFAC] text-white"
                  : "bg-[#E8E8E8] text-[#212121]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <AuthInput type={"text"} placeholder={"Membership Name"} />
          <AuthInput type={"text"} placeholder={"Price"} />

          <div className="flex gap-2">
            <div className="w-full">
              <AuthInput
                type={"text"}
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                placeholder={"Benefits"}
              />
            </div>

            <button
              onClick={addBenefit}
              className="w-[80px] bg-gradient-to-r from-[#29ABE2] to-[#63CFAC] text-white rounded-md text-sm font-medium"
            >
              Add
            </button>
          </div>

          <div className="max-h-[140px]  space-y-2  overflow-auto">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#E0E0E0] px-3 py-2 rounded-md flex justify-between items-center"
              >
                <span className="text-sm text-[#000000] font-medium">
                  {item}
                </span>
                <FaTrashAlt
                  className="text-red-600 cursor-pointer"
                  onClick={() => removeBenefit(idx)}
                />
              </div>
            ))}
          </div>

          <textarea
            rows={4}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-md text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <Button text="Save" />
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
