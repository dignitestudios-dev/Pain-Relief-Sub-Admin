import { useState } from "react";
import SubAdminTable from "../../../components/app/AdminDashboard/subadmin/SubAdminTable";
import CreateSubAdminModal from "../../../components/app/AdminDashboard/subadmin/CreateSubAdminModal";
import { useFetchData } from "../../../hooks/api/Get";
import TableLoader from "../../../components/global/TableLoader";

const SubAdmin = () => {
  const [subAdminModal, setSubAdminModal] = useState(false);

  const { data, loading } = useFetchData(`admin/get-sub-admins`, {}, 1);
  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : (
        <SubAdminTable setSubAdminModal={setSubAdminModal} data={data} />
      )}
      {subAdminModal && (
        <CreateSubAdminModal onCLose={() => setSubAdminModal(false)} />
      )}
    </div>
  );
};

export default SubAdmin;
