/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
import { CiEdit } from "react-icons/ci";

const EditCompanyModal = ({
  onClose,
  subscriptionData,
  companyData,
  errors,
  setErrors,
  companyLoading,
  handleCompany,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [pricingId, setPricingId] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [companyImage, setCompanyImage] = useState("");

  const [planTypeData, setPlanTypeData] = useState([]);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    price: "",
  });

  const [selected, setSelected] = useState({
    individual: false,
    couple: false,
    family: false,
  });

  const toggleCategory = (planType, typeData) => {
    setErrors((prev) => ({ ...prev, type: null }));
    setPricingId(typeData?._id);
    setSelected((prev) => ({ [planType]: !prev[planType] }));
  };

  const handleSelectPlan = (option, id, index) => {
    setErrors((prev) => ({ ...prev, plan: null }));

    setSelectedPlanId(id);
    setSelectedPlan(option);
    setShowPlanDropdown(false);
    const plan = subscriptionData[index];
    const types = [];

    if (plan?.monthly?.length > 0)
      types.push({ monthly: subscriptionData[index]?.monthly });
    if (plan?.yearly?.length > 0)
      types.push({ yearly: subscriptionData[index]?.yearly });

    setPlanTypeData(types);
  };

  const handleSelectType = (option) => {
    setErrors((prev) => ({ ...prev, plan: null }));

    setSelectedType(option);
    setShowTypeDropdown(false);
  };

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setCompanyImage(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (companyData?.subscriptionPrice?.planType) {
      setSelected((prev) => ({
        individual: false,
        couple: false,
        family: false,
        [companyData?.subscriptionPrice?.planType]: true,
      }));
    }
    if (companyData) {
      setEditData({
        name: companyData.name || "",
        email: companyData.email || "",
        price: companyData.costPerEmployee?.toString() || "",
      });
    }
  }, [companyData]);

  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-1">
      <div className="bg-white w-[471px] max-h-[95vh] overflow-y-auto rounded-[18px] shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121]">
            Edit Company
          </h2>
          <div onClick={onClose}>
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
              src={
                imagePreview
                  ? imagePreview
                  : companyData?.profilePicture || ProfileAdd
              }
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

        <div className="space-y-4">
          <AuthInput
            label="Company Name"
            placeholder="Company Name"
            type="text"
            name="companyName"
            value={editData.name}
            onChange={(e) => {
              setEditData((prev) => ({ ...prev, name: e.target.value }));
              setErrors((prev) => ({ ...prev, name: null }));
            }}
          />

          <AuthInput
            disabled={true}
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={editData.email}
            onChange={(e) => {
              setEditData((prev) => ({ ...prev, email: e.target.value }));
              setErrors((prev) => ({ ...prev, email: null }));
            }}
          />

          {isEdit ? (
            <>
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
                    <div className="absolute h-[120px] overflow-auto top-full left-0 mt-1 w-full bg-white border rounded-md shadow z-50">
                      {subscriptionData?.map((option, index) => (
                        <div
                          key={option?._id}
                          onClick={() =>
                            handleSelectPlan(option?.name, option?._id, index)
                          }
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          {option?.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors?.plan && (
                  <p className="text-red-500 text-xs -mt-4 mb-2">
                    {errors?.plan}
                  </p>
                )}
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
                      {planTypeData?.map((option) => {
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
                        onClick={() => toggleCategory(type?.planType, type)}
                      >
                        <img
                          src={
                            selected[type?.planType] ? checkBoxOne : checkBoxTwo
                          }
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

              {errors?.type && (
                <p className="text-red-500 text-xs -mt-4 mb-2">
                  {errors?.type}
                </p>
              )}
            </>
          ) : (
            <>
              <div>
                <div className="flex justify-between">
                  <label className="text-sm text-[#212121] block mb-1">
                    Subscription Plan
                  </label>
                  <span onClick={() => setIsEdit(true)}>
                    <CiEdit size={25} />
                  </span>
                </div>
                <div className="relative mb-2">
                  <div className="border px-4 py-3 rounded-[8px] text-sm cursor-pointer flex justify-between items-center">
                    <span>
                      {selectedPlan
                        ? selectedPlan
                        : companyData?.subscriptionPlan?.name}
                    </span>
                    <IoChevronDown className="text-gray-600" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-[#212121] block mb-1">
                  Subscription Type
                </label>
                <div className="relative mb-2">
                  <div className="border px-4 py-3 rounded-[8px] text-sm cursor-pointer flex justify-between items-center">
                    <span>
                      {selectedType
                        ? selectedType
                        : companyData?.subscriptionPrice?.billingPeriod}
                    </span>
                    <IoChevronDown className="text-gray-600" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[14px] font-[500] my-2">Plan Categories</h2>
                <div className="flex gap-8 items-center">
                  {["individual", "couples", "family"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <img
                        src={selected[type] ? checkBoxOne : checkBoxTwo}
                        alt="checkbox"
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium capitalize">
                        {type === "couples" ? "Couple" : type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <AuthInput
            placeholder="$30"
            type="text"
            name="costPerEmployee"
            label="Cost Per Employee"
            value={editData.price}
            onChange={(e) => {
              const value = e.target.value;
              if (!/^\d*\.?\d*$/.test(value) || /^0\d+/.test(value)) return;

              setEditData((prev) => ({ ...prev, price: value }));
              setErrors((prev) => ({ ...prev, price: null }));
            }}
          />

          <div className="pt-2">
            <Button
              loading={companyLoading}
              onClick={() =>
                handleCompany(editData, companyImage, selectedPlanId, pricingId)
              }
              text="Edit Now"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyModal;
