/* eslint-disable react/prop-types */
import AuthInput from "../../../global/AuthInput";
import { useFormik } from "formik";
import { BankDetailSchema } from "../../../../schema/editForm/editFormSchema";
import { CrossImag } from "../../../../assets/export";
import Button from "../../../global/Button";

const BankDetailModal = ({ onClose }) => {
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        accountNo: "",
        accountId: "",
        name: "",
      },
      validationSchema: BankDetailSchema,
      onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("subAdminId", "");
        formData.append("firstName", values.firstName);
        formData.append("phone", values.phone);
      },
    });

  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-1">
      <div className="bg-white w-[471px] max-h-[95vh] overflow-y-auto rounded-[18px] shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-[600] text-[#212121]">
            Add Bank Detail
          </h2>
          <div onClick={onClose}>
            <img
              className="w-[22px] h-[22px] cursor-pointer"
              src={CrossImag}
              alt="close"
            />
          </div>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            placeholder="Account Holder Name"
            type="text"
            name="name"
            maxLength={50}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
          <AuthInput
            placeholder="Account Number"
            type="text"
            name="accountNo"
            maxLength={50}
            value={values.accountNo}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.accountNo && errors.accountNo}
          />
          <AuthInput
            placeholder="Account ID"
            type="text"
            name="accountId"
            maxLength={50}
            value={values.accountId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.accountId && errors.accountId}
          />

          <div className="pt-2">
            <Button text="Add Now" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetailModal;
