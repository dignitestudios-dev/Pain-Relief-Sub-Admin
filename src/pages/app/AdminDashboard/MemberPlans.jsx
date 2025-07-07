import React, { useState } from "react";
import MembersPlanTable from "../../../components/app/AdminDashboard/memberPlans/MembersPlanTable";
import AddMemberPlanModal from "../../../components/app/AdminDashboard/memberPlans/AddMemberPlanModal";
import MembershipPlanDetailsModal from "../../../components/app/AdminDashboard/memberPlans/MembershipPlanDetailsModal";
import EditMemberModal from "../../../components/app/AdminDashboard/memberPlans/EditMemberModal";

const MemberPlans = () => {
  const [memberPlanModal, setMemberModal] = useState(false);
  const [editmemberPlanModal, setEditmemberPlanModal] = useState(false);
  const [membershipPlanDetailsModal, setMembershipPlanDetailsModal] =
    useState(false);
  const handleViewDetail = () => {
    setMembershipPlanDetailsModal(true);
  };
  return (
    <div>
      <MembersPlanTable
        setMemberModal={setMemberModal}
        handleViewDetail={handleViewDetail}
      />
      {memberPlanModal && (
        <AddMemberPlanModal onClose={() => setMemberModal(false)} />
      )}
      {membershipPlanDetailsModal && (
        <MembershipPlanDetailsModal
          onClose={() => setMembershipPlanDetailsModal(false)}
          handleEdit={() => {
            setMembershipPlanDetailsModal(false);
            setEditmemberPlanModal(true);
          }}
        />
      )}
      {editmemberPlanModal && <EditMemberModal onClose={()=>setEditmemberPlanModal(false)} />}
    </div>
  );
};

export default MemberPlans;
