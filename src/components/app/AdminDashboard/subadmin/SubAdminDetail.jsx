import { useState } from "react";
import Button from "../../../global/Button";
import SubAdminBasicInfo from "./SubAdminBasicInfo";
import SubAdminEditModal from "./SubAdminEditModal";
import { useLocation } from "react-router";
import { EditSubAdminSchema } from "./../../../../schema/editForm/editFormSchema";
import { useFormik } from "formik";
import axios from "../../../../axios";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";

const SubAdminDetail = () => {
  const [editModal, setEditModal] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const { state } = useLocation();
  const user = state?.user;
  console.log("🚀 ~ SubAdminDetail ~ user:", user);

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        firstName: user?.firstName || "",
        email: user?.email || "",
        phone: user?.phone || "",
      },
      validationSchema: EditSubAdminSchema,
      onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("subAdminId", user?._id);
        formData.append("firstName", values.firstName);
        formData.append("phone", values.phone);

        try {
          setBtnLoading(true);
          await axios.post("/admin/update-subAdmin-profile", formData);
          setEditModal(false);
          SuccessToast("Updated Successfully");
        } catch (err) {
          console.error(err);
          ErrorToast(err.response.data.message);
        } finally {
          setBtnLoading(false);
        }
      },
    });
  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Sub Admin Details
      </h2>

      <div className="flex justify-between items-center  rounded-lg shadow-sm mb-10  bg-[#FAFAFA] p-4">
        <div className="flex items-center  mb-4">
          <img
            src={user.profilePicture}
            alt="avatar"
            className="w-[116px] h-[116px] rounded-full border border-[#63CFAC] mr-6 p-0.5"
          />
          <div>
            <h3 className="text-[32px] font-[600]">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-[#565656] text-[16px] font-[500] ">
              {user.email}
            </p>
          </div>
        </div>

        <div className="w-[184px]">
          <Button text={"Edit"} onClick={() => setEditModal(true)} />
        </div>
      </div>
      <SubAdminBasicInfo provider={user} />
      {editModal && (
        <SubAdminEditModal
          onCLose={() => setEditModal(false)}
          handleSubmit={handleSubmit}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          btnLoading={btnLoading}
        />
      )}
    </div>
  );
};

export default SubAdminDetail;
