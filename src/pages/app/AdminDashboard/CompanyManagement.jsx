import { useState } from "react";
import CompanyManagementTable from "../../../components/app/AdminDashboard/companyManagement/CompanyManagementTable";
import AddNewCompanyModal from "../../../components/app/AdminDashboard/companyManagement/AddNewCompanyModal";
import { useFetchData } from "../../../hooks/api/Get";
import BankDetailModal from "../../../components/app/AdminDashboard/companyManagement/BankDetailModal";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import { validateCompanyForm } from "../../../lib/helpers";

const CompanyManagement = () => {
  const [addNewCompany, setAddNewCompany] = useState(false);
  const [addBankDetail, setAddBankDetail] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { data } = useFetchData(`/payment/subscriptions`, {}, 1, "");

  const handleCompany = async (companyData, companyImage) => {
    const validationErrors = validateCompanyForm({
      companyData,
      companyImage,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    setCompanyLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", companyData?.name);
      formData.append("email", companyData?.email);
      formData.append("profilePicture", companyImage);
      const response = await axios.post("/admin/create-company", formData);
      if (response.status === 200) {
        SuccessToast("Company added successfully");
        setAddNewCompany(false);
      }
    } catch (error) {
      console.log("🚀 ~ handleCompany ~ error:", error);
      ErrorToast(error.response.data.message);
    } finally {
      setCompanyLoading(false);
    }
  };

  return (
    <div>
      <CompanyManagementTable setAddNewCompany={setAddNewCompany} />
      {addNewCompany && (
        <AddNewCompanyModal
          plans={data}
          onCLose={() => setAddNewCompany(false)}
          handleCompany={handleCompany}
          companyLoading={companyLoading}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {addBankDetail && (
        <BankDetailModal onClose={() => setAddBankDetail(false)} />
      )}
    </div>
  );
};

export default CompanyManagement;
