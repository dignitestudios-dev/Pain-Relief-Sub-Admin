/* eslint-disable react/prop-types */

import { useState } from "react";
import { CrossImag, TickSign } from "../../../../assets/export";
import Button from "../../../global/Button";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import axios from "../../../../axios";
import { useNavigate } from "react-router";

const DeleteEmployeeModal = ({ id, onClose }) => {
  const navigate = useNavigate();

  const [delLoading, setDelLoading] = useState(false);
  const deleteEmployee = async () => {
    try {
      setDelLoading(true);
      const response = await axios.post("/admin/delete-employee-by-company", {
        employeeId: id,
      });
      if (response.status === 200) {
        SuccessToast("Delete Successfully");
        navigate(`/app/company-detail/${id}`);
        onClose();
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setDelLoading(false);
    }
  };

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
            Delete This Employee
          </h2>
          <p className="text-center text-[16px] font-[400] ">
            Are you sure you want delete this company. Please confirm to
            proceed.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="w-[210px] rounded-[8px] h-[49px] bg-[#5656561C] "
          >
            No
          </button>
          <div className="w-[210px]">
            <Button
              text={"Yes"}
              onClick={deleteEmployee}
              loading={delLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
