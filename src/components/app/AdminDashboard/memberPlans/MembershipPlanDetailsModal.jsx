/* eslint-disable react/prop-types */

import { useState } from "react";
import { checkBoxOne, checkBoxTwo, CrossImag } from "../../../../assets/export";
import { PiPencilLine } from "react-icons/pi";

const MembershipPlanDetailsModal = ({
  onClose,
  handleEdit,
  memberPlanDetails,
}) => {
  const [duration, setDuration] = useState("Monthly");

  const [selected, setSelected] = useState({
    individual: true,
    couple: false,
    family: false,
  });

  const toggle = (type) => {
    setSelected((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const yearlyPlan = memberPlanDetails?.yearly.reduce((acc, item) => {
    const key = item.planType === "couples" ? "couple" : item.planType;
    acc[key] = item;
    return acc;
  }, {});

  const monthlyPlan = memberPlanDetails?.monthly.reduce((acc, item) => {
    const key = item.planType === "couples" ? "couple" : item.planType;
    acc[key] = item;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[18px] shadow-lg p-6">
        {/* Modal Header */}
        <div className="flex border-b pb-4 justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121]">
            Membership Plan Details
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

        <div className="space-y-3 px-3 py-2 w-full rounded-md bg-[#E0E0E0] text-[#000000] font-medium">
          {memberPlanDetails?.name}
        </div>

        {memberPlanDetails?.monthly?.length > 0 ? (
          <>
            {duration === "Monthly" && (
              <div className="space-y-3 mb-6">
                <div>
                  <h2 className="text-[14px] font-[600] my-2">
                    Plan Categories
                  </h2>
                  <div className="flex gap-8 items-center">
                    {["individual", "couple", "family"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => toggle(type)}
                      >
                        <img
                          src={selected[type] ? checkBoxOne : checkBoxTwo}
                          alt="checkbox"
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium capitalize">
                          {type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {Object.entries(selected).map(([type, isChecked]) => {
                    const plan = monthlyPlan[type];
                    if (!isChecked || !plan) return null;

                    return (
                      <div
                        key={type}
                        className="rounded-md bg-[#E0E0E0] px-4 py-3 space-y-1"
                      >
                        <h2 className="text-sm capitalize font-medium">
                          {type} Price ({plan.billingPeriod})
                        </h2>
                        <div className="text-[#000000] font-semibold">
                          ${plan.price}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[14px] font-[500] my-2">
                  <h2 className="text-[14px] font-[600] "> Benefits </h2>
                  <div className="max-h-[140px] space-y-2 overflow-auto">
                    {memberPlanDetails?.features?.map((item, idx) => (
                      <ul key={idx} className="  ">
                        <li className="text-[14px] text-[#000000] font-medium">
                          {item}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {duration === "Monthly" && (
              <div className="h-12 mt-6">No detail available</div>
            )}
          </>
        )}

        {memberPlanDetails?.yearly?.length > 0 ? (
          <>
            {duration === "Yearly" && (
              <div className="space-y-3 mb-6">
                <div>
                  <h2 className="text-[14px] font-[600] my-2">
                    Plan Categories
                  </h2>
                  <div className="flex gap-8 items-center">
                    {["individual", "couple", "family"].map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => toggle(type)}
                      >
                        <img
                          src={selected[type] ? checkBoxOne : checkBoxTwo}
                          alt="checkbox"
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium capitalize">
                          {type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {Object.entries(selected).map(([type, isChecked]) => {
                    const plan = yearlyPlan[type];
                    if (!isChecked || !plan) return null;

                    return (
                      <div
                        key={type}
                        className="rounded-md bg-[#E0E0E0] px-4 py-3 space-y-1"
                      >
                        <h2 className="text-sm capitalize font-medium">
                          {type} Price
                          {/* ({plan.billingPeriod}) */}
                        </h2>
                        <div className="text-[#000000] font-semibold">
                          ${plan.price}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[14px] font-[500] ">
                  <h2 className="text-[14px] font-[600] "> Benefits </h2>
                  <div className="max-h-[140px]  space-y-2  overflow-auto">
                    {memberPlanDetails?.features?.map((item, idx) => (
                      <ul key={idx} className="  ">
                        <li className="text-[14px] text-[#000000] font-medium">
                          {item}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {duration === "Yearly" && (
              <div className="h-12 mt-6">No detail available</div>
            )}
          </>
        )}

        <button
          onClick={handleEdit}
          className="w-full flex items-center justify-center gap-2 h-[44px] px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#29ABE2] to-[#63CFAC] hover:opacity-90 active:scale-95 transition-all duration-200 shadow-sm"
        >
          <PiPencilLine size={18} className="stroke-[#FF6200]" />
          Edit Plan
        </button>
      </div>
    </div>
  );
};

export default MembershipPlanDetailsModal;
