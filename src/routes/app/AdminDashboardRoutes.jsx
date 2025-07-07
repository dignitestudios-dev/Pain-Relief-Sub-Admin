import AppoitmentDetail from "../../components/app/AdminDashboard/appointments/AppoitmentDetail";
import CompanyDetail from "../../components/app/AdminDashboard/companyManagement/CompanyDetail";
import EmployeeDetails from "../../components/app/AdminDashboard/companyManagement/EmployeeDetails";
import MemberDetails from "../../components/app/AdminDashboard/member/MemberDetails";
import DetailPage from "../../components/app/AdminDashboard/service/DetailPage";
import SubAdminDetail from "../../components/app/AdminDashboard/subadmin/SubAdminDetail";
import AdminDashboard from "../../pages/app/AdminDashboard/AdminDashboard";
import Appointments from "../../pages/app/AdminDashboard/Appointments";
import CompanyManagement from "../../pages/app/AdminDashboard/CompanyManagement";
import Member from "../../pages/app/AdminDashboard/Member";
import MemberPlans from "../../pages/app/AdminDashboard/MemberPlans";
import ReportIssue from "../../pages/app/AdminDashboard/ReportIssue";
import Revenue from "../../pages/app/AdminDashboard/Revenue";
import Service from "../../pages/app/AdminDashboard/Service";
import SubAdmin from "../../pages/app/AdminDashboard/SubAdmin";
import Profile from "../../pages/app/SubAdminDashboard/Profile";
import UniqueReferral from "../../pages/app/AdminDashboard/UniqueReferral";

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
  {
    url: "sub-admin",
    page: <SubAdmin />,
  },
  {
    url: "sub-admin",
    page: <SubAdmin />,
  },
  {
    url: "sub-admin-detail/:id",
    page: <SubAdminDetail />,
  },
  {
    url: "profile",
    page: <Profile />,
    url: "appointment",
    page: <Appointments />,
  },
  {
    url: "appoitmentDetail/:id",
    page: <AppoitmentDetail />,
  },
  {
    url: "unique-referral",
    page: <UniqueReferral />,
  },
  {
    url: "membership",
    page: <MemberPlans />,
  },
  {
    url: "report-issue",
    page: <ReportIssue />,
  },
  {
    url: "revenue",
    page: <Revenue />,
  },
  {
    url: "company-managment",
    page: <CompanyManagement />,
  },
  {
    url: "company-detail/:id",
    page: <CompanyDetail />,
  },
  {
    url: "employee-detail/:id",
    page: <EmployeeDetails />,
  },
];
