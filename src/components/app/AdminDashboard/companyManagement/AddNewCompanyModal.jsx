/* eslint-disable react/prop-types */
import { useState } from "react";
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

const AddNewCompanyModal = ({
  onCLose,
  plans,
  handleCompany,
  companyLoading,
  errors,
  setErrors,
}) => {
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const [planTypeData, setPlanTypeData] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [companyData, setCompanyData] = useState({});
  const [companyImage, setCompanyImage] = useState("");

  const [selected, setSelected] = useState({
    individual: false,
    couples: false,
    family: false,
  });

  const toggleCategory = (type) => {
    setSelected((prev) => ({ [type]: !prev[type] }));
  };

  const handleSelectPlan = (option, index) => {
    setSelectedPlan(option);
    setShowPlanDropdown(false);
    const plan = plans[index];
    const types = [];

    if (plan?.monthly?.length > 0)
      types.push({ monthly: plans[index]?.monthly });
    if (plan?.yearly?.length > 0) types.push({ yearly: plans[index]?.yearly });

    setPlanTypeData(types);
  };

  const handleSelectType = (option) => {
    setSelectedType(option);
    setShowTypeDropdown(false);
  };

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    setErrors((prev) => ({ ...prev, image: null }));
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCompanyImage(file);
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
        {errors.image && (
          <p className="text-red-500 text-xs -mt-4 mb-2">{errors.image}</p>
        )}
        <div className="space-y-4">
          <div>
            <AuthInput
              label={"Company Name"}
              placeholder="Company Name"
              type="text"
              name="companyName"
              onChange={(e) => {
                setCompanyData((prev) => ({ ...prev, name: e.target.value }));
                setErrors((prev) => ({ ...prev, name: null }));
              }}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <AuthInput
              label={"Email"}
              placeholder="Enter your email"
              type="email"
              name="email"
              onChange={(e) => {
                setCompanyData((prev) => ({ ...prev, email: e.target.value }));
                setErrors((prev) => ({ ...prev, email: null }));
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2 gap-1">
            <label className="text-[15px] text-[#212121] font-[400] block mb-1">
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
                  {plans?.map((option, index) => (
                    <div
                      key={option?._id}
                      onClick={() => handleSelectPlan(option?.name, index)}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {option?.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 gap-1">
            <label className="text-[15px] text-[#212121] font-[400] block mb-1">
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
                  {Object.keys(selectedType)[0]
                    ? Object.keys(selectedType)[0]
                    : "Select Subscription Type"}
                </span>
                <IoChevronDown className="text-gray-600" />
              </div>

              {showTypeDropdown && (
                <div className="absolute h-[90px] top-full left-0 mt-1 w-full bg-white border rounded-md shadow z-50">
                  {planTypeData?.map((option, index) => {
                    const key = Object.keys(option)[0];
                    const value = option[key];

                    return (
                      <div
                        key={key}
                        onClick={() => handleSelectType({ [key]: value })}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-[14px] font-[500] ">Plan Categories</h2>
            <div className="flex gap-8 items-center">
              {Object.values(selectedType)[0]?.map((type) => {
                return (
                  <div
                    key={type?._id}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleCategory(type?.planType)}
                  >
                    <img
                      src={selected[type?.planType] ? checkBoxOne : checkBoxTwo}
                      alt="checkbox"
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium capitalize">
                      {type?.planType}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <AuthInput
            placeholder="$30"
            type="text"
            name="costPerEmployee"
            label="Cost Per Employee"
            onChange={(e) =>
              setCompanyData((prev) => ({ ...prev, price: e.target.value }))
            }
          />

          <div className="pt-2">
            <Button
              onClick={() => handleCompany(companyData, companyImage)}
              text="Add Now"
              type="button"
              loading={companyLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCompanyModal;
