import React, { useCallback, useRef, useState } from "react";
import ReportIssueTable from "../../../components/app/AdminDashboard/reportissue/ReportIssueTable";
import { useFetchData } from "../../../hooks/api/Get";
import Pagination from "../../../components/global/Pagination";
import TableLoader from "../../../components/global/TableLoader";

const ReportIssue = () => {
  const [page, setPage] = useState(1);
  const debounceRef = useRef();
  const [typeValue, setTypeValue] = useState("");
  const [search, setSearch] = useState("");

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
    1
  );

  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : (
        <ReportIssueTable
          data={data}
          typeValue={typeValue}
          handleSearch={handleSearch}
        />
      )}
      <div className="flex justify-end">
        <Pagination
          currentPage={pagination?.currentPage}
          totalPages={pagination?.totalPages}
          onPageChange={handlePageChange}
          setCurrentPage={page}
        />
      </div>
    </div>
  );
};

export default ReportIssue;
