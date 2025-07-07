import React, { useState } from "react";
import { useNavigate } from "react-router"; // use react-router-dom
import InvoiceModal from "./InvoiceModal";

const InVoiceDetail = ({}) => {
  const navigate = useNavigate();
  const [invoiceModal, setInVoiceModal] = useState(false);
  const staticData = [
    {
      id: 1,
      InvoiceID: "#A4fc5445",
      SubscriptionPlan: "Basic (Individual)",
      PlanDuration: "Monthly",
      BillingDate: "May 1, 2025",
      NextBillingDate: "February 1, 2025 (for monthly)",
      TotalEmployees: "45 Employees",
      Status: "Pending",
    },
    {
      id: 2,
      InvoiceID: "#A4fc5445",
      SubscriptionPlan: "Basic (Individual)",
      PlanDuration: "Monthly",
      BillingDate: "May 1, 2025",
      NextBillingDate: "February 1, 2025 (for monthly)",
      TotalEmployees: "45 Employees",
      Status: "Paid",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center justify-between gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Invoice Details
          </h1>
        </div>
        <div className="flex gap-4">
          <h2 className="text-[14px] bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent font-[600] inline-block border-b-2 border-[#63CFAC] cursor-pointer">
            Downloads Invoice
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-[14px] text-gray-700">
          <thead>
            <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-[14px] capitalize font-[400] tracking-wide text-gray-700">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Invoice ID</th>
              <th className="py-3 px-4">Subscription Plan</th>
              <th className="py-3 px-4">Plan Duration</th>
              <th className="py-3 px-4">Billing Date</th>
              <th className="py-3 px-4">Next Billing Date</th>
              <th className="py-3 px-4">Total Employees</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {staticData.map((company, index) => (
              <tr
                key={company.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{index + 1}</td>

                <td className="py-3 px-4">{company.InvoiceID}</td>
                <td className="py-3 px-4">{company.SubscriptionPlan}</td>
                <td className="py-3 px-4">{company.PlanDuration}</td>

                <td className="py-3 px-4">{company.BillingDate}</td>
                <td className="py-3 px-4">{company.NextBillingDate}</td>
                <td className="py-3 px-4">{company.TotalEmployees}</td>
                <td
                  className={` ${
                    company.Status === "Pending"
                      ? "text-[#FF6200]"
                      : "text-[#00BF40]"
                  } py-3 px-4`}
                >
                  {company.Status}
                </td>
                <td
                  className="py-3 px-4 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent  cursor-pointer"
                  onClick={() => setInVoiceModal(true)}
                >
                  View Detail
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {invoiceModal && <InvoiceModal onClose={() => setInVoiceModal(false)} />}
    </div>
  );
};

export default InVoiceDetail;
