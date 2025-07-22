import React, { useState } from "react";
import { useNavigate } from "react-router"; // use react-router-dom
import AddEmployeeModal from "./AddEmployeeModal";
import AccountCreatedModal from "./AccountCreatedModal";
import axios from "../../../../axios";
import { ErrorToast } from "../../../global/Toaster";
import EmployeeCsvModal from "./EmployeeCsvModal";
import Papa from "papaparse";

const EmployeesTable = () => {
  const navigate = useNavigate();
  const [addNewEmployeeModal, setAddNewEmployeeModal] = useState(false);
  const [accountCreatedModal, setAccountCreatedModal] = useState(false);
  const [csvModal, setCsvModal] = useState(false);

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

  const [csvLoading, setCsvLoading] = useState(false);
  const getTemplate = async () => {
    try {
      setCsvLoading(true);
      const response = await axios.post(`admin/create-template-for-csv`, {
        responseType: "blob",
      });

      // Create a blob URL from the response
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employeeTemplate.xlsx");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      ErrorToast("Downloading Fail");

      console.log("🚀 ~ handleXlsxDownload ~ error:", error);
    } finally {
      setCsvLoading(false);
    }
  };

  const [csvUploaded, setCsvUploaded] = useState(false);

  const [data, setData] = useState([
    {
      name: "",
      email: "",
      phone: "",
    },
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results?.data?.map((item) => ({
            name: item.name || "",
            email: item.email || "",
            model: item.phone || "",
          }));
          setData(parsedData);
        },
      });
      setCsvUploaded(true);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center justify-between gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Employers{" "}
            <span className="font-medium underline cursor-pointer bg-gradient-to-l to-[#be90e3] from-[#29ABE2] bg-clip-text text-transparent">
              ({staticData.length})
            </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={getTemplate}
            className="text-[14px] bg-gradient-to-l to-[#63a0cf] from-[#29e2c9] bg-clip-text text-transparent font-[600] inline-block border-b-2 border-[#63CFAC] cursor-pointer"
          >
            {csvLoading ? "Downloading..." : "Download Template"}{" "}
          </button>
          <h2
            onClick={handleFileChange}
            className="text-[14px] font-[600] inline-block border-b-2 border-black cursor-pointer"
          >
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
      {csvModal && <EmployeeCsvModal onClose={() => setCsvModal(false)} />}
    </div>
  );
};

export default EmployeesTable;
