// components/app/Logout.js
import React from "react";

const Logout = ({ onConfirm, onCancel }) => {
  return (
    <div className="bg-white w-[413px] h-[339px] rounded-[20px] flex flex-col items-center justify-center shadow-lg  relative">
      <div className="bg-gradient-to-r from-[#36C2CF] to-[#2BBECF] w-[116px] h-[116px] rounded-full flex items-center justify-center mb-6">
        <span className="text-white text-[96.6669921875px] font-bold leading-none">!</span>
      </div>
      <h2 className="text-[20px] font-bold text-[#121516] mb-2">Logout</h2>
      <p className="text-sm text-[#565D6D] mb-6">Are you sure you want to logout?</p>
      <div className="flex gap-4 w-full px-6">
        <button
          onClick={onCancel}
          className="flex-1 bg-[#F2F2F2] text-black py-2 rounded-[10px] text-[16px] font-medium"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-gradient-to-r from-[#36C2CF] to-[#2BBECF] text-white py-2 rounded-[10px] text-[16px] font-medium"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Logout;
