import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalenderIcon } from "../../../assets/export";

const Filter = ({
  startDate,
  setStartDate,
  endDate,
  setEndData,
  referralType,
  setReferralType,
  onClear,
  onApply,
  max,
  min,
}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (
    <div className="bg-white p-5 pt-6 rounded-[16px] w-[371px] h-[322px]">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-bold">Filter</h2>
        <button onClick={onClear}>
          <span className="text-2xl border rounded-md border-[#989898] border-rounded p-0.5 px-2">
            {" "}
            &times;
          </span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Start Date */}
        <div className="relative">
          <label className="text-sm font-medium block mb-1">Start Date</label>
          <div
            className="border rounded-lg px-3 py-3 flex items-center justify-between text-sm cursor-pointer"
            onClick={() => {
              setShowStartPicker(!showStartPicker);
              setShowEndPicker(false);
            }}
          >
            <span className={startDate ? "text-black" : "text-gray-400"}>
              {startDate
                ? new Date(startDate).toLocaleDateString()
                : "Select Date"}
            </span>
            <img src={CalenderIcon} className="w-4 h-4" alt="calendar" />
          </div>
          {showStartPicker && (
            <div className="absolute z-50 mt-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setShowStartPicker(false);
                }}
                inline
                maxDate={max}
                minDate={min}
              />
            </div>
          )}
        </div>

        {/* End Date */}
        <div className="relative">
          <label className="text-sm font-medium block mb-1">End Date</label>
          <div
            className="border rounded-lg px-3 py-3 flex items-center justify-between text-sm cursor-pointer"
            onClick={() => {
              setShowEndPicker(!showEndPicker);
              setShowStartPicker(false);
            }}
          >
            <span className={endDate ? "text-black" : "text-gray-400"}>
              {endDate ? new Date(endDate).toLocaleDateString() : "Select Date"}
            </span>
            <img src={CalenderIcon} className="w-4 h-4" alt="calendar" />
          </div>
          {showEndPicker && (
            <div className="absolute z-50 mt-2">
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndData(date);
                  setShowEndPicker(false);
                }}
                inline
                maxDate={max}
                minDate={min}
              />
            </div>
          )}
        </div>
      </div>

      {/* Referral Type Dropdown */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-1">Referral Type</label>
        <select
          className="w-full border rounded-lg px-3 py-3 text-sm"
          value={referralType}
          onChange={(e) => setReferralType(e.target.value)}
        >
          <option value="user">User Referral</option>
          <option value="provider">Chiropractor Referral</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onClear}
          className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 font-medium"
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="flex-1 bg-gradient-to-r from-[#36C2CF] to-[#2BBECF] text-white rounded-lg py-2 font-medium"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
