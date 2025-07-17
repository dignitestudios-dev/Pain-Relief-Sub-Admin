import { useCallback, useRef, useState } from "react";
import ReportIssueTable from "../../../components/app/AdminDashboard/reportissue/ReportIssueTable";
import { useFetchData } from "../../../hooks/api/Get";
import Pagination from "../../../components/global/Pagination";
import TableLoader from "../../../components/global/TableLoader";
import { IoSearch } from "react-icons/io5";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import ServiceRequestModal from "../../../components/app/AdminDashboard/service/ServiceRequestModal";
import axios from "../../../axios";

const ReportIssue = () => {
  const [page, setPage] = useState(1);
  const debounceRef = useRef();
  const [typeValue, setTypeValue] = useState("");
  const [search, setSearch] = useState("");
  const [delLoading, setDelLoading] = useState(false);
  const [delRequestModal, setDelRequestModal] = useState(null);
  const [update, setUpdate] = useState(false);

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
    setTypeValue(value);
  }, []);

  const { data, loading, pagination } = useFetchData(
    `admin/get-reported-issues`,
    { search },
    1,
    update
  );

  const deleteIssue = async () => {
    try {
      setDelLoading(true);
      const response = await axios.post("/admin/delete-report", {
        reportId: delRequestModal,
      });
      if (response.status === 200) {
        SuccessToast("Delete Successfully");
        setDelRequestModal(null);
        setUpdate((prev) => !prev);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setDelLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-[32px] font-[600] text-gray-900">
              Report an Issue
            </h1>

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
          </div>
          <ReportIssueTable
            data={data}
            typeValue={typeValue}
            handleSearch={handleSearch}
            delLoading={delLoading}
            setDelRequestModal={setDelRequestModal}
          />
        </div>
      )}
      <div className="flex justify-end">
        <Pagination
          currentPage={pagination?.currentPage}
          totalPages={pagination?.totalPages}
          onPageChange={handlePageChange}
          setCurrentPage={page}
        />
      </div>
      {delRequestModal && (
        <ServiceRequestModal
          btnText="Delete"
          title="Delete Request"
          content="Are you sure?"
          onClose={() => setDelRequestModal(null)}
          handleClick={deleteIssue}
          delLoading={delLoading}
        />
      )}
    </div>
  );
};

export default ReportIssue;
