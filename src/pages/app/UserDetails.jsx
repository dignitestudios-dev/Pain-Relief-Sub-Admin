import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "../../axios"; // Custom Axios instance
import { ErrorToast } from "../../components/global/Toaster";
import ReferredFriends from "../../components/app/ReferredFriends";
import { ClipLoader } from "react-spinners";

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState("Basic Info");
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const navigate = useNavigate();
  const location = useLocation();
  const providerId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    const fetchProviderDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/admin/get-provider/${providerId}`);
        if (response.data.success) {
          setProvider(response.data.data);
        } else {
          setError("Failed to fetch provider details.");
          ErrorToast("Failed to fetch provider details.");
        }
      } catch (err) {
        setError("Error fetching provider details.");
        ErrorToast("Error fetching provider details.");
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      fetchProviderDetails();
    }
  }, [providerId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <ClipLoader size={85} color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[32px] font-bold mb-4">Service Provider Details</h2>

      {/* Header */}
      <div className="flex items-center bg-[#FAFAFA] rounded-lg p-6 shadow-sm mb-4">
        <img
          src={provider.profilePicture}
          alt="avatar"
          className="w-20 h-20 rounded-full border border-blue-500 mr-6 p-0.5"
        />
        <div>
          <h3 className="text-xl font-semibold">{provider.name}</h3>
          <p className="text-gray-500">{provider.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 rounded-md shadow p-2 mb-6">
        {["Basic Info", "Medical License", "Referral Friends"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2 rounded-md ${
              activeTab === tab
                ? "bg-gradient-to-bl from-[#29ABE2] to-[#63CFAC] text-white"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content: Basic Info */}
      {activeTab === "Basic Info" && (
        <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-2">
          <p className="text-[24px] font-bold pb-4">Clinic Profile</p>
          <span className="w-full border border-b flex"></span>
          <InfoRow label="Name of Clinic/Practice" value={provider.clinicName} />
          <span className="w-full border border-b flex"></span>
          <InfoRow label="Email Address" value={provider.email} />
          <span className="w-full border border-b flex"></span>
          <InfoRow label="Mobile Number" value={provider.phone} />
          <span className="w-full border border-b flex"></span>
          <InfoRow label="Clinic Location" value={provider.addresses[0]?.address} multi />
          <span className="w-full border border-b flex"></span>
          <InfoRow label="Pain Relief Coach" value={provider.isPainReliefCoach ? "Yes" : "No"} />
          <span className="w-full border border-b flex"></span>
          <InfoRow label="Provider Individual NPI" value={provider.npi} />
          <span className="w-full border border-b flex"></span>
          <InfoRow label="Website" value={provider.website} />
          <span className="w-full border border-b flex"></span>
          <div>
            <p className="font-medium mb-1 text-gray-600">Description</p>
            <p className=" whitespace-pre-line">{provider.description}</p>
          </div>
        </div>
      )}

      {/* Tab Content: Medical License */}
      {activeTab === "Medical License" && (
        <div className="p-6 bg-[#FAFAFA] rounded-md">
          <h3 className="text-2xl font-semibold mb-6 text-black">Chiropractor Details</h3>
          <span className="w-full border border-b flex mb-6"></span>

{provider.documents && provider.documents.length > 0 ? (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {provider.documents.map((docUrl, index) => (
        <div key={index} className="rounded-md overflow-hidden">
          <div className="pb-2 text-left font-medium text-[#565656]">
            Medical License
          </div>
          <img
            src={docUrl}
            alt={`Medical License ${index + 1}`}
            className="w-full h-40 object-cover cursor-pointer"
            onClick={() => setSelectedImage(docUrl)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-image.png";
            }}
          />
        </div>
      ))}
    </div>

    {/* Modal */}
    {selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={() => setSelectedImage(null)}
      >
        <img
          src={selectedImage}
          alt="Enlarged Document"
          className="max-w-[90%] max-h-[90%] rounded shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
        />
        <button
          className="absolute top-4 right-6 text-white text-3xl font-bold"
          onClick={() => setSelectedImage(null)}
        >
          &times;
        </button>
      </div>
    )}
  </>
) : (
  <p className="text-gray-600">No medical license documents uploaded.</p>
)}
        </div>
      )}

      {/* Tab Content: Referral Friends */}
      {activeTab === "Referral Friends" && <ReferredFriends />}
    </div>
  );
};

const InfoRow = ({ label, value, multi }) => (
  <div className="py-2">
    <p className="text-[#565656] mb-1">{label}</p>
    <p className={`text-black ${multi ? "whitespace-pre-line" : ""}`}>{value}</p>
  </div>
);

export default UserDetails;
