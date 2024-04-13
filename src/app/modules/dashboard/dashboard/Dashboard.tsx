import React from "react";
import DashboardCard from "./partials/DashboardCard";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
      <div className="flex justify-center mt-6">
        <a href="/anasayfa/components" className="bg-gray-100 p-2 mb-12">
          View Components
        </a>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
