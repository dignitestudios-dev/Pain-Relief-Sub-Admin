import React from "react";
import Button from "../global/Button";
import { Tickblue } from "../../assets/export";

const PasswordUpdatedModal = ({ onClick }) => {
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-[26px] shadow-md p-8 w-[470px] ">
        <div className="flex flex-col justify-center items-center lg:h-auto md:h-screen ">
          <div className="pb-4 text-center w-[330px] flex flex-col justify-center items-center">
            <div className="mb-8">
              <img src={Tickblue} />
            </div>
            <p className="text-[24px] font-semibold capitalize">
              Password Updated!
            </p>
            <p className="text-[16px] text-[#565656]">
              Your password has been reset successfully
            </p>
          </div>

          <div className="xl:w-[350px] lg:w-[350px] md:w-[550px] w-full mt-6">
            <Button text="Continue" onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdatedModal;
