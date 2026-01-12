import DashboardCards from "@/components/admin/dashboard/DashboardCards";
const Dashboard = () => {
  
  return (
    <div className="px-5 py-5 space-y-5">
      <h1 className="text-[18px] font-semibold">Admin Dashboard</h1>
      <DashboardCards/>
    </div>
  );
};

export default Dashboard;
