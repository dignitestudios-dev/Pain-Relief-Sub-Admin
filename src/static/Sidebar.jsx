// Import images

import {
  admin,
  adminWhite,
  appointment,
  appointmentWhite,
  company,
  companyWhite,
  dashboard,
  dashboardWhite,
  link,
  link2,
  link2Active,
  linkActive,
  members,
  membersWhite,
  referal,
  referalWhite,
  report,
  reportWhite,
  revenue,
  revenueWhite,
  service,
  serviceWhite,
  subscription,
  subscriptionWhite,
} from "../assets/export";

// sidebarData
export const sidebarDataSubAdmin = [
  {
    title: "Service Provider",
    url: "/app/dashboard",
    icon: link2, // Default icon
    activeIcon: link2Active, // Active icon
  },
  {
    title: "Unique Referral",
    url: "/app/unique-referral",

    icon: link, // Default icon
    activeIcon: linkActive, // Active icon
  },
];

export const sidebarDataAdmin = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: dashboard,
    activeIcon: dashboardWhite,
  },
  {
    title: "Members",
    url: "/app/member",
    icon: members,
    activeIcon: membersWhite,
  },
  {
    title: "Service Providers",
    url: "/app/service",
    icon: service,
    activeIcon: serviceWhite,
  },
  {
    title: "Sub Admins",
    url: "/app/sub-admin",
    icon: admin,
    activeIcon: adminWhite,
  },
  {
    title: "Appointments",
    url: "/app/appointment",
    icon: appointment,
    activeIcon: appointmentWhite,
  },
  {
    title: "Unique Referral",
    url: "/app/unique-referral",
    icon: referal,
    activeIcon: referalWhite,
  },
  {
    title: "Membership Plans",
    url: "/app/membership",
    icon: subscription,
    activeIcon: subscriptionWhite,
  },
  {
    title: "Report an Issue",
    url: "/app/report-issue",
    icon: report,
    activeIcon: reportWhite,
  },
  {
    title: "Revenue",
    url: "/app/revenue",
    icon: revenue,
    activeIcon: revenueWhite,
  },
  {
    title: "Company Management ",
    url: "/app/company-managment",
    icon: company,
    activeIcon: companyWhite,
  },
];
