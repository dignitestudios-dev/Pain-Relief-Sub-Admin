import { useEffect, useState } from "react";
import ChangePasswordModal from "../../../components/app/SubAdminDashboard/ChangePasswordModal";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../../components/global/Toaster";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for edit inputs
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // State for file and preview
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/admin/get-profile");
        if (response.data.success) {
          setProfileData(response.data.data);
        } else {
          ErrorToast(response.data.message || "Failed to fetch profile.");
        }
      } catch (err) {
        ErrorToast(err.response?.data?.message || "Something went wrong.");
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return ErrorToast("All fields are required.");
    }
    if (newPassword !== confirmPassword) {
      return ErrorToast("New passwords do not match.");
    }

    try {
      setLoading(true);
      const response = await axios.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        SuccessToast("Password changed successfully.");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        closePasswordModal();
      } else {
        ErrorToast(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    if (profileData) {
      setEditData({
        name: profileData.firstName || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
      });
      setImagePreview(profileData.profilePicture || null);
      setImageFile(null); // reset file input on open
    }
    setIsEditModalOpen(true);
  };

  // When user selects new image file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // preview as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", editData.name);
      formData.append("phone", editData.phone);

      if (imageFile) {
        formData.append("profilePicture", imageFile); // binary file data sent here
      }

      const response = await axios.post("/admin/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        SuccessToast("Profile updated successfully.");
        setProfileData((prev) => ({
          ...prev,
          firstName: editData.name,
          phone: editData.phone,
          profilePicture: imagePreview || prev.profilePicture,
        }));
        closeModal();
      } else {
        ErrorToast(response.data.message || "Update failed.");
      }
    } catch (error) {
      ErrorToast(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const closePasswordModal = () => setIsPasswordModalOpen(false);
  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closeModal = () => setIsEditModalOpen(false);

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-64">
        <ClipLoader size={85} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow mx-auto">
      <h2 className="text-[24px] font-bold mb-4">Sub Admin Details</h2>

      {/* Header */}
      <div className="flex items-center justify-between bg-[#FAFAFA] rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-center">
          <img
            src={profileData.profilePicture || "/default-avatar.png"}
            alt="avatar"
            className="w-20 h-20 rounded-full border mr-6 object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">{profileData.firstName}</h3>
            <p className="text-gray-500">{profileData.email}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={openPasswordModal}
            className="bg-[#2121211C] text-black py-2 px-8 rounded-md transition"
          >
            Change Password
          </button>

          <button
            onClick={handleEditClick}
            className="bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] text-white px-8 py-2 rounded-md hover:bg-[#2293c9] transition"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-3">
        <p className="text-[24px] font-bold pb-4 border-b border-[#EAEAEA]">
          Sub Admin Info
        </p>
        <InfoRow label="Full Name" value={profileData.firstName} />
        <InfoRow label="Email Address" value={profileData.email} />
        <InfoRow label="Mobile Number" value={profileData.phone} />
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black border border-black px-2 rounded hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              Edit Sub Admin Details
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={imagePreview || "/default-avatar.png"}
                alt="Profile"
                className="w-14 h-14 rounded-full border border-[#29ABE2]"
              />
              <label
                htmlFor="profilePictureInput"
                className="text-black hover:text-blue-500 text-sm font-medium underline cursor-pointer"
              >
                Change Profile
              </label>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Full Name"
              />
              <input
                type="email"
                value={editData.email}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border rounded-md text-gray-500"
              />
              <input
                type="text"
                value={editData.phone}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border rounded-md text-gray-500"
              />
            </div>

            <button
              onClick={handleSaveEdit}
              disabled={loading}
              className={`w-full mt-6 py-2 rounded-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#29ABE2] to-[#63CFAC]"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        onSubmit={handlePasswordChange}
        formData={passwordData}
        setFormData={setPasswordData}
        loading={loading}
      />
    </div>
  );
};

const InfoRow = ({ label, value, multi, last }) => (
  <div className={`py-2 ${!last ? "border-b border-[#EAEAEA]" : ""}`}>
    <p className="text-[#565656] mb-1">{label}</p>
    <p className={`text-black ${multi ? "whitespace-pre-line" : ""}`}>
      {value}
    </p>
  </div>
);

export default Profile;
