import { useCallback, useRef, useState } from "react";
import MembersPlanTable from "../../../components/app/AdminDashboard/memberPlans/MembersPlanTable";
import AddMemberPlanModal from "../../../components/app/AdminDashboard/memberPlans/AddMemberPlanModal";
import MembershipPlanDetailsModal from "../../../components/app/AdminDashboard/memberPlans/MembershipPlanDetailsModal";
import EditMemberModal from "../../../components/app/AdminDashboard/memberPlans/EditMemberModal";
import { IoSearch } from "react-icons/io5";
import Button from "../../../components/global/Button";
import { FaPlus } from "react-icons/fa";
import { useFetchData } from "../../../hooks/api/Get";
import TableLoader from "../../../components/global/TableLoader";
// import Pagination from "../../../components/global/Pagination";

const MemberPlans = () => {
  const debounceRef = useRef();
  const [memberPlanModal, setMemberModal] = useState(false);
  const [editmemberPlanModal, setEditmemberPlanModal] = useState(false);
  const [search, setSearch] = useState("");
  const [memberPlanDetails, setMemberPlanDetails] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [page, setPage] = useState(1);

  const [update, setUpdate] = useState(false);

  const [membershipPlanDetailsModal, setMembershipPlanDetailsModal] =
    useState(false);

  const handleViewDetail = (data) => {
    setMemberPlanDetails(data);
    setMembershipPlanDetailsModal(true);
  };

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
    setTypeValue(value);
  }, []);

  const { data, loading } = useFetchData(
    `/payment/subscriptions`,
    { search },
    page,
    update
  );

  // const handlePageChange = (page) => {
  //   setPage(page);
  // };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Membership Plan
          </h1>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[49px] shadow-sm">
            <IoSearch className="text-gray-400 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
              value={typeValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="w-[61px]">
            <Button text={<FaPlus />} onClick={() => setMemberModal(true)} />
          </div>
        </div>
      </div>

      {loading ? (
        <TableLoader />
      ) : (
        <>
          <MembersPlanTable
            data={data}
            handleSearch={handleSearch}
            typeValue={typeValue}
            handleViewDetail={handleViewDetail}
          />
          {/* <div className="flex justify-end">
            <Pagination
              currentPage={pagination?.currentPage}
              totalPages={pagination?.totalPages}
              onPageChange={handlePageChange}
              setCurrentPage={page}
            />
          </div> */}
        </>
      )}

      {memberPlanModal && (
        <AddMemberPlanModal
          onClose={() => setMemberModal(false)}
          setUpdate={setUpdate}
        />
      )}
      {membershipPlanDetailsModal && (
        <MembershipPlanDetailsModal
          onClose={() => setMembershipPlanDetailsModal(false)}
          handleEdit={() => {
            setMembershipPlanDetailsModal(false);
            setEditmemberPlanModal(true);
          }}
          memberPlanDetails={memberPlanDetails}
        />
      )}
      {editmemberPlanModal && (
        <EditMemberModal
          onClose={() => setEditmemberPlanModal(false)}
          memberPlanDetails={memberPlanDetails}
          setUpdate={setUpdate}
        />
      )}
    </div>
  );
};

export default MemberPlans;
