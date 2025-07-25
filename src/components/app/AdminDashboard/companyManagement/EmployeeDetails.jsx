import Button from "../../../global/Button";
import { FiTrash2 } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import EmployeeBasicInfo from "./EmployeeBasicInfo";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import { useState } from "react";
import EditEmployeeModal from "./EditEmployeeModal";
import { useLocation } from "react-router";
import { addEmployeeSchema } from "../../../../schema/editForm/editFormSchema";
import { useFormik } from "formik";
import axios from "../../../../axios";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import { ProfileAdd } from "../../../../assets/export";

const EmployeeDetails = () => {
  const location = useLocation();
  const employeeData = location.state?.employeeData;
  const company = location.state?.company;

  const [deleteModal, setDeleteModal] = useState(false);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullName: `${employeeData.firstName || ""} ${
        employeeData.lastName || ""
      }`,
      email: employeeData.email || "",
      phone: employeeData.phone || "",
      profilePicture: employeeData.profilePicture || "",
      descriptions: employeeData.descriptions || "",
    },
    enableReinitialize: true,
    validationSchema: addEmployeeSchema,
    onSubmit: async (values) => {
      const [firstName, ...rest] = values.fullName.trim().split(" ");
      const lastName = rest.join(" ");

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("descriptions", values.descriptions || "");
      // formData.append("gender", selectedGender);
      if (values.profilePicture && typeof values.profilePicture !== "string") {
        formData.append("profilePicture", values.profilePicture);
      }

      try {
        setLoading(true);
        const res = await axios.put(
          `/admin/update-employee/${employeeData._id}`,
          formData
        );
        if (res.status === 200) {
          SuccessToast("Employee updated successfully");
          setEditEmployeeModal(false);
        }
      } catch (error) {
        ErrorToast(error?.response?.data?.message || "Update failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Employee Details
      </h2>

      <div className="flex justify-between items-center  rounded-lg shadow-sm mb-10  bg-[#FAFAFA] p-4">
        <div className="flex items-center  mb-4">
          <img
            src={employeeData?.profilePicture ?? ProfileAdd}
            alt="avatar"
            className="w-[116px] h-[116px] rounded-full border border-[#63CFAC] mr-6 p-0.5"
          />
          <div>
            <h3 className="text-[32px] font-[600]">
              {employeeData?.firstName || employeeData?.lastName
                ? [employeeData?.firstName, employeeData?.lastName]
                    .filter(Boolean)
                    .join(" ")
                : "--"}
            </h3>
            <p className="text-[#565656] text-[16px] font-[500] ">
              {employeeData?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-end">
            <span className=" text-[16px] font-[500] text-[#565656] ">
              Current Plan
            </span>
            <h3 className="font-[600] text-[24px] underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent">
              <span className="text-black">
                {company?.subscriptionPlan?.name}
              </span>{" "}
              {/* ({company?.costPerEmployee}) */}
            </h3>
          </div>
          <div
            onClick={() => setDeleteModal(true)}
            className="w-[58px] bg-[#FF5D5D] h-[49px] cursor-pointer flex justify-center items-center rounded-[10px]"
          >
            <FiTrash2 size={25} color="white" />
          </div>
          <div className="w-[58px]">
            <Button
              text={<BiEdit color="white" size={25} />}
              onClick={() => setEditEmployeeModal(true)}
            />
          </div>
        </div>
      </div>
      <EmployeeBasicInfo employeeData={employeeData} />

      {deleteModal && (
        <DeleteEmployeeModal
          id={employeeData?._id}
          onClose={() => setDeleteModal(false)}
        />
      )}
      {editEmployeeModal && (
        <EditEmployeeModal
          onClose={() => setEditEmployeeModal(false)}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
          loading={loading}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
