import React from "react";
import Header from "../components/Header"


const Dashboard = ({ children }) => (
  <React.Fragment>
    <Header />
    <div className="container">
      {children}
    </div>
  </React.Fragment>
);

export default Dashboard;
