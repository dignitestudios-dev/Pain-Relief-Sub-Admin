import React, { useState } from "react";
import CompanyManagementTable from "../../../components/app/AdminDashboard/companyManagement/CompanyManagementTable";
import AddNewCompanyModal from "../../../components/app/AdminDashboard/companyManagement/AddNewCompanyModal";

const CompanyManagement = () => {
  const [addNewCompany, setAddNewCompany] = useState(false);
  return (
    <div>
      <CompanyManagementTable setAddNewCompany={setAddNewCompany} />
      {addNewCompany && (
        <AddNewCompanyModal onCLose={() => setAddNewCompany(false)} />
      )}
    </div>
  );
};

export default CompanyManagement;
