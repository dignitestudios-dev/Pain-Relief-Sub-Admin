import { useState } from "react";
import ReferralBarChart from "../../../components/app/AdminDashboard/Dashboard/BarGraph";
import SubscriptionSalesChart from "../../../components/app/AdminDashboard/Dashboard/LineGraph";
import Stats from "../../../components/app/AdminDashboard/Dashboard/Stats";
import { useFetchData } from "../../../hooks/api/Get";

const AdminDashboard = () => {
  const [year, setYear] = useState(new Date());

  const { data, loading } = useFetchData(
    `/admin/subscription-overview`,
    { year: year?.getFullYear() },
    1
  );

  const { data: referralCount, loading: loader } = useFetchData(
    `/admin/referal-overview`,
    { year: year?.getFullYear() },
    1
  );

  const { data: totalCount, loading: loadit } = useFetchData(
    `/admin/total-dashboard-count`,
    {},
    1
  );
  console.log("🚀 ~ AdminDashboard ~ loadit:", loadit);
  console.log("🚀 ~ AdminDashboard ~ totalCount:", totalCount);

  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px" }}
      className="p-6 bg-white rounded-lg "
    >
      <div>
        <span className="font-[500] text-[16px] text-[#565656] ">
          Hello John Doe,
        </span>
        <h3 className="text-[#212121] text-[32px] font-[600] ">
          Welcome to Pain Relief!
        </h3>
      </div>
      <Stats totalCount={totalCount} />
      {loading ? (
        <div className="bg-[#FAFAFA] mt-5 p-8 rounded-[16px] shadow-sm h-72">
          Loading...
        </div>
      ) : (
        <SubscriptionSalesChart
          year={year}
          setYear={setYear}
          graphData={data}
        />
      )}
      {loader ? (
        <div className="bg-[#FAFAFA] mt-5 p-8 rounded-[16px] shadow-sm h-72">
          Loading...
        </div>
      ) : (
        <ReferralBarChart data={referralCount} />
      )}
    </div>
  );
};

export default AdminDashboard;
