import React, { useState } from "react";
import SubAdminTable from "../../../components/app/AdminDashboard/subadmin/SubAdminTable";
import CreateSubAdminModal from "../../../components/app/AdminDashboard/subadmin/CreateSubAdminModal";

const SubAdmin = () => {
  const [subAdminModal, setSubAdminModal] = useState(false);
  return (
    <div>
      <SubAdminTable setSubAdminModal={setSubAdminModal} />
      {subAdminModal && (
        <CreateSubAdminModal onCLose={() => setSubAdminModal(false)} />
      )}
    </div>
  );
};

export default SubAdmin;
