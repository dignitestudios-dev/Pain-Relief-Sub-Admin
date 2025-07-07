import React from "react";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";

const MembershipPlanDetailsModal = ({ onClose,handleEdit }) => {
  const plan = {
    name: "Basic Plan",
    description:
      "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    type: "Monthly",
    price: "$9.99",
    benefits: [
      "Access to professional pain management care",
      "Chiropractors",
      "Imaging service",
      "Acupuncture services",
      "Massage Therapy services",
      "Flat fee for chiropractic manipulation/adjustment of $50 per visit",
      "Unlimited visits",
      "No prior authorizations",
      "Secure digital platform",
      "Discount of 30% on all additional services offered",
      "Includes all family members",
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[18px] shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-semibold text-[#212121]">
            Membership Plan Details
          </h2>
          <img
            src={CrossImag}
            alt="close"
            onClick={onClose}
            className="w-[22px] h-[22px] cursor-pointer"
          />
        </div>

        {/* Plan Name & Description */}
        <div className="border-b pb-3">
          <h3 className="font-semibold text-[16px] text-[#000]">{plan.name}</h3>
          <p className="text-sm text-gray-500">{plan.description}</p>
        </div>

        {/* Membership Type & Price */}
        <div className="flex justify-between text-sm py-4 border-b">
          <div>
            <p className="text-gray-500">Membership Type</p>
            <p className="text-[#000] font-medium">{plan.type}</p>
          </div>
          <div>
            <p className="text-gray-500">Membership Price</p>
            <p className="text-[#000] font-bold">{plan.price}/mo</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-4">
          <h3 className="text-[16px] font-semibold text-[#000] mb-2">
            Benefits
          </h3>
          <ul className="list-none space-y-1 text-sm text-[#000]">
            {plan.benefits.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="mt-6">
          <Button text="Edit Member Ship" onClick={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default MembershipPlanDetailsModal;
