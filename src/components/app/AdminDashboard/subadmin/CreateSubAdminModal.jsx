/* eslint-disable react/prop-types */

import AuthInput from "../../../global/AuthInput";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";
import PhoneInput from "../../../global/PhoneInput";
import { phoneFormatter } from "../../../../lib/helpers";

const CreateSubAdminModal = ({
  onCLose,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  btnLoading,
}) => {
  console.log("🚀 ~ errors:", errors);
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-1">
      <div
        className={`bg-white w-[471px]  overflow-y-auto overflow-x-hidden  rounded-[18px] shadow-md p-6 
      `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121] ">
            Create Sub Admin Account
          </h2>
          <div onClick={onCLose}>
            <img
              className="w-[22px] h-[22px] cursor-pointer "
              src={CrossImag}
              alt=""
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AuthInput
              placeholder="First Name"
              type="text"
              name="firstName"
              maxLength={50}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && errors.firstName}
            />
            {/* <AuthInput
              placeholder="Last Name"
              type="text"
              name="lastName"
              maxLength={50}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
            /> */}
            <AuthInput
              placeholder="Enter email here"
              type="email"
              name="email"
              maxLength={50}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
            <PhoneInput
              value={phoneFormatter(values.phone)}
              id={"phone"}
              name={"phone"}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              autoComplete="off"
            />

            <AuthInput
              placeholder="Password"
              type="password"
              name="password"
              maxLength={50}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />
            <AuthInput
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              maxLength={50}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <Button loading={btnLoading} text="Create Now" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubAdminModal;
