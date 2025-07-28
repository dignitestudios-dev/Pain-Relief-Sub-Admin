import { useCallback, useRef, useState } from "react";
import CompanyManagementTable from "../../../components/app/AdminDashboard/companyManagement/CompanyManagementTable";
import AddNewCompanyModal from "../../../components/app/AdminDashboard/companyManagement/AddNewCompanyModal";
import { useFetchData } from "../../../hooks/api/Get";
import BankDetailModal from "../../../components/app/AdminDashboard/companyManagement/BankDetailModal";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import { validateCompanyForm } from "../../../lib/helpers";
import Button from "../../../components/global/Button";
import { IoSearch } from "react-icons/io5";
import TableLoader from "../../../components/global/TableLoader";

const CompanyManagement = () => {
  const debounceRef = useRef();

  const [search, setSearch] = useState("");
  const [addNewCompany, setAddNewCompany] = useState(false);
  const [addBankDetail, setAddBankDetail] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  }, []);

  const { data } = useFetchData(`/payment/subscriptions`, {}, 1, "");
  const { data: companyData, loading } = useFetchData(
    "/admin/get-all-companies",
    { search },
    1,
    update
  );

  const handleCompany = async (
    companyData,
    companyImage,
    selectedPlanId,
    pricingId
  ) => {
    const validationErrors = validateCompanyForm({
      companyData,
      companyImage,
      selectedPlanId,
      pricingId,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    setCompanyLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", companyData?.name);
      formData.append("email", companyData?.email);
      formData.append("profilePicture", companyImage);
      formData.append("subscriptionPlan", selectedPlanId);
      formData.append("subscriptionPrice", pricingId);
      formData.append("costPerEmployee", companyData?.price);

      const response = await axios.post("/admin/create-company", formData);
      if (response.status === 200) {
        SuccessToast("Company added successfully");
        setAddNewCompany(false);
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setCompanyLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-sm max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-7">
            <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
              Company Management
            </h1>

            <nav className="flex gap-6 text-sm font-medium text-gray-600"></nav>
          </div>
          {/* Search */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[49px] shadow-sm">
              <IoSearch className="text-gray-400 mr-2 text-lg" />
              <input
                type="text"
                placeholder="Search"
                className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="w-[179px]">
              <Button
                text={"Add New Company"}
                onClick={() => setAddNewCompany(true)}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <TableLoader />
        ) : (
          <CompanyManagementTable companyData={companyData} />
        )}
      </div>
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
