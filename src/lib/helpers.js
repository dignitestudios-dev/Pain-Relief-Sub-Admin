// All the helper functions should must be there.
// The functions that you're using multiple times must be there.
// e.g. formatDateToMMDDYYYY, formatEpochToMMDDYYYY, etc.
import moment from "moment/moment";

export const getLongDateFormat = (date) => {
  return moment(date).format("MMMM D, YYYY");
};

export const getDateFormat = (date) => {
  return moment(date).format("MM-DD-YYYY");
};
export const phoneFormatter = (input) => {
  if (typeof input !== "string") {
    return ""; // or return input if you want to keep original value
  }

  let cleaned;
  cleaned = input.replace(/\D/g, ""); // Remove all non-numeric characters

  if (cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  if (cleaned.length > 3 && cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  } else if (cleaned.length > 0) {
    return `(${cleaned}`;
  }

  return cleaned;
};

export const validateCompanyForm = ({
  companyData,
  companyImage,
  selectedPlanId,
  pricingId,
}) => {
  const errors = {};

  if (!companyImage) errors.image = "Company image is required";
  if (!companyData?.name) errors.name = "Company name is required";
  if (!companyData?.email) errors.email = "Email is required";
  if (!selectedPlanId) errors.plan = "Please select a subscription plan";
  if (!pricingId) errors.type = "Please select a subscription type";

  // const selectedCategories = Object.values(selectedType)?.[0];
  // const selectedKeys = Object.keys(selected).filter((key) => selected[key]);

  // if (
  //   !selectedCategories?.some((cat) => selectedKeys.includes(cat?.planType))
  // ) {
  //   errors.categories = "Please select at least one plan category";
  // }

  if (!companyData?.price) errors.price = "Cost per employee is required";

  return errors;
};
