/* eslint-disable react/prop-types */

const EmployeeBasicInfo = ({ employeeData }) => {
  return (
    <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-6">
      <p className="text-[24px] font-[600] ">Employee Details</p>
      <span className="w-full border border-b flex"></span>
      <InfoRow
        label="Full Name"
        value={employeeData.firstName + employeeData.lastName}
      />
      <InfoRow label="Email Address" value={employeeData.email} />
      <InfoRow label="Mobile Number" value={employeeData.phone} />
      {/* <InfoRow label="Age" value={employeeData.age + "yrs old"} /> */}
      {/* <InfoRow label="Number of Employees" value={"15"} />
      <InfoRow label="Gender" value={employeeData.gender || "--"} />
      <InfoRow label="Location" value={employeeData.location || "--"} multi /> */}
      <div>
        <p className="font-medium mb-1">Description</p>
        <p className="text-gray-600 whitespace-pre-line">
          {employeeData.description}
        </p>
      </div>
    </div>
  );
};

export default EmployeeBasicInfo;
const InfoRow = ({ label, value, multi, last }) => (
  <div className={`py-2 ${!last ? "border-b border-gray-300" : ""}`}>
    <p className="text-[#565656] text-[14px] font-[500] mb-1">{label}</p>
    <p
      className={`text-black font-[500] text-[16px] ${
        multi ? "whitespace-pre-line" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
