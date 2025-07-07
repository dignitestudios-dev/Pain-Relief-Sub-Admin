import { useState } from "react";
import { useNavigate } from "react-router";
import { updatePasswordValues } from "../../init/authentication/onBoardingValues";
import { updatePasswordSchema } from "../../schema/authentication/OnBoardingSchema";
import { processUpdatePassword } from "../../lib/utils";
import PasswordUpdatedModal from "../../components/onBoarding/PasswordUpdatedModal";
import AuthInput from "../../components/global/AuthInput";
import Button from "../../components/global/Button";
import { useFormik } from "formik";
import { useLogin } from "../../hooks/api/Post";
import { OtpLogo, SideImg } from "../../assets/export";

const UpdatePassword = () => {
  const { loading, postData } = useLogin();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: updatePasswordValues,
      validationSchema: updatePasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async () => {
        let obj = {
          newPassword: values.password,
        };
        postData(
          "/auth/reset-password",
          false,
          null,
          obj,
          processUpdatePassword,
          null,
          setIsModal
        );
      },
    });
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full">
      <div className="p-4 lg:block hidden">
        <img src={SideImg} />
      </div>
      <div className="flex flex-col justify-center items-center lg:h-auto h-screen">
        <div className="pb-4 text-center">
          <div className="w-[350px] flex justify-center mb-8">
            <img src={OtpLogo} className="w-[216px]" />
          </div>
          <p className="text-[32px] font-semibold capitalize">
            Set New Password{" "}
          </p>
          <p className="text-[16px] capitalize text-[#565656]">
            Enter new password to Continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 lg:w-[350px] md:w-[550px] w-[320px]">
            <AuthInput
              text={" New Password"}
              placeholder={"New Password"}
              type={"password"}
              id={"password"}
              name={"password"}
              Length={50}
              maxLength={50}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.password}
              touched={touched?.password}
            />
            <AuthInput
              text={" Confirm Password"}
              placeholder={"Confirm Password"}
              type={"password"}
              id={"cPassword"}
              name={"cPassword"}
              Length={50}
              maxLength={50}
              value={values.cPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.cPassword}
              touched={touched?.cPassword}
            />
          </div>

          <div className="xl:w-[350px] lg:w-[350px] md:w-[550px] w-full mt-6">
            <Button text="Save" loading={loading} />
          </div>
        </form>
      </div>
      {isModal && (
        <PasswordUpdatedModal
          isOpen={setIsModal}
          onClick={() => navigate("/auth/login")}
        />
      )}
    </div>
  );
};

export default UpdatePassword;
