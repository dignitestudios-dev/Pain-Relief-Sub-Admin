import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from "../../axios"; // Importing the custom axios instance
import { ErrorToast } from "../../components/global/Toaster";
import SkeletonLoader from "../../components/app/SkeletonLoader";

const DummyHome = () => {
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1);   // Track the total number of pages
  const [limit, setLimit] = useState(10); // Fixed number of items per page (10)
  const navigate = useNavigate();

  useEffect(() => {

    const fetchProviders = async () => {
      try {
        const response = await axios.get("/admin/get-providers", {
          params: {
            page: currentPage,
            limit: limit, 
            isPainReliefCoach: false,
            status: 'approved',
          },
        });

        if (response.data.success) {
          setProviders(response.data.data); 
          setTotalPages(response.data.pagination.totalPages); 
        } else {
          ErrorToast("Failed to fetch providers.");
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
        ErrorToast("Error fetching provider data.");
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchProviders();
  }, [currentPage, limit]); // Fetch providers whenever currentPage or limit changes

  // Filter and sort the data
  const sortedData = providers
    .filter((provider) => provider.name?.toLowerCase().includes(search.toLowerCase())) // Filter by search query
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort by name (you can change this sorting criteria)

  const handleViewDetail = (providerId) => {
    navigate(`/app/user-details?id=${providerId}`); // Use query params if necessary
  };

  // Handle page change (previous/next)
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[32px] font-bold pl-2">Service Provider</h2>
        <div className="flex items-center border rounded px-3 py-2 w-64 shadow-sm bg-[#F9FAFA]">
          <IoSearch className="text-gray-500 mr-2 text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full border-none outline-none bg-[#F9FAFA]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Column headers */}
              <div className="bg-[#FAFAFA] p-4 rounded-md">

      <div 
  className="grid grid-cols-[40px_1.2fr_1fr_1.3fr_1fr_2fr_0.8fr_1fr] gap-4 px-4 py-3 rounded-md text-sm font-semibold text-black bg-[linear-gradient(234.85deg,rgba(41,171,226,0.2)_-20.45%,rgba(99,207,172,0.2)_124.53%)]"
>
  {/* Your content goes here */}

        <div>#</div>
        <div>Name</div>
        <div>Clinic Name</div>
        <div>Email Address</div>
        <div>Phone Number</div>
        <div>Clinic Location</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* Rows */}
      <div className="divide-y">
        {loading ? (
          // Custom Skeleton Loader for each row
          [...Array(limit)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[40px_1.2fr_1fr_1.3fr_1fr_2fr_0.8fr_1fr] gap-4 px-4 py-6 items-center text-sm"
            >
              <SkeletonLoader type="small" />
              <SkeletonLoader type="medium" />
              <SkeletonLoader type="medium" />
              <SkeletonLoader type="medium" />
              <SkeletonLoader type="medium" />
              <SkeletonLoader type="medium" />
              <SkeletonLoader type="small" />
              <SkeletonLoader type="small" />
            </div>
          ))
        ) : sortedData.length > 0 ? (
          sortedData.map((provider, index) => {
            const rowNumber = (currentPage - 1) * limit + index + 1; // Correct the row number calculation
            return (
              <div
                key={provider._id}
                className="grid grid-cols-[40px_1.2fr_1fr_1.3fr_1fr_2fr_0.8fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
              >
                <div>{rowNumber}</div> {/* Display the corrected row number */}
                <div className="flex items-center gap-2">
                  <img
                    src={provider.profilePicture}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-blue-500  p-0.5"
                  />
                  <span>{provider.name}</span>
                </div>
                <div>{provider.clinicName}</div>
                <div>{provider.email}</div>
                <div>{provider.phone}</div>
                <div>{provider.address?.address || "N/A"}</div>
                <div className="capitalize">{provider.profileStatus}</div>
                <div
                  className="font-medium underline cursor-pointer text-black"
                  onClick={() => handleViewDetail(provider._id)} // Pass the provider ID
                >
                  View Detail
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-gray-500 col-span-8">No results found.</div>
        )}
      </div>
</div>

 <div className="flex items-center justify-end space-x-4 mt-6 px-4">
  {/* Previous Button */}
  <button
    onClick={() => handlePageChange("prev")}
    className={`flex items-center px-4 py-1.5 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white rounded-full  focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out`}
    disabled={currentPage === 1}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19l-7-7 7-7"
      />
    </svg>
    Previous
  </button>

  {/* Page Info */}
  <div className="text-sm text-gray-700 font-semibold">
    <span className="text-gray-700">Page {currentPage}</span> of {totalPages}
  </div>

  {/* Next Button */}
  <button
    onClick={() => handlePageChange("next")}
    className={`flex items-center px-4 py-1.5 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out`}
    disabled={currentPage === totalPages}
  >
    Next
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 ml-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
</div>

    </div>
  );
};

export default DummyHome;
