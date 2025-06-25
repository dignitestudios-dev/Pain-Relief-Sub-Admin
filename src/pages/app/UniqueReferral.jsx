import { useState, useEffect } from "react";
import { IoSearch, IoFunnelOutline } from "react-icons/io5";
import axios from "../../axios";
import Filter from "../../components/app/FIlter";
import SkeletonLoader from "../../components/app/SkeletonLoader"; 


const UniqueReferral = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("user");
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndData] = useState(null);

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page,
        limit: 20,
        search,
        role,
      });

      if (startDate) queryParams.append("startDate", startDate.toISOString());
      if (endDate) queryParams.append("endDate", endDate.toISOString());

      const response = await axios.get(`/admin/unique-referrals?${queryParams}`);
      setReferrals(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [role, search, page, startDate, endDate]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterClear = () => {
    setStartDate(null);
    setEndData(null);
    setIsFilterOpen(false);
  };

  const handleFilterApply = () => {
    setPage(1);
    setIsFilterOpen(false);
    fetchReferrals(); // Optional — re-fetch immediately
  };

  const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
};


  return (
    <div className="p-3 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-8">
                  <h2 className="text-[32px] font-bold pl-2">Unique Referral</h2>

          <div className="flex gap-4 text-[16px] font-medium">
            {["user", "provider"].map((type) => (
              <span
                key={type}
                className={`cursor-pointer  ${role === type
                  ? "text-[#63CFAC] border-b-2 border-[#63CFAC]"
                  : "text-gray-400"
                  }`}
                onClick={() => {
                  setRole(type);
                  setPage(1);
                }}
              >
                {type === "user" ? "User Referral" : "Chiropractor Referral"}
              </span>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded px-3 py-2 w-64 shadow-sm bg-[#F9FAFA]">
            <IoSearch className="text-gray-500 mr-2 text-xl" />
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none outline-none bg-[#F9FAFA]"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <IoFunnelOutline
            className="text-white bg-[linear-gradient(234.85deg,#29ABE2_-20.45%,#63CFAC_124.53%)] p-2 rounded-lg text-4xl cursor-pointer hover:text-white transition-colors duration-150"
            title="Filter"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

      {/* Table */}
{/* Table Section */}
{loading ? (
  <div className="bg-[#FAFAFA] p-4 rounded-md">
    {/* Table Header */}
    <div className="grid grid-cols-[40px_1fr_1.5fr_1.7fr_1.5fr_1.2fr_1fr] gap-4 px-4 py-3 rounded-md font-semibold text-sm text-black bg-[linear-gradient(234.85deg,rgba(41,171,226,0.2)_-20.45%,rgba(99,207,172,0.2)_124.53%)]">
      <div>#</div>
      <div>Referral ID</div>
      <div>Referral By</div>
      <div>Referred Member</div>
      <div>Member Email Address</div>
      <div>Sign Up Date</div>
      <div>Status</div>
    </div>

    {/* Skeleton Rows */}
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-[40px_1fr_1.5fr_1.7fr_1.5fr_1.2fr_1fr] gap-4 px-4 py-6 items-center text-sm"
      >
        <SkeletonLoader type="small" />
        <SkeletonLoader type="medium" />
        <div className="flex items-center gap-2">
          <SkeletonLoader type="avatar" />
          <SkeletonLoader type="medium" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonLoader type="avatar" />
          <SkeletonLoader type="medium" />
        </div>
        <SkeletonLoader type="medium" />
        <SkeletonLoader type="small" />
        <SkeletonLoader type="small" />
      </div>
    ))}
  </div>
) : error ? (
  <div className="text-center text-red-500 py-6">{error}</div>
) : (
  <div className="bg-[#FAFAFA] p-4 rounded-md">
    {/* Table Header */}
    <div className="grid grid-cols-[40px_1fr_1.5fr_1.7fr_1.5fr_1.2fr_1fr] gap-4 px-4 py-3 rounded-md font-semibold text-sm text-black bg-[linear-gradient(234.85deg,rgba(41,171,226,0.2)_-20.45%,rgba(99,207,172,0.2)_124.53%)]">
      <div>#</div>
      <div>Referral ID</div>
      <div>Referral By</div>
      <div>Referred Member</div>
      <div>Member Email Address</div>
      <div>Sign Up Date</div>
      <div>Status</div>
    </div>

    {/* Table Rows */}
    <div className="divide-y">
      {referrals.length > 0 ? (
        referrals.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_1fr_1.5fr_1.7fr_1.5fr_1.2fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
          >
            <div>{(page - 1) * 20 + index + 1}</div>
            <div>{item.referId || "—"}</div>

            {/* Referred By */}
            <div className="flex items-center gap-2">
              {item.referredBy.profilePicture ? (
                <img
                  src={item.referredBy.profilePicture}
                  className="w-10 h-10 rounded-full border border-blue-500 p-0.5"
                  alt="Referral By"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm border border-blue-500">
                  {getInitials(item.referredBy.name)}
                </div>
              )}
              <span>{item.referredBy.name}</span>
            </div>

            {/* Referred Member */}
            <div className="flex items-center gap-2">
              {item.referredUser.profilePicture ? (
                <img
                  src={item.referredUser.profilePicture}
                  className="w-10 h-10 rounded-full border border-blue-500 p-0.5 object-contain"
                  alt="Referred Member"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm border border-blue-500">
                  {getInitials(item.referredUser.name)}
                </div>
              )}
              <span>{item.referredUser.name}</span>
            </div>

            <div>{item.email || "—"}</div>
            <div>{new Date(item.createdAt).toLocaleDateString()}</div>
            <div className={`font-medium capitalize ${item.status === "active" ? "text-gray-600" : "text-gray-500"}`}>
              {item.status}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500 col-span-7">
          No referrals found.
        </div>
      )}
    </div>
  </div>
)}


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-4 mt-6 text-sm">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className="flex items-center px-4 py-2 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white rounded-full"
            disabled={page === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="text-sm text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </div>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="flex items-center px-4 py-2 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white rounded-full"
            disabled={page === totalPages}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          {/* <div className="bg-white rounded-lg shadow-lg p-6 w-[371px] h-[322px] relative"> */}
            <Filter
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndData={setEndData}
              referralType={role}
              setReferralType={setRole}
              onClear={handleFilterClear}
              onApply={handleFilterApply}
            />
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default UniqueReferral;
