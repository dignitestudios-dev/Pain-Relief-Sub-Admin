/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons

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
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="flex flex-col gap-1 justify-start items-start space-y-2 ">
      <div
        className={`relative w-full h-[48px] border-[1px]   
          ${
            error && touched
              ? "border-red-600 focus-within:border-[1px] focus-within:border-red-600"
              : "border-[#D9D9D9] focus-within:border-[1px] focus-within:border-[#55C9FA]"
          } flex justify-between items-center rounded-[8px] md:pl-3 pl-1.5`}
      >
        <div className="w-full">
          <input
            placeholder={placeholder}
            type={isPasswordField && isPassVisible ? "text" : type}
            value={value}
            name={name}
            maxLength={maxLength}
            onChange={onChange}
            onBlur={onBlur}
              required={true}

            className="h-8 w-[85%] outline-none text-[16px] bg-transparent text-[#212121]
            pl-2 caret-[#565656] placeholder:text-[#565656] placeholder:text-[16px]"
          />
        </div>

        {/* Toggle Icon for password only */}
        {isPasswordField && (
          <span
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="absolute text-lg right-3 cursor-pointer text-[#D9D9D9]"
          >
            {isPassVisible ?<FaEye />: <FaEyeSlash />  }
          </span>
        )}
      </div>

      {error && touched && <p className="text-red-600 text-[12px]">{error}</p>}
    </div>
  );
};

export default AuthInput;
