import React from "react";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";

const InvoiceModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[20px] shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-[600] text-[#212121]">
            Invoice Detail
          </h2>
          <img
            src={CrossImag}
            alt="close"
            onClick={onClose}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        <div className="border-t border-[#E5E5E5] my-2"></div>

        {/* Detail Rows */}
        <div className="space-y-4  text-[14px] text-[#212121]">
          <div className="flex border-b justify-between">
            <span>Invoice ID:</span>
            <span className="text-[#212121] font-medium">#A4fc5445</span>
          </div>
          <div className="flex border-b justify-between">
            <span>Status:</span>
            <span className="text-[#212121] font-medium">Pending</span>
          </div>
          <div className="flex border-b justify-between">
            <span>Subscription Plan</span>
            <span className="text-[#212121] font-medium">Basic</span>
          </div>
          <div className="flex border-b justify-between">
            <span>Plan Category</span>
            <span className="text-[#212121] font-medium">Individual</span>
          </div>
          <div className="flex border-b justify-between">
            <span>Billing Date</span>
            <span className="text-[#212121] font-medium">May 1, 2025</span>
          </div>
          <div className="flex border-b justify-between">
            <span>Next Billing Date</span>
            <span className="text-[#212121] font-medium">
              February 1, 2025{" "}
              <span className="text-[#29ABE2] text-[12px]">(for monthly)</span>
            </span>
          </div>
          <div className="flex border-b justify-between">
            <span>Total Employees</span>
            <span className="text-[#212121] font-medium">05</span>
          </div>
          <div className="flex border-b justify-between">
            <span>Cost Per Employee</span>
            <span className="text-[#212121] font-medium">$30</span>
          </div>
          <div className="flex  justify-between font-[600] pt-2">
            <span>Total Amount</span>
            <span className="text-[#29ABE2] font-[600]">$150</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6 gap-4">
          <button className="w-[205px] border border-[#63CFAC] bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent rounded-lg py-2 font-medium">
            Mark As Paid
          </button>
          <div className="w-[205px]">
            <Button text={"Downloads Invoice"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
