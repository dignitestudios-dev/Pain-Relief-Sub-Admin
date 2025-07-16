import React from "react";

const PhoneInput = ({
  value,
  onChange,
  isAuth,
  onBlur,
  id,
  name,
  isDisabled = false,
  autoComplete,
  error,
  touched,
  label,
  isLight = false,
  isLightTwo = false,
}) => {
  // const handlePhoneChange = (e) => {
  //   const formattedValue = e.target.value.replace(/[^0-9]/g, "");
  //   onChange({
  //     target: {
  //       name: e.target.name,
  //       value: formattedValue,
  //     },
  //   });
  // };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <label htmlFor="" className="text-[12px] text-[#121516] font-medium">
        {label}
      </label>
      <div
        className={`flex  items-center p-0 w-full pl-2 outline-none font-[500] focus-within:border-[#0E73D0] 
      border border-[#D9D9D9] ${isLight ? "rounded-[8px]" : "rounded-[15px]"} ${
          isLightTwo ? "border-gray-300" : " "
        }   placeholder:text-[16px] placeholder:font-[400]
      placeholder:text-[#181818] text-[#181818] ${
        (isAuth ? "bg-transparent" : "bg-white",
        isDisabled
          ? "bg-gray-100"
          : "bg-white" || isLight
          ? "bg-transparent"
          : "bg-white")
      } 
      h-full px-3 text-sm font-medium`}
      >
        {/* <span className="text-xl pr-2">
          <img
            src="https://flagcdn.com/w320/us.png"
            alt="US flag"
            className="w-6 h-4 mr-2"
          />
        </span> */}

        <span className="text-[16px] font-[400] w-[40px] text-center">+1</span>

        <div className="border-l h-6 mx-2"></div>

        <input
          type="text"
          className={`outline-none w-full placeholder:text-[16px] placeholder:font-[400] placeholder:text-[#181818] 
          text-[#181818] ${isLight ? "h-[42px]" : "h-[49px]"} ${
            isDisabled
              ? "bg-gray-100 "
              : "bg-white" || isLight
              ? "bg-transparent  "
              : "bg-white"
          }`}
          placeholder="123-456-7890"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyPress={handleKeyPress}
          id={id}
          maxLength={14}
          name={name}
          disabled={isDisabled}
          autoComplete={autoComplete}
        />
      </div>
      {error && touched && (
        <p className="text-red-600 text-[12px] mt-3">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
