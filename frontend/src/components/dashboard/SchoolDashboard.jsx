import React, { Component } from "react";
import News from "../news/news";
import MyCalendar from "../component/calender";
import { Row, Col } from "react-bootstrap";
import StatCards from "../component/stats";

class SchoolDashboard extends Component {
  render() {
    return (
      <>
        <StatCards />
        <Row>
          <Col>
            <h5>Read news</h5>
            <News />
          </Col>
          <Col xs="auto">
            <MyCalendar />
          </Col>
        </Row>
      </>
    );
  }
}
export default SchoolDashboard;
