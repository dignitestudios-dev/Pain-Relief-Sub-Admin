/* eslint-disable react/prop-types */

const CompanyBasiInfo = ({ companyData }) => {
  return (
    <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-6">
      <p className="text-[24px] font-[600] ">Employee Details</p>
      <span className="w-full border border-b flex"></span>
      <InfoRow label="Full Name" value={companyData?.name} />
      <InfoRow label="Email Address" value={companyData?.email} />
      {/* <InfoRow label="Mobile Number" value={companyData?.email} /> */}
      <InfoRow
        label="Subscription Plan"
        value={companyData?.subscriptionPlan?.name}
      />
      <InfoRow
        label="Plan Category"
        value={companyData.subscriptionPrice?.billingPeriod}
      />
      <InfoRow
        label="Subscription Type"
        value={companyData?.subscriptionPrice?.planType}
      />
      <InfoRow label="Cost Per Employee" value={companyData?.costPerEmployee} />
    </div>
  );
};
const InfoRow = ({ label, value, multi, last }) => (
  <div className={`py-2 ${!last ? "border-b border-gray-300" : ""}`}>
    <p className="text-[#565656] text-[14px] font-[500] mb-1 ">{label}</p>
    <p
      className={`text-black font-[500] text-[16px] capitalize ${
        multi ? "whitespace-pre-line" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
export default CompanyBasiInfo;
