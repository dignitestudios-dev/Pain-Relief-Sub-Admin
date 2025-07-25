/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router"; // use react-router-dom
import AddEmployeeModal from "./AddEmployeeModal";
import AccountCreatedModal from "./AccountCreatedModal";
import axios from "../../../../axios";
import { ErrorToast, SuccessToast } from "../../../global/Toaster";
import EmployeeCsvModal from "./EmployeeCsvModal";
import Papa from "papaparse";
import { useFormik } from "formik";
import { addEmployeeSchema } from "../../../../schema/editForm/editFormSchema";
import { useFetchData } from "../../../../hooks/api/Get";
import { getDateFormat } from "../../../../lib/helpers";
import TableLoader from "../../../global/TableLoader";

const EmployeesTable = ({ id }) => {
  const navigate = useNavigate();
  const [addNewEmployeeModal, setAddNewEmployeeModal] = useState(false);
  const [accountCreatedModal, setAccountCreatedModal] = useState(false);
  const [csvUploadFile, setCsvUploadFile] = useState("");

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const { data: EmployeeData, loading: EmployeLoading } = useFetchData(
    `/admin/get-employees-by-company/${id}`,
    {},
    1,
    update
  );

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
      link.setAttribute("download", "template.csv");
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
      // name: "",
      email: "",
      // phone: "",
      // company: "",
      // status: "",
    },
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCsvUploadFile(file);
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results?.data?.map((item) => ({
            // name: item.EmployeeName || "",
            email: item.email || "",
            // phone: item.EmployeePhone || "",
            // status: item.EmployeeStatus || "",
            // company: item.EmployeeCompany || "",
          }));
          setData(parsedData);
        },
      });
      setCsvUploaded(true);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      profilePicture: "",
    },
    validationSchema: addEmployeeSchema,
    onSubmit: async (values, action) => {
      // const [firstName, ...rest] = values.fullname.trim().split(" ");
      // const lastName = rest.length > 0 ? rest.join(" ") : "";
      const formData = new FormData();

      formData.append("companyId", id);
      // formData.append("firstName", firstName);
      // formData.append("lastName", lastName);

      formData.append("email", values.email);
      // formData.append("phone", values.phone);

      // if (values.profilePicture) {
      //   formData.append("profilePicture", values.profilePicture);
      // }

      try {
        setLoading(true);
        const response = await axios.post(
          "/admin/create-employee-by-company",
          formData
        );
        if (response.status === 200) {
          SuccessToast("Added Successfully");
          setAddNewEmployeeModal(false);
          setAccountCreatedModal(true);
          action.resetForm();
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit: ~ error:", error);
        ErrorToast(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center justify-between gap-7">
          <h1 className="text-[32px] font-[600] text-gray-900 mb-4 md:mb-0">
            Employees{" "}
            <span className="font-medium underline cursor-pointer bg-gradient-to-l to-[#be90e3] from-[#29ABE2] bg-clip-text text-transparent">
              ({EmployeeData?.employees?.length})
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

          <button
            type="button"
            onClick={() => {
              document.getElementById("input").click();
            }}
            className="text-[14px] font-[600] inline-block border-b-2 border-black cursor-pointer"
          >
            CSV Import
          </button>
          <input
            type="file"
            id="input"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
          />
          <h2
            onClick={() => setAddNewEmployeeModal(true)}
            className="text-[14px] bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent font-[600] inline-block border-b-2 border-[#63CFAC] cursor-pointer"
          >
            Add New Employee
          </h2>
        </div>
      </div>

      {EmployeLoading ? (
        <TableLoader />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left text-[14px] text-gray-700">
            <thead>
              <tr className="bg-gradient-to-l to-[#B9E9DB] from-[#A5DBF1] text-[14px] capitalize font-[400] tracking-wide text-gray-700">
                <th className="py-3 px-4">#</th>
                {/* <th className="py-3 px-4">employee Name</th> */}
                <th className="py-3 px-4">Email Address</th>
                {/* <th className="py-3 px-4">Phone Number</th> */}
                <th className="py-3 px-4">Onboarding Date</th>
                <th className="py-3 px-4">Membership Plan</th>

                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {EmployeeData?.employees?.map((employee, index) => (
                <tr
                  key={index}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  {/* <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={employee.profilePicture}
                        alt={employee.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-900 font-medium">
                        {[employee.firstName, employee.lastName]
                          .filter(Boolean)
                          .join(" ")}
                      </span>
                    </div>
                  </td> */}
                  <td className="py-3 px-4">{employee.email}</td>
                  {/* <td className="py-3 px-4">{employee.phone}</td> */}
                  <td className="py-3 px-4">
                    {getDateFormat(employee.createdAt)}
                  </td>

                  <td className="py-3 px-4">
                    {EmployeeData?.company?.subscriptionPlan?.name}
                  </td>
                  <td
                    className="py-3 px-4 bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent  cursor-pointer"
                    onClick={() =>
                      navigate(`/app/employee-detail/${employee._id}`, {
                        state: {
                          employeeData: employee,
                          company: EmployeeData?.company,
                        },
                      })
                    }
                  >
                    View Detail
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {addNewEmployeeModal && (
        <AddEmployeeModal
          onClose={() => setAddNewEmployeeModal(false)}
          setAccountCreatedModal={setAccountCreatedModal}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
          loading={loading}
        />
      )}
      {accountCreatedModal && (
        <AccountCreatedModal
          onClose={() => {
            setUpdate((prev) => !prev);
            setAccountCreatedModal(false);
            setAddNewEmployeeModal(false);
          }}
          handleClick={() => {
            setAddNewEmployeeModal(false);
            setAccountCreatedModal(false);
          }}
        />
      )}
      {csvUploaded && (
        <EmployeeCsvModal
          setUpdate={setUpdate}
          onClose={() => setCsvUploaded(false)}
          data={data}
          setData={setData}
          csvUploadFile={csvUploadFile}
          id={id}
        />
      )}
    </div>
  );
};

export default EmployeesTable;
