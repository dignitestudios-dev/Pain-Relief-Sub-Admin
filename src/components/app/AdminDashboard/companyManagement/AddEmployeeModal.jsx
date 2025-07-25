/* eslint-disable react/prop-types */
// import { useRef, useState } from "react";
import { CrossImag } from "../../../../assets/export";
import AuthInput from "../../../global/AuthInput";
// import { IoChevronDown } from "react-icons/io5";
import Button from "../../../global/Button";

const AddEmployeeModal = ({
  onClose,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  // setFieldValue,
  handleSubmit,
  loading,
}) => {
  // const [imagePreview, setImagePreview] = useState(null);
  // const [genderDropdown, setGenderDropdown] = useState(false);
  // const [selectedGender, setSelectedGender] = useState("Gender");
  // const fileInputRef = useRef(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImagePreview(URL.createObjectURL(file));
  //     setFieldValue("profilePicture", file);
  //   }
  // };

  return (
    <div className="fixed inset-0 bg-[#0A150F80] bg-opacity-10 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-[20px] shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-[600] text-[#212121]">
            Add New Employee
          </h2>
          <img
            src={CrossImag}
            alt="close"
            onClick={onClose}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="border-t border-[#E5E5E5] my-2"></div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-1 gap-4"
        >
          {/* <div className="flex items-center gap-4 mb-6">
            <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-[#F2F2F2]">
              <img
                src={imagePreview || ProfileAdd}
                alt="upload"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[14px] font-medium underline bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
            >
              Upload Picture
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div> */}
          {/* <div></div>
          <AuthInput
            label={"Full Name (required)"}
            placeholder="Enter employee name"
            type="text"
            name="fullname"
            value={values.fullname}
            maxLength={50}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullname}
            touched={touched.fullname}
          /> */}

          {/* <div className="w-full">
            <label className="text-[15px] text-[#212121] font-[400]">
              Gender (required)
            </label>
            <div
              className="relative mt-3 border border-[#D9D9D9] rounded-[8px] px-3 py-3 cursor-pointer text-sm text-[#565656] flex justify-between items-center"
              onClick={() => setGenderDropdown((prev) => !prev)}
            >
              <span>{selectedGender}</span>
              <IoChevronDown className="text-gray-500" />
              {genderDropdown && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow z-50">
                  {["Male", "Female", "Other"].map((g) => (
                    <div
                      key={g}
                      onClick={() => {
                        setSelectedGender(g);
                        setGenderDropdown(false);
                      }}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {g}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}
          <div className="">
            <AuthInput
              label={"Email Address (required)"}
              placeholder="Enter your email"
              type="email"
              name="email"
              value={values.email}
              maxLength={50}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />
            {/* <div className="mt-3">
              <AuthInput
                label={"Phone Number"}
                placeholder="Enter your phone number"
                type="text"
                name="phone"
                value={values.phone}
                maxLength={50}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
              />
            </div> */}
          </div>

          {/* <div>
            <label className="text-sm text-[#212121] font-medium block mb-1">
              Description
            </label>
            <textarea
              placeholder="Description"
              className="border border-[#D9D9D9] focus:outline-none focus:ring-2 placeholder:text-[#565656]
                  focus:ring-blue-300 w-full rounded-[12px] p-4 text-[16px] h-[150px]"
              id="descriptions"
              value={values.descriptions}
              rows={6}
              name="descriptions"
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={250}
            ></textarea>
            {touched.descriptions && errors.descriptions && (
              <p className="text-red-600 text-xs mt-1">{errors.descriptions}</p>
            )}
          </div> */}
          <div className="flex justify-end">
            <div className="w-[234px]">
              <Button loading={loading} type="submit" text={"Add Employee"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
