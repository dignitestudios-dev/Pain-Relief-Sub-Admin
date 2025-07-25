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

export const BankDetailSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").max(50),
  accountNo: Yup.string().required("Account Number is required").max(50),
  accountId: Yup.string().required("Account Id is required").max(50),
});

export const addEmployeeSchema = Yup.object({
  fullname: Yup.string()
    .required("Full name is required.")
    .test(
      "not-empty-after-trim",
      "Full name cannot be empty or just spaces.",
      (value) => value?.trim().length > 0
    )
    .test("no-leading-space", "Full name cannot start with a space.", (value) =>
      value ? !value.startsWith(" ") : true
    )
    .test(
      "no-multiple-spaces",
      "Full name cannot contain multiple spaces.",
      (value) => (value ? !/ {2,}/.test(value) : true)
    )
    .test("no-numbers", "First name cannot contain numbers.", (value) =>
      value ? !/\d/.test(value) : true
    )
    .test(
      "first-letter-uppercase",
      "First letter must be uppercase.",
      (value) => (value ? /^[A-Z]/.test(value.trim()) : true)
    ),

  email: Yup.string()
    .required("Email is required")
    .test("no-leading-space", "Email cannot start with a space.", (value) =>
      value ? value[0] !== " " : false
    )
    .test(
      "no-internal-or-trailing-space",
      "Email cannot contain spaces.",
      (value) => (value ? value.trim() === value && !/\s/.test(value) : false)
    )
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format."),

  phone: Yup.string()
    .transform((value) => value.replace(/\D/g, ""))
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits.")
    .required("Please enter your phone number"),

  userImage: Yup.mixed()
    .test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= 10 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type))
    ),
});
