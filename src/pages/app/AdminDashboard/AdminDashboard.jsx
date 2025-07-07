import ReferralBarChart from "../../../components/app/AdminDashboard/Dashboard/BarGraph";
import SubscriptionSalesChart from "../../../components/app/AdminDashboard/Dashboard/LineGraph";
import Stats from "../../../components/app/AdminDashboard/Dashboard/Stats";

const AdminDashboard = () => {
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
      <Stats />
      <SubscriptionSalesChart />
      <ReferralBarChart />
    </div>
  );
};

export default AdminDashboard;
