/* eslint-disable react/prop-types */

import { CrossImag, TickSign } from "../../../../assets/export";
import Button from "../../../global/Button";

const ServiceRequestModal = ({
  onClose,
  handleClick,
  title,
  content,
  btnText,
  delLoading,
}) => {
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
          <h2 className="text-center text-[24px] font-[600] ">{title}</h2>
          <p className="text-center text-[16px] font-[400] ">{content}</p>
        </div>
        <div className="flex justify-between space-x-2">
          <button
            onClick={onClose}
            className="border rounded-[8px] font-[500]  border-gray-600 text-gray-700  w-full h-[49px] "
          >
            Cancel
          </button>
          <div className="w-full">
            <Button loading={delLoading} text={btnText} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestModal;
