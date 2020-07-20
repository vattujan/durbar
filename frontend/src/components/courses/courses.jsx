import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Tooltips from "../component/tooltip";
import { getCourseById } from "../../redux/actions/courses";
import { CREATE_COURSES } from "../../constants/routes";
import PropTypes from "prop-types";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      parentUID: "",
    };
  }
  getDetail = (id) => {
    this.props.history.push(`/courses/detail/${id}`);
  };
  render() {
    return (
      <>
        <Row>
          {localStorage.getItem("currentUserRole") === "School" && (
            <Col xs="12" className="mb-4">
              <Link to={CREATE_COURSES}>{this.context.t("add_course")}</Link>
            </Col>
          )}
          {this.props.courses.map((n) => (
            <Col className="mb-5" sm={6} md={4} key={n.course_id}>
              <Tooltips
                tooltip={n.course_title}
                link={
                  <h4
                    className="news-link mr-auto"
                    onClick={() => this.getDetail(n.course_id)}
                  >
                    {n.course_title}
                  </h4>
                }
              />
              <p>{n.course_description}</p>
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
Courses.contextTypes = {
  t: PropTypes.func,
};
const mapStateToProps = (state) => ({
  courses: state.courses,
});
const mapDispatchToProps = (dispatch) => ({
  getCourseById: (parentUID, cclass, sem) =>
    dispatch(getCourseById(parentUID, cclass, sem)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Courses)
);
