/* eslint-disable react/prop-types */
// import { medical } from "../../../../assets/export";

const MedicalLicense = ({ provider }) => {
  return (
    <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-6">
      <div className="space-y-4">
        <h2 className="text-[24px] border-b pb-3 font-[600] ">
          Medical License
        </h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 md:grid-cols-3 ">
          {provider?.documents?.map((item, index) => (
            <img key={index} src={item} alt="image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalLicense;
