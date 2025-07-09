import { useCallback, useRef, useState } from "react";
import MemberTable from "../../../components/app/AdminDashboard/member/MemberTable";
import { useFetchData } from "../../../hooks/api/Get";
import TableLoader from "../../../components/global/TableLoader";
import Pagination from "../../../components/global/Pagination";

const Member = () => {
  const debounceRef = useRef();

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [isSubscribed, setIsSubscribed] = useState("");
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  // Filter members by tab
  const handleTab = (tab) => {
    setActiveTab(tab);
    if (tab === "Unsubscribed") {
      setIsSubscribed(false);
    } else if (tab === "Subscribed") {
      setIsSubscribed(true);
    } else {
      setIsSubscribed("");
    }
  };

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
    setTypeValue(value);
  }, []);

  const { data, loading, pagination } = useFetchData(
    `/admin/get-all-members`,
    { isSubscribed, search },
    page
  );

  const tabs = ["All", "Subscribed", "Unsubscribed"];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Members
          </h1>

          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTab(tab)}
                className={`relative pb-1 ${
                  activeTab === tab
                    ? "bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#63CFAC] after:rounded"
                    : "hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        {/* Search */}
        <div className="mt-4 md:mt-0">
          <input
            type="search"
            placeholder="Search"
            value={typeValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-48 border border-gray-300 rounded-md py-2 px-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {loading ? (
        <TableLoader />
      ) : (
        <>
          <MemberTable
            data={data}
            handleTab={handleTab}
            handleSearch={handleSearch}
            typeValue={typeValue}
            activeTab={activeTab}
          />
          <div className="flex justify-end">
            <Pagination
              currentPage={pagination?.currentPage}
              totalPages={pagination?.totalPages}
              onPageChange={handlePageChange}
              setCurrentPage={page}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Member;
