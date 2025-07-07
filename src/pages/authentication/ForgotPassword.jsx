import { useFormik } from "formik";
import { useLogin } from "../../hooks/api/Post";
import { useNavigate } from "react-router";
import { forgotValues } from "../../init/authentication/onBoardingValues";
import { forgotSchema } from "../../schema/authentication/OnBoardingSchema";
import { OtpLogo, SideImg } from "../../assets/export";
import AuthInput from "../../components/global/AuthInput";
import Button from "../../components/global/Button";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { processForget } from "../../lib/utils";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { loading, postData } = useLogin();

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } =
    useFormik({
      initialValues: forgotValues,
      validationSchema: forgotSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async () => {
        let payload = {
          email: values.email,
        };
        postData(
          "/auth/forgot-password",
          false,
          null,
          payload,
          processForget,
          values.email
        );
      },
    });

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full min-h-screen">
      {/* Left Image Panel */}
      <div className="p-4 hidden lg:block">
        <img src={SideImg} alt="Side" className="w-full h-full object-cover" />
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col pt-44 items-center px-6 py-10">
        <div className="text-center w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={OtpLogo} alt="Logo" className="w-52 sm:w-48" />
          </div>
          <p className="text-2xl sm:text-3xl font-semibold capitalize mb-1">
            Forgot Password
          </p>
          <p className="text-sm sm:text-base capitalize text-[#565656]">
            Enter your registered email address below
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="xl:w-[350px] lg:w-[350px] md:w-[550px] w-[350px] space-y-4 mt-8">
            <AuthInput
              text="Email address"
              placeholder="Enter email here"
              type="email"
              id="email"
              name="email"
              maxLength={50}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.email}
              touched={touched?.email}
            />
          </div>

          <div className="xl:w-[350px] lg:w-[350px] md:w-[550px] w-full mt-6">
            <Button text="Send" loading={loading} />
          </div>
        </form>
        <button
          type="button"
          className="w-full flex justify-center items-center gap-1 mt-4"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowDropleftCircle className="text-lg text-[#212121]" />
          <p className="text-xs uppercase font-bold tracking-wider text-[#212121]">
            Back
          </p>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
