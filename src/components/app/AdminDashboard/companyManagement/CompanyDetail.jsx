import { useState } from "react";
import Button from "../../../global/Button";
import { FiTrash2 } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import CompanyBasiInfo from "./CompanyBasiInfo";
import EmployessTable from "./EmployessTable";
import InVoiceDetail from "./InVoiceDetail";
import DeleteCompanyModal from "./DeleteCompanyModal";
import EditCompanyModal from "./EditCompanyModal";
import { useLocation, useNavigate } from "react-router";
import { useFetchData } from "../../../../hooks/api/Get";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import { validateCompanyForm } from "../../../../lib/helpers";
import axios from "../../../../axios";

const CompanyDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Basic Info");
  const [deleteModal, setDeleteModal] = useState(false);
  const [companyEmployeeModal, setEditCompanyModal] = useState(false);
  const [errors, setErrors] = useState({});

  const [companyLoading, setCompanyLoading] = useState(false);

  const companyData = location?.state?.companyData;
  const companyId = companyData?._id;

  const { data: subscriptionData } = useFetchData(
    `/payment/subscriptions`,
    {},
    1,
    ""
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

    // if (Object.keys(validationErrors).length > 0) return;
    setCompanyLoading(true);
    try {
      const formData = new FormData();

      formData.append("companyId", companyId);
      formData.append("name", companyData?.name);
      formData.append("email", companyData?.email);
      formData.append("costPerEmployee", companyData?.price);

      if (companyImage && typeof companyImage !== "string") {
        formData.append("profilePicture", companyImage);
      }
      if (selectedPlanId) {
        formData.append("subscriptionPlan", selectedPlanId);
      }
      if (pricingId) {
        formData.append("subscriptionPrice", pricingId);
      }

      const response = await axios.post("/admin/update-company", formData);
      if (response.status === 200) {
        SuccessToast("Company added successfully");
        navigate("/app/company-managment");
      }
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setCompanyLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-[600] text-[#212121] mb-4">
        Company Details
      </h2>

      <div className="flex justify-between items-center  rounded-lg shadow-sm mb-10  bg-[#FAFAFA] p-4">
        <div className="flex items-center  mb-4">
          <img
            src={companyData?.profilePicture}
            alt="avatar"
            className="w-[116px] h-[116px] rounded-full border border-[#63CFAC] mr-6 p-0.5"
          />
          <div>
            <h3 className="text-[32px] font-[600]">{companyData?.name}</h3>
            <p className="text-[#565656] text-[16px] font-[500] ">
              {companyData?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-end">
            <span className=" text-[16px] font-[500] text-[#565656] ">
              Cost Per Employee
            </span>
            <h3 className="font-[600] text-[24px] underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent">
              {companyData?.costPerEmployee}
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
              onClick={() => setEditCompanyModal(true)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 rounded-md shadow p-2 mb-6">
        {["Basic Info", "Employees", "Invoice"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 h-[50px] rounded-md text-[18px] font-[500]  ${
              activeTab === tab
                ? "bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] text-white "
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Basic Info" && (
        <CompanyBasiInfo companyData={companyData} />
      )}
      {activeTab === "Employees" && <EmployessTable id={companyData?._id} />}
      {activeTab === "Invoice" && (
        <InVoiceDetail companyData={companyData} id={companyData?._id} />
      )}
      {deleteModal && (
        <DeleteCompanyModal
          id={companyData?._id}
          onClose={() => setDeleteModal(false)}
        />
      )}
      {companyEmployeeModal && (
        <EditCompanyModal
          onClose={() => setEditCompanyModal(false)}
          companyData={companyData}
          subscriptionData={subscriptionData}
          errors={errors}
          setErrors={setErrors}
          handleCompany={handleCompany}
          companyLoading={companyLoading}
        />
      )}
    </div>
  );
};

export default CompanyDetail;
