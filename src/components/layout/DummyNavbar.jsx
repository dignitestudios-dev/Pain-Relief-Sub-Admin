import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../axios";
import { ClipLoader } from "react-spinners";

const DummyNavbar = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/admin/get-profile");
      if (res.data.success) {
        setProfileData(res.data.data);
      }
    } catch {}
  };

  useEffect(() => {
    fetchProfile();

    const onStorage = (e) => {
      if (e.key === "profileUpdated") {
        fetchProfile();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleProfileClick = () => {
    navigate("/app/profile");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    return names.map(n => n[0].toUpperCase()).slice(0, 2).join("");
  };

  if (!profileData) return  <div className="flex items-center justify-end h-64">
        <ClipLoader size={85} color="#FFFF" />
      </div>;

  return (
    <div className="w-full px-4 py-8 flex justify-end items-center gap-3">
      <div
        onClick={handleProfileClick}
        className="flex items-center gap-3 cursor-pointer"
      >
        <span className="text-white font-medium">{profileData.firstName}</span>

        {profileData.profilePicture ? (
          <img
            src={profileData.profilePicture}
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border border-white p-0.5 cursor-pointer"
          />
        ) : (
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-semibold">
            {getInitials(profileData.firstName)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DummyNavbar;
