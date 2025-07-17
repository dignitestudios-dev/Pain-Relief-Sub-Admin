/* eslint-disable react/prop-types */

import { ChartImg } from "../../../../assets/export";

export default function Stats({ totalCount }) {
  console.log("🚀 ~ Stats ~ totalCount:", totalCount);
  const StatsData = [
    {
      title: "Total Members",
      value: totalCount?.userCount,
    },
    {
      title: "Total Network Provider",
      value: totalCount?.providerCount,
    },
    {
      title: "Total Appointment",
      value: totalCount?.appointmentCount,
    },
    {
      title: "Total Referral",
      value: totalCount?.referralCount,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 mt-5  items-center">
      {StatsData?.map((item, i) => (
        <div
          key={i}
          className="bg-[#FAFAFA] rounded-[20px] p-3 py-5 justify-between flex items-end"
        >
          <div>
            <span className="font-[500] text-[16px] text-[#565656] ">
              {item?.title}
            </span>
            <h3 className="font-[600] text-[24px] text-[#212121] ">
              {item?.value}
            </h3>
          </div>
          <div>
            <img src={ChartImg} className="w-[80px]" alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}
