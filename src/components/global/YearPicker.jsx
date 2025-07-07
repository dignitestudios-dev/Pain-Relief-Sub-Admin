/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const YearPicker = ({
  selectedYear,
  setSelectedYear = () => {},
  label = "Select Year",
  maxYear,
  minYear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleYearChange = (date) => {
    setSelectedYear(date);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="text-[12px] text-[#121516] font-medium">{label}</label>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative w-full h-[44px] p-2 rounded-[8px] border border-[#D9D9D9] bg-white text-[12px] font-medium 
        cursor-pointer flex items-center justify-between ${
          selectedYear ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {selectedYear ? selectedYear.getFullYear() : "Select year"}
        <span className="text-[#012C57]">&#9662;</span>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full">
          <DatePicker
            selected={selectedYear}
            onChange={handleYearChange}
            showYearPicker
            dateFormat="yyyy"
            maxDate={maxYear}
            minDate={minYear}
            inline
            calendarClassName="shadow-lg border rounded-md"
            onClickOutside={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default YearPicker;
