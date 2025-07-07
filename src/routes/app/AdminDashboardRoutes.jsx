import MemberDetails from "../../components/app/AdminDashboard/member/MemberDetails";
import DetailPage from "../../components/app/AdminDashboard/service/DetailPage";
import AdminDashboard from "../../pages/app/AdminDashboard/AdminDashboard";
import Member from "../../pages/app/AdminDashboard/Member";
import Service from "../../pages/app/AdminDashboard/Service";

export const AdminDashboardRoutes = [
  {
    url: "dashboard",
    page: <AdminDashboard />,
  },

  {
    url: "member",
    page: <Member />,
  },
  {
    url: "member-details/:id",
    page: <MemberDetails />,
  },
  {
    url: "service",
    page: <Service />,
  },
  {
    url: "service-provider-detail/:id",
    page: <DetailPage />,
  },
];
