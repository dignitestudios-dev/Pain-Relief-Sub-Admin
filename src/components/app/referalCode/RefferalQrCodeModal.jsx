import React, { useEffect, useState } from "react";
import BrochureSection from "./BrochureSection";
import QrCode from "./QrCode";
import { useUsers } from "../../../hooks/api/Get";

const RefferalQrCodeModal = ({ onClick, referralCode }) => {
  const [tabActive, setTabActive] = useState("Brochure");
  const tabs = ["Brochure", "QR Code"];
 
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-[#fefefe] rounded-[26px] shadow-md p-8 w-[470px] h-[700px] overflow-auto ">
        <div>
          <div
            className="flex justify-end items-center pb-4 "
            onClick={onClick}
          >
            <span className="cursor-pointer border-[1px]  rounded-sm p-[2px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 font-light text-gray-400 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-[32px] font-[600] text-center ">
            Referral QR Code
          </h2>
        </div>
        <div className="bg-white mb-2  shadow-md rounded-[8px] p-3 grid grid-cols-2  gap-4 flex-wrap">
          {tabs.map((item, index) => (
            <button
              key={index}
              onClick={() => setTabActive(item)}
              className={`rounded-[8px] h-[45px]  px-8 xl:text-[18px] lg:text-[16px] font-[500] ${
                tabActive === item
                  ? "bg-gradient-to-l to-[#63CFAC]   from-[#29ABE2] text-white"
                  : "bg-white text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {tabActive === "Brochure" && (
          <BrochureSection referralCode={referralCode} />
        )}
        {tabActive === "QR Code" && <QrCode referralCode={referralCode} />}
      </div>
    </div>
  );
};

export default RefferalQrCodeModal;
