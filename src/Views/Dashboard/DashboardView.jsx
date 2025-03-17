import React from "react";
import DashboardContent from "../../components/Dashboard/DashboardContent.jsx";
import Sidebar from "../../Components/Navigation/Sidebar";

const DashboardView = () => {
  return (
    <div>
      <DashboardContent />
      <Sidebar/>
    </div>
  );
};

export default DashboardView;