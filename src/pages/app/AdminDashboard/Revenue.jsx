import { useCallback, useRef, useState } from "react";
import RevenueTable from "../../../components/app/AdminDashboard/revenue/RevenueTable";
import { useFetchData } from "../../../hooks/api/Get";
import FilterDropRevenue from "../../../components/app/AdminDashboard/revenue/FilterDropRevenue";
import { CiFilter } from "react-icons/ci";
import Button from "../../../components/global/Button";
import { IoSearch } from "react-icons/io5";
import TableLoader from "../../../components/global/TableLoader";
import Pagination from "../../../components/global/Pagination";

const Revenue = () => {
  const debounceRef = useRef();
  const [typeValue, setTypeValue] = useState("");
  const tabs = ["All", "Standard Plan", "Premium Plan"];
  const [activeTab, setActiveTab] = useState("All");
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [page, setPage] = useState(1);
  const [plans, setPlans] = useState("");

  const [selectedTypes, setSelectedTypes] = useState("");

  const [filterData, setFilterData] = useState({
    startDate: null,
    endDate: null,
    planType: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    startDate: null,
    endDate: null,
    planType: "Select Type",
    search: "",
  });

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setAppliedFilters((prev) => ({ ...prev, search: value }));
    }, 500);
    setTypeValue(value);
  }, []);

  const handleFilter = (start, end, types, planType) => {
    console.log("🚀 ~ handleFilter ~ planType:", planType);
    setFilterData({ startDate: start, endDate: end });

    if (["Monthly", "Yearly"].includes(types)) {
      setAppliedFilters((prev) => ({
        ...prev,
        planType: types,
      }));
      setFilterData((prev) => ({
        ...prev,
        planType: types?.toLowerCase(),
      }));
    }

    setFilterDropDown(false);
  };

  const [selected, setSelected] = useState({
    individual: false,
    couple: false,
    family: false,
  });

  const toggle = (type) => {
    setSelected((prev) => ({ [type]: !prev[type] }));
    setSelectedTypes(type);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };

  const { data, loading, pagination } = useFetchData(
    `admin/get-plans-revenue`,
    {
      plan: plans,
      search: appliedFilters?.search,
      startDate: filterData?.startDate
        ? filterData?.startDate.toISOString().split("T")[0]
        : "",
      endDate: filterData?.endDate
        ? filterData?.endDate.toISOString().split("T")[0]
        : "",
      category: selectedTypes,
      planType:
        filterData.planType === "monthly"
          ? "monthly"
          : filterData.planType === "yearly"
          ? "yearly"
          : "",
    },
    page
  );
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Revenue
          </h1>

          <nav className="flex gap-6 items-center text-[16px] font-[500] text-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPlans(tab === "All" ? "" : tab);
                }}
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

        <div className="flex gap-4">
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
          <div className="w-[122px]">
            <Button text={"Export CSV"} />
          </div>
          <div
            onClick={() => setFilterDropDown((prev) => !prev)}
            className="flex w-[50px] h-[49px] cursor-pointer justify-center items-center  bg-gradient-to-l to-[#63CFAC] from-[#29ABE2]  rounded-[8px] "
          >
            <CiFilter color="white" size={25} />
          </div>
        </div>
      </div>
      {filterDropDown && (
        <FilterDropRevenue
          onClose={() => setFilterDropDown(false)}
          handleFilter={handleFilter}
          filters={appliedFilters}
          setFilters={setAppliedFilters}
          toggle={toggle}
          selected={selected}
          selectedTypes={selectedTypes}
        />
      )}
      {loading ? (
        <TableLoader />
      ) : (
        <>
          <RevenueTable data={data} />
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

export default Revenue;
