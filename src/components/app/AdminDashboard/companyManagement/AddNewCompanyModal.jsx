import React, { useState } from "react";
import {
  checkBoxOne,
  checkBoxTwo,
  CrossImag,
  ProfileAdd,
} from "../../../../assets/export";
import Button from "../../../global/Button";
import AuthInput from "../../../global/AuthInput";
import { IoChevronDown } from "react-icons/io5";
import { useRef } from "react";

const AddNewCompanyModal = ({ onCLose }) => {
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [selected, setSelected] = useState({
    individual: false,
    couple: false,
    family: false,
  });

  const toggleCategory = (type) => {
    setSelected((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSelectPlan = (option) => {
    setSelectedPlan(option);
    setShowPlanDropdown(false);
  };

  const handleSelectType = (option) => {
    setSelectedType(option);
    setShowTypeDropdown(false);
  };

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-1">
      <div className="bg-white w-[471px] max-h-[95vh] overflow-y-auto rounded-[18px] shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121]">
            Add New Company
          </h2>
          <div onClick={onCLose}>
            <img
              className="w-[22px] h-[22px] cursor-pointer"
              src={CrossImag}
              alt="close"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-6 items-center">
          <div className="w-[84px] h-[84px] rounded-full overflow-hidden bg-[#f0f0f0]">
            <img
              src={imagePreview || ProfileAdd}
              alt="upload"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={triggerFileSelect}
            className="bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent text-[14px] font-medium mt-2 underline"
          >
            Upload Picture
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <form className="space-y-4">
          <AuthInput
            label={"Company Name"}
            placeholder="Company Name"
            type="text"
            name="companyName"
          />
          <AuthInput
            label={"Email"}
            placeholder="Enter your email"
            type="email"
            name="email"
          />

          <div>
            <label className="text-sm text-[#212121] block mb-1">
              Subscription Plan
            </label>
            <div className="relative mb-2">
              <div
                className="border px-4 py-3 rounded-[8px] text-sm cursor-pointer flex justify-between items-center"
                onClick={() => {
                  setShowPlanDropdown(!showPlanDropdown);
                  setShowTypeDropdown(false);
                }}
              >
                <span>
                  {selectedPlan ? selectedPlan : "Select Subscription Plan"}
                </span>
                <IoChevronDown className="text-gray-600" />
              </div>

              {showPlanDropdown && (
                <div className="absolute h-[90px] top-full left-0 mt-1 w-full bg-white border rounded-md shadow z-50">
                  {["Monthly", "Yearly"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelectPlan(option)}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-[14px] font-[500] my-2">Plan Categories</h2>
            <div className="flex gap-8 items-center">
              {["individual", "couple", "family"].map((type) => (
                <div
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => toggleCategory(type)}
                >
                  <img
                    src={selected[type] ? checkBoxOne : checkBoxTwo}
                    alt="checkbox"
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-[#212121] block mb-1">
              Subscription Type
            </label>
            <div className="relative mb-2">
              <div
                className="border px-4 py-3 rounded-[8px] text-sm cursor-pointer flex justify-between items-center"
                onClick={() => {
                  setShowTypeDropdown(!showTypeDropdown);
                  setShowPlanDropdown(false);
                }}
              >
                <span>
                  {selectedType ? selectedType : "Select Subscription Type"}
                </span>
                <IoChevronDown className="text-gray-600" />
              </div>

              {showTypeDropdown && (
                <div className="absolute h-[90px] top-full left-0 mt-1 w-full bg-white border rounded-md shadow z-50">
                  {["Premium", "Standard"].map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelectType(option)}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <AuthInput
            placeholder="$30"
            type="text"
            name="costPerEmployee"
            label="Cost Per Employee"
          />

          <div className="pt-2">
            <Button text="Add Now" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCompanyModal;
