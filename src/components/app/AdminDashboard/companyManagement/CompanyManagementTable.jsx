import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";
import Button from "../../../global/Button";
import { FaPlus } from "react-icons/fa";

const staticData = [
  {
    id: 1,
    companyName: "TechWave Inc.",
    email: "contact@techwave.com",
    plan: "Premium",
    category: "Healthcare",
    type: "Annual",
    costPerEmployee: "$49.99",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    companyName: "CodeCraft LLC",
    email: "info@codecraft.io",
    plan: "Standard",
    category: "IT Services",
    type: "Monthly",
    costPerEmployee: "$29.99",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
];

const CompanyManagementTable = ({ setAddNewCompany }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Company Management
          </h1>

          <nav className="flex gap-6 text-sm font-medium text-gray-600"></nav>
        </div>
        {/* Search */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center bg-[#F9FAFA] border border-gray-300 rounded-md px-3 py-2 w-[292px] h-[49px] shadow-sm">
            <IoSearch className="text-gray-400 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-[179px]">
            <Button
              text={"Add New Company"}
              onClick={() => setAddNewCompany(true)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-[14px] capitalize font-[400] tracking-wide text-gray-700">
              <th className="py-3 px-4">Company Name</th>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Subscription Plan</th>
              <th className="py-3 px-4">Plan Category</th>
              <th className="py-3 px-4">Subscription Type</th>
              <th className="py-3 px-4">Cost Per Employee</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {staticData.map((company, index) => (
              <tr
                key={company.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={company.avatar}
                      alt={company.companyName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-900 font-medium">
                      {company.companyName}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">{company.email}</td>
                <td className="py-3 px-4">{company.plan}</td>
                <td className="py-3 px-4">{company.category}</td>
                <td className="py-3 px-4">{company.type}</td>
                <td className="py-3 px-4">{company.costPerEmployee}</td>
                <td
                  className="font-medium underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
                  onClick={() => navigate(`/app/company-detail/${company.id}`)}
                >
                  View Detail
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyManagementTable;
