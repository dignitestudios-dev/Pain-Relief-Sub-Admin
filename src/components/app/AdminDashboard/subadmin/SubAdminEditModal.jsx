/* eslint-disable react/prop-types */

import AuthInput from "../../../global/AuthInput";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";

const SubAdminEditModal = ({
  onCLose,
  handleSubmit,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  btnLoading,
}) => {
  console.log("🚀 ~ errors:", errors);
  console.log("🚀 ~ touched:", touched);
  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-1">
      <div
        className={`bg-white w-[471px]  overflow-y-auto overflow-x-hidden  rounded-[18px] shadow-md p-6 
      `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121] ">
            Edit Sub Admin Account{" "}
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
            <input
              type="email"
              value={values.email}
              readOnly
              className="w-full px-4 py-2 bg-gray-100 border rounded-md text-gray-500"
            />
            {/* <AuthInput
              placeholder="Enter email here"
              type="email"
              name="email"
              maxLength={50}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            /> */}
            <AuthInput
              placeholder="Phone Number"
              type="text"
              name="phone"
              maxLength={50}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && errors.phone}
            />
            <Button loading={btnLoading} text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubAdminEditModal;
