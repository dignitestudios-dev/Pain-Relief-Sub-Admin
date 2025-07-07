import React from "react";
import { medical } from "../../../../assets/export";

const MedicalLicense = () => {
  return (
    <div className="bg-[#FAFAFA] p-6 rounded-md text-sm space-y-6">
      <div className="space-y-4">
        <h2 className="text-[24px] border-b pb-3 font-[600] ">
          Medical License
        </h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 md:grid-cols-3 ">
          {[1, 2, 3, 4, 5, 6, 7]?.map((item) => (
            <img src={medical} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalLicense;
