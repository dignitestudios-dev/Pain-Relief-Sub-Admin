/* eslint-disable react/prop-types */

const BasicInfo = ({ provider }) => {
  console.log(provider, "provider==>");
  return (
    <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-6">
      <p className="text-[24px] font-[600] ">Clinic Profile</p>
      <span className="w-full border border-b flex"></span>
      <InfoRow label="Full Name" value={provider?.name} />
      <InfoRow label="Email Address" value={provider?.email} />
      <InfoRow label="Mobile Number" value={provider?.phone} />
      {/* <InfoRow
        label="Age"
        value={provider?.age != null ? `${provider?.age} yrs old` : "--"}
      /> */}
      {/* <InfoRow label="Gender" value={provider?.gender ?? "- -"} /> */}
      <InfoRow
        label="Location"
        value={
          Array.isArray(provider?.addresses) && provider.addresses.length > 0
            ? provider.addresses[0].address
            : "--"
        }
      />

      <div>
        <p className="font-medium mb-1">Description</p>
        <p className="text-gray-600 whitespace-pre-line">
          {provider?.description}
        </p>
      </div>
    </div>
  );
};
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
export default BasicInfo;
