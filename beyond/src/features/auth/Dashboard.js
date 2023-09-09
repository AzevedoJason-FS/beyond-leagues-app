import { React } from "react";
import DashHeader from "../../components/DashHeader";
import Management from "../../components/Management";

const Dashboard = () => {

  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Management />
      </div>
      {/* <DashFooter /> */}
    </>
  );
};

export default Dashboard;
