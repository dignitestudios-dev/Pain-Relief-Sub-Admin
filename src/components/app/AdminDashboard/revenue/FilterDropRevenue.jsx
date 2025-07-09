/* eslint-disable react/prop-types */
import { useState } from "react";
import { checkBoxOne, checkBoxTwo, CrossImag } from "../../../../assets/export";
import Calender from "../../../global/DatePicker";
import { IoChevronDown } from "react-icons/io5";
import Button from "../../../global/Button";

const FilterDropRevenue = ({
  onClose,
  handleFilter,
  filters,
  setFilters,
  selected,
  toggle,
  selectedTypes,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (option) => {
    setFilters((prev) => ({ ...prev, planType: option }));
    setShowDropdown(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end bg-black/30">
      <div className="bg-white absolute top-52 right-12 rounded-[13px] w-[371px] p-3 shadow-md">
        <div
          className="flex justify-between items-center border-b pb-2"
          onClick={onClose}
        >
          <h2 className="text-[18px]  font-[600] ">Filter</h2>
          <img
            src={CrossImag}
            className="w-[22px] h-[22px] cursor-pointer"
            alt="Close"
          />
        </div>
        <div>
          <h2 className="text-[14px] font-[500] my-2 ">Plan Categories</h2>
          <div className="flex gap-8 items-center">
            {/* Individual */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggle("individual")}
            >
              <img
                src={selected.individual ? checkBoxOne : checkBoxTwo}
                alt="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Individual</span>
            </div>

            {/* Couple */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggle("couple")}
            >
              <img
                src={selected.couple ? checkBoxOne : checkBoxTwo}
                alt="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Couple</span>
            </div>

            {/* Family */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggle("family")}
            >
              <img
                src={selected.family ? checkBoxOne : checkBoxTwo}
                alt="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Family</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 my-4">
          <Calender
            endDate={true}
            startDate={
              filters.startDate
                ? filters.startDate.toISOString().split("T")[0]
                : ""
            }
            setStartDate={(date) =>
              setFilters((prev) => ({ ...prev, startDate: new Date(date) }))
            }
            text={"DD/MM/YY"}
            isStyle={true}
            label={"Start Date"}
          />
          <Calender
            endDate={true}
            startDate={
              filters.endDate ? filters.endDate.toISOString().split("T")[0] : ""
            }
            setStartDate={(date) =>
              setFilters((prev) => ({ ...prev, endDate: new Date(date) }))
            }
            text={"DD/MM/YY"}
            isStyle={true}
            label={"End Date"}
          />
        </div>

        <h2 className="text-[14px] font-[500] mb-2">Subscription Type</h2>
        <div className="relative mb-4">
          <div
            className="border px-4 py-3 rounded-[8px] text-sm cursor-pointer flex justify-between items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{filters?.planType}</span>
            <IoChevronDown className="text-gray-600" />
          </div>

          {showDropdown && (
            <div className="absolute h-[90px] top-full left-0 mt-1 w-full bg-white border rounded-md shadow z-50">
              {["Monthly", "Yearly"].map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            className="bg-[#DCDCDC] w-[165px] rounded-[8px] h-[49px] font-medium"
            onClick={() => {
              handleFilter(null, null, "User Referral", "");
              setFilters({
                startDate: null,
                endDate: null,
                planType: "Select Type",
                selectedTypes,
              });
            }}
          >
            Clear
          </button>

          <div className="w-[165px]">
            <Button
              text="Apply"
              onClick={() =>
                handleFilter(
                  filters.startDate,
                  filters.endDate,
                  filters.planType,
                  selectedTypes
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropRevenue;
