import React from "react";
import AuthInput from "../../../global/AuthInput";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";

const CreateModal = ({ onCLose }) => {
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-1">
      <div
        className={`bg-white w-[471px]  overflow-y-auto overflow-x-hidden  rounded-[18px] shadow-md p-6 
      `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121] ">
            Create Account
          </h2>
          <div onClick={onCLose}>
            <img
              className="w-[22px] h-[22px] cursor-pointer "
              src={CrossImag}
              alt=""
            />
          </div>
        </div>
        <form action="">
          <div className="space-y-4">
            <AuthInput
              placeholder="Enter email here"
              type="email"
              name="email"
              maxLength={50}
            />
            <AuthInput
              placeholder="Password"
              type="password"
              name="password"
              maxLength={50}
            />
            <AuthInput
              placeholder="Confirm Password"
              type="password"
              name="password"
              maxLength={50}
            />
            <Button text={"Create"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
