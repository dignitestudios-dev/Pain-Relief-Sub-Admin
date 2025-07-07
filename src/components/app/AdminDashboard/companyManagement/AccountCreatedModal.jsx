import React from "react";
import { CrossImag, TickSign } from "../../../../assets/export";
import Button from "../../../global/Button";

const AccountCreatedModal = ({ onClose, handleClick }) => {
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[20px] shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-end items-center mb-4">
          <img
            src={CrossImag}
            alt="close"
            onClick={onClose}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="my-4">
          <div className="flex justify-center my-3 items-center">
            <img src={TickSign} className="w-[117px] h-[117px] " alt="" />
          </div>
          <h2 className="text-center text-[24px] font-[600] ">
            Account Created
          </h2>
          <p className="text-center text-[16px] font-[400] ">
            Login credentials have been successfully generated. The Network can
            now access their account and manage their profile.
          </p>
        </div>
        <div>
          <Button text={"Send"} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default AccountCreatedModal;
