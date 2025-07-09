import { useCallback, useRef, useState } from "react";
import UniqueReferralTable from "../../../components/app/AdminDashboard/uniquereferal/UniqueReferralTable";
import { useFetchData } from "../../../hooks/api/Get";
import DropDownCalender from "../../../components/global/DropDownCalender";
import TableLoader from "../../../components/global/TableLoader";
import { IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";

const UniqueReferral = () => {
  const debounceRef = useRef();

  const tabs = ["User Referral", "Chiropractor Referral"];
  const [activeTab, setActiveTab] = useState("User Referral");
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [filterDate, setFilterDate] = useState({
    startDate: null,
    endDate: null,
    referralType: null,
  });
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    referralType: "User Referral",
    search: "",
  });

  const { data, loading } = useFetchData(
    `admin/unique-referrals`,
    {
      role: activeTab === "User Referral" ? "user" : "provider",
      search: filters?.search,
      startDate: filterDate?.startDate
        ? filterDate?.startDate.toISOString().split("T")[0]
        : "",
      endDate: filterDate?.endDate
        ? filterDate?.endDate.toISOString().split("T")[0]
        : "",
      referralType: filterDate?.referralType,
    },
    1
  );

  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: value }));
    }, 500);
  }, []);

  const handleFilter = (start, end, referral) => {
    setFilterDate({ startDate: start, endDate: end });

    if (["Subscribed", "Unsubscribed"].includes(referral)) {
      setFilters((prev) => ({
        ...prev,
        referralType: referral,
      }));
      setFilterDate((prev) => ({
        ...prev,
        referralType: referral?.toLowerCase(),
      }));
    }
    setFilterDropDown(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Header and Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Unique Referral
          </h1>

          <nav className="flex gap-6 items-center text-[16px] font-[500] text-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
        <div className="flex gap-4">
          <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[39px] shadow-sm">
            <IoSearch className="text-gray-400 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div
            onClick={() => setFilterDropDown((prev) => !prev)}
            className="flex w-[40px] cursor-pointer justify-center items-center  bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] h-[41px] rounded-[8px] "
          >
            <CiFilter color="white" size={25} />
          </div>
        </div>
      </div>
      {filterDropDown && (
        <DropDownCalender
          onClose={() => setFilterDropDown(false)}
          handleFilter={handleFilter}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      {loading ? <TableLoader /> : <UniqueReferralTable data={data} />}
    </div>
  );
};

export default UniqueReferral;
