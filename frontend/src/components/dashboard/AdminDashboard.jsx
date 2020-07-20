import React, { Component } from "react";
import StatCards from "../component/stats";
import School from "../school/schools";

class AdminDashboard extends Component {
  render() {
    return (
      <>
        <StatCards />
        <School />
      </>
    );
  }
}

export default AdminDashboard;
