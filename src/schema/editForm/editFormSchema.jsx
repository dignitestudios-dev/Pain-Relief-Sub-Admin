import * as Yup from "yup";

export const EditSubAdminSchema = Yup.object().shape({
  firstName: Yup.string().required("Name is required").max(50),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .transform((value) => value.replace(/\D/g, ""))
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Please enter your phone number"),
});

export const CreateSubAdminSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required").max(50),
  // lastName: Yup.string().required("Last name is required").max(50),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .transform((value) => value.replace(/\D/g, ""))
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits.")
    .required("Please enter your phone number"),
  password: Yup.string().required("Password is required").min(6),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
