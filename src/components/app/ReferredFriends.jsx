import { useState, useEffect } from "react";
import axios from "../../axios"; // Custom axios instance
import { useLocation } from "react-router"; // Use to access URL params
import { ErrorToast } from "../../components/global/Toaster";
import { ClipLoader } from "react-spinners";

const ReferredFriends = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  
  const location = useLocation();
  const providerId = new URLSearchParams(location.search).get('id'); // Extract providerId from URL query params

  useEffect(() => {
    const fetchReferralData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/admin/provider-referral/${providerId}`, {
          params: {
            page: 1,
            limit: 20, // Adjust page/limit if needed
          },
        });
        if (response.data.success) {
          setReferrals(response.data.data); // Set referrals data
        } else {
          setError("Failed to fetch referral data.");
          ErrorToast("Failed to fetch referral data.");
        }
      } catch (err) {
        setError("Error fetching referral data.");
        ErrorToast("Error fetching referral data.");
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      fetchReferralData();
    }
  }, [providerId]); // Refetch when providerId changes

  const filteredData = referrals.filter((referral) =>
    referral.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <ClipLoader size={85} color="#36d7b7" />
    </div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div className="p-3 bg-[#FAFAFA] rounded-lg shadow">
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-4 border-b pb-4">
        <h2 className="text-[32px] font-bold">Referred Friends</h2>
        <p className="text-blue-500 border-b border-blue-500">Download Brochure/QR Code</p>
      </div> */}

      {/* Search Bar */}
      {/* <div className="mb-4">
        <input
          type="text"
          placeholder="Search Referred Friends"
          className="p-2 w-full border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      {/* Table */}
      <div className="bg-[#FAFAFA] p-2 rounded-md">
        {/* Column headers */}
        <div
  className="grid grid-cols-[40px_1.2fr_1.5fr_1.5fr_1.3fr_1fr] gap-4 px-4 py-3 text-sm font-semibold text-black rounded-md bg-[linear-gradient(234.85deg,rgba(41,171,226,0.2)_-20.45%,rgba(99,207,172,0.2)_124.53%)]"
>

          <div>#</div>
          <div>Referral ID</div>
          <div>Referred Member</div>
          <div>Referred Email</div>
          <div>Signup Date</div>
          <div>Status</div>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {filteredData.length > 0 ? (
            filteredData.map((user, index) => (
              <div
                key={user.referralId}
                className="grid grid-cols-[40px_1.2fr_1.5fr_1.5fr_1.3fr_1fr] gap-4 px-4 py-6 items-center text-sm hover:bg-gray-50"
              >
                <div>{index + 1}</div>
                <div>{user.referralId}</div>
                <div className="flex items-center gap-2">
                  <img
                    src={user.profilePicture || "https://i.pravatar.cc/40?img=4"} // Default avatar if profile picture is null
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{user.name || "Unknown"}</span>
                </div>
                <div>{user.email}</div>
                <div>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 col-span-6">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferredFriends;
