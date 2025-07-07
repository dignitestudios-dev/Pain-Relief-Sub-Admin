/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { Eye } from "../../assets/export";

const AuthInput = ({
  placeholder,
  type,
  value,
  name,
  maxLength,
  onChange,
  onBlur,
  error,
  touched,
  label,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1 justify-start items-start space-y-2 ">
      {label && (
        <span htmlFor={name} className="text-[15px] text-[#212121] font-[400] ">
          {label}
        </span>
      )}
      <div
        className={`relative w-full h-[48px] border-[1px]   
          ${
            error && touched
              ? "border-red-600 focus-within:border-[1px] focus-within:border-red-600"
              : "border-[#D9D9D9] focus-within:border-[1px]  focus-within:border-[#55C9FA]"
          } flex justify-between items-center rounded-[8px] md:pl-3 pl-1.5`}
      >
        <div className="w-full ">
          <input
            placeholder={placeholder}
            type={isPassVisible ? "text" : type}
            value={value}
            name={name}
            maxLength={maxLength}
            onChange={onChange}
            onBlur={onBlur}
            className=" h-8 w-[85%] outline-none text-[16px] bg-transparent text-[#212121]
            pl-2 caret-[#565656] placeholder:text-[#565656] placeholder:text-[16px]"
          />
        </div>
        <span
          type="button"
          onClick={() => setIsPassVisible((prev) => !prev)}
          className="absolute text-lg right-2 cursor-pointer"
        >
          {type == "password" &&
            (!isPassVisible ? <BsEyeSlash /> : <img src={Eye} />)}
        </span>
      </div>
      {error && touched && <p className="text-red-600 text-[12px]">{error}</p>}
    </div>
  );
};

export default AuthInput;
