/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";

const CompanyManagementTable = ({ companyData }) => {
  console.log("🚀 ~ CompanyManagementTable ~ companyData:", companyData);
  const navigate = useNavigate();

  return (
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
          {companyData?.map((company, index) => (
            <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={company.profilePicture}
                    alt={company.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-900 font-medium">
                    {company.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4">{company.email}</td>
              <td className="py-3 px-4">{company?.subscriptionPlan?.name}</td>
              <td className="py-3 px-4">
                {company.subscriptionPrice?.billingPeriod}
              </td>
              <td className="py-3 px-4">
                {company.subscriptionPrice?.planType}
              </td>
              <td className="py-3 px-4">{company.costPerEmployee}</td>
              <td
                className="font-medium underline cursor-pointer bg-gradient-to-l to-[#63CFAC] from-[#29ABE2] bg-clip-text text-transparent"
                onClick={() =>
                  navigate(`/app/company-detail/${company._id}`, {
                    state: { companyData: company },
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
  );
};

export default CompanyManagementTable;
