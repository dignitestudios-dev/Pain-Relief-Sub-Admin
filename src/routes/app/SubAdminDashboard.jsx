import DummyHome from "../../pages/app/SubAdminDashboard/DummyHome";
import Profile from "../../pages/app/SubAdminDashboard/Profile";
import UniqueReferral from "../../pages/app/SubAdminDashboard/UniqueReferral";
import UserDetails from "../../pages/app/SubAdminDashboard/UserDetails";

export const SubAdminDashboard = [
  {
    url: "dashboard",
    page: <DummyHome />,
  },
  {
    url: "unique-referral",
    page: <UniqueReferral />,
  },
  {
    url: "user-details",
    page: <UserDetails />,
  },
  {
    url: "profile",
    page: <Profile />,
  },
];
