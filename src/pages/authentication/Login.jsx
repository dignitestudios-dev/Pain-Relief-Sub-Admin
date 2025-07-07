import { useNavigate } from "react-router";
import Button from "../../components/global/Button";
import AuthInput from "../../components/global/AuthInput";
import { SideImg, logobig } from "../../assets/export";
import { useFormik } from "formik";
import { signInSchema } from "../../schema/authentication/OnBoardingSchema";
import { loginValues } from "../../init/authentication/onBoardingValues";
import { useLogin } from "../../hooks/api/Post";
import { processLogin } from "../../lib/utils";

const Login = () => {
  const { loading, postData } = useLogin();
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async () => {
        const payload = {
          email: values.email,
          password: values.password,
          fcmToken: "123",
          role: "admin",
        };
        postData("/auth/login", false, null, payload, processLogin);
      },
    });

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full min-h-screen bg-[#fcfcfc]">
      <div className="hidden lg:block">
        <img
          src={SideImg}
          alt="Side visual"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center px-4 py-8">
        <div className="text-center mb-6">
          <div className="w-36 h-36 mx-auto mb-2">
            <img
              src={logobig}
              alt="Logo"
              className="w-[178px] h-[178px] object-contain"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-[2xl] md:text-[32px] font-[600] capitalize">
            Welcome Back
          </p>
          <p className="text-sm capitalize md:text-base text-[#565656]">
            Please enter details to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <AuthInput
            placeholder="Enter email here"
            type="email"
            name="email"
            maxLength={50}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />

          <AuthInput
            placeholder="Password"
            type={"password"}
            name="password"
            maxLength={50}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />

          <div className="flex justify-end">
            <p
              type="button"
              className="text-[#181818] text-[12px] font-[500] pt-1 cursor-pointer"
              onClick={() => navigate("/auth/forgot-password")}
            >
              Forgot password?
            </p>
          </div>

          <Button text="Login" loading={loading} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
