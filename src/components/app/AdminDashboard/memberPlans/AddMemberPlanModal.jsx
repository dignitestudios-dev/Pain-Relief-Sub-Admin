/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { checkBoxOne, checkBoxTwo, CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";
import { FaTrashAlt } from "react-icons/fa";
import AuthInput from "../../../global/AuthInput";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import axios from "../../../../axios";

const AddMemberPlanModal = ({ onClose, setUpdate }) => {
  const [subscriptionPlanId, setSubscriptionPlanId] = useState("");

  const [duration, setDuration] = useState("Monthly");
  const [planName, setPlanName] = useState("");

  const [benefitInput, setBenefitInput] = useState("");
  const [benefits, setBenefits] = useState([]);

  const [selectedMonthlyCategory, setSelectedMonthlyCategory] = useState([
    "individual",
  ]);

  const [monthlyCategoryData, setMonthlyCategoryData] = useState({});

  const [yearlyCategoryData, setYearlyCategoryData] = useState({});

  const [selectedYearlyCategory, setSelectedYearlyCategory] = useState([
    "individual",
  ]);

  const [isAddForm, setIsAddForm] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);

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

  const AddSubscriptionPlan = async () => {
    const payload = {
      name: planName,
      features: benefits,
    };

    try {
      setAddLoading(true);
      const response = await axios.post("/payment/subscription", payload);
      if (response.status === 200) {
        SuccessToast("Plan Added Successfully");
        setIsAddForm(false);
        console.log("response?.data", response?.data);
        setSubscriptionPlanId(response?.data?.data);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      console.error(
        "Error creating sub admin:",
        error?.response?.data?.message
      );
    } finally {
      setAddLoading(false);
    }
  };

  const toggle = (type) => {
    setSelectedMonthlyCategory(
      (prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type) // remove if already selected
          : [...prev, type] // add if not selected
    );
  };

  const yearlyToggle = (type) => {
    setSelectedYearlyCategory(
      (prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type) // remove if already selected
          : [...prev, type] // add if not selected
    );
  };

  const handlePriceChange = (type, value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setMonthlyCategoryData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          price: value,
        },
      }));
    }
  };

  const handleYearlyPriceChange = (type, value) => {
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setYearlyCategoryData((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          price: value,
        },
      }));
    }
  };

  const handleSubmit = async () => {
    const monthly = selectedMonthlyCategory
      .map((type) => {
        const data = monthlyCategoryData[type];
        const price = Number(data?.price);

        if (isNaN(price)) return null;
        return {
          ...(data?._id ? { _id: data._id } : {}),
          billingPeriod: "monthly",
          planType: type,
          price: price,
        };
      })
      .filter(Boolean);

    const yearly = selectedYearlyCategory
      .map((type) => {
        const data = yearlyCategoryData[type];
        const price = Number(data?.price);
        if (isNaN(price)) return null;

        return {
          ...(data?._id ? { _id: data._id } : {}),
          billingPeriod: "yearly",
          planType: type,
          price: price,
        };
      })
      .filter(Boolean);

    const payload = {
      subscriptionPlanId,
      monthly,
      yearly,
    };

    console.log("🚀 ~ handleSubmit ~ payload:", payload);
    // POST result to API
    try {
      setPriceLoading(true);
      const response = await axios.post(
        "payment/subscription/pricings",
        payload
      );
      if (response.status === 200) {
        SuccessToast("Subscription Updated");
        onClose();
        setUpdate((prev) => !prev);
      }
    } catch (err) {
      ErrorToast(err.response.data.message);
    } finally {
      setPriceLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[18px] shadow-lg p-6">
        {/* Modal Header */}
        <div className="flex border-b pb-4 justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121]">
            Add New Membership Plan
          </h2>
          {isAddForm && (
            <img
              src={CrossImag}
              onClick={onClose}
              alt="close"
              className="w-[22px] h-[22px] cursor-pointer"
            />
          )}
        </div>

        {isAddForm ? (
          <div className="space-y-4">
            <AuthInput
              onChange={(e) => setPlanName(e.target.value)}
              type={"text"}
              placeholder={" Plan Name"}
            />
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
          </div>
        ) : (
          <Fragment>
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

            {duration === "Monthly" ? (
              <div className="space-y-3">
                <div>
                  <h2 className="text-[14px] font-[600] my-2">
                    Plan Categories
                  </h2>
                  <div className="flex gap-8 items-center">
                    {["individual", "couples", "family"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => toggle(type)}
                      >
                        <img
                          src={
                            selectedMonthlyCategory.includes(type)
                              ? checkBoxOne
                              : checkBoxTwo
                          }
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

                <div className="space-y-3">
                  {selectedMonthlyCategory.map((type) => (
                    <AuthInput
                      key={type}
                      type="text"
                      value={monthlyCategoryData[type]?.price || ""}
                      onChange={(e) => handlePriceChange(type, e.target.value)}
                      placeholder={`${
                        type.charAt(0).toUpperCase() + type.slice(1)
                      } Price`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <h2 className="text-[14px] font-[600] my-2">
                    Plan Categories
                  </h2>
                  <div className="flex gap-8 items-center">
                    {["individual", "couples", "family"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => yearlyToggle(type)}
                      >
                        <img
                          src={
                            selectedYearlyCategory.includes(type)
                              ? checkBoxOne
                              : checkBoxTwo
                          }
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

                <div className="space-y-3">
                  {selectedYearlyCategory.map((type) => (
                    <AuthInput
                      key={type}
                      type="text"
                      value={yearlyCategoryData[type]?.price || ""}
                      onChange={(e) =>
                        handleYearlyPriceChange(type, e.target.value)
                      }
                      placeholder={`${
                        type.charAt(0).toUpperCase() + type.slice(1)
                      } Price`}
                    />
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        )}

        <div className="mt-6">
          {isAddForm ? (
            <Button
              text="Add Plan"
              loading={addLoading}
              onClick={AddSubscriptionPlan}
            />
          ) : (
            <Button text="Save" loading={priceLoading} onClick={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMemberPlanModal;
