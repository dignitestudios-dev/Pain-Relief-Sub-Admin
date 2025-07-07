import React, { useState } from "react";
import { useNavigate } from "react-router"; // use react-router-dom
import AddEmployeeModal from "./AddEmployeeModal";
import AccountCreatedModal from "./AccountCreatedModal";

const EmployeesTable = () => {
  const navigate = useNavigate();
  const [addNewEmployeeModal, setAddNewEmployeeModal] = useState(false);
  const [accountCreatedModal, setAccountCreatedModal] = useState(false);

  // ✅ Static mock employee data
  const staticData = [
    {
      id: 1,
      companyName: "Acme Corp",
      email: "hr@acme.com",
      phone: "+1234567890",
      noOfEmployees: 25,

      type: "Basic",
      costPerEmployee: "$40",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      companyName: "Globex Ltd",
      email: "info@globex.com",
      phone: "+1987654321",
      noOfEmployees: 10,

      type: "Basic",
      costPerEmployee: "$30",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center justify-between gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Employers{" "}
            <span className="font-medium underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent">
              ({staticData.length})
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <h2 className="text-[14px] font-[600] inline-block border-b-2 border-black cursor-pointer">
            CSV Import
          </h2>
          <h2
            onClick={() => setAddNewEmployeeModal(true)}
            className="text-[14px] bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent font-[600] inline-block border-b-2 border-[#63CFAC] cursor-pointer"
          >
            Add New Employee
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-[14px] text-gray-700">
          <thead>
            <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-[14px] capitalize font-[400] tracking-wide text-gray-700">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">employee Name</th>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Phone Number</th>
              <th className="py-3 px-4">no of employee</th>
              <th className="py-3 px-4">Membership Plan</th>

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
                <td className="py-3 px-4">{company.phone}</td>
                <td className="py-3 px-4">{company.noOfEmployees}</td>

                <td className="py-3 px-4">{company.type}</td>
                <td
                  className="py-3 px-4 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent  cursor-pointer"
                  onClick={() => navigate(`/app/employee-detail/${company.id}`)}
                >
                  View Detail
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addNewEmployeeModal && (
        <AddEmployeeModal
          onClose={() => setAddNewEmployeeModal(false)}
          setAccountCreatedModal={setAccountCreatedModal}
        />
      )}
      {accountCreatedModal && (
        <AccountCreatedModal
          handleClick={() => {
            setAddNewEmployeeModal(false);
            setAccountCreatedModal(false);
          }}
        />
      )}
    </div>
  );
};

export default EmployeesTable;
