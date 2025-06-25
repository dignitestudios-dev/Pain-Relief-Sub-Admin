import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePasswordModal = ({ isOpen, onClose, onSubmit, formData, setFormData, loading }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const renderInput = (type, placeholder, valueKey, showState, setShowState) => (
    <div className="relative">
      <input
        type={showState ? "text" : "password"}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md pr-10"
        value={formData[valueKey]}
        onChange={(e) => setFormData({ ...formData, [valueKey]: e.target.value })}
      />
      <button
        type="button"
        onClick={() => setShowState((prev) => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        {showState ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black border border-black px-2 rounded hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-3 text-left">Change Password</h2>
        <span className="border-b flex mb-3"></span>

        <div className="space-y-4">
          {renderInput("password", "Current Password", "currentPassword", showCurrent, setShowCurrent)}
          {renderInput("password", "New Password", "newPassword", showNew, setShowNew)}
          {renderInput("password", "Confirm New Password", "confirmPassword", showConfirm, setShowConfirm)}
        </div>

        <button
  onClick={onSubmit}
  disabled={loading}
  className={`w-full mt-6 py-2 rounded-md text-white ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-l from-[#29ABE2] to-[#63CFAC]"
  }`}
>
  {loading ? "Saving..." : "Save"}
</button>

      </div>
    </div>
  );
};

export default ChangePasswordModal;
