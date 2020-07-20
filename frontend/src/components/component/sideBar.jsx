import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { RightArrow, Admin } from "../../assets/icons";
import {
  REGISTER_SCHOOL,
  STUDENT_BOARD,
  SCHOOL_BOARD,
  ADMIN_BOARD,
  CREATE_NEWS,
  RECORDS,
  COURSES,
  CREATE_RECORDS,
  CREATE_TUTORIALS,
  STAFFS
} from "../../constants/routes";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentUser &&
      nextProps.currentUser.length !== 0 &&
      this.props.currentUser.length === 0
    ) {
      this.props.getUser(nextProps.currentUser);
      console.log(nextProps.currentUser);
      this.setState({ currentUser: nextProps.currentUser });
    }
    if (localStorage.getItem("currentUserRole") === "Admin") {
      var links = [
        {
          link: ADMIN_BOARD,
          icon: <Admin />,
          title: this.context.t("admin_dashboard"),
        },
        {
          link: REGISTER_SCHOOL,
          icon: <Admin />,
          title: this.context.t("add_school"),
        },
      ];
    } else if (localStorage.getItem("currentUserRole") === "School") {
      links = [
        {
          link: SCHOOL_BOARD,
          icon: <Admin />,
          title: this.context.t("school_dashboard"),
        },
        {
          link: CREATE_NEWS,
          icon: <Admin />,
          title: this.context.t("post_news"),
        },
        {
          link: CREATE_RECORDS,
          icon: <Admin />,
          title: this.context.t("add_student_record"),
        },
        {
          link: CREATE_TUTORIALS,
          icon: <Admin />,
          title: this.context.t("add_tutorial"),
        },
        {
          link: STAFFS,
          icon: <Admin />,
          title: this.context.t("add_teacher"),
        },
        {
          link: REGISTER_SCHOOL,
          icon: <Admin />,
          title: this.context.t("add_student"),
        },
        { link: COURSES, icon: <Admin />, title: this.context.t("courses") },
      ];
    } else if (localStorage.getItem("currentUserRole") === "Student") {
      links = [
        {
          link: STUDENT_BOARD,
          icon: <Admin />,
          title: this.context.t("student_dashboard"),
        },
        {
          link: RECORDS,
          icon: <Admin />,
          title: this.context.t("view_my_grades"),
        },
        { link: COURSES, icon: <Admin />, title: this.context.t("courses") },
      ];
    }
    this.setState({ links: links });
  }
  render() {
    return (
      <>
        <Nav className={`sidebar flex-column ${this.props.isLoggedIn}`}>
          {this.state.links &&
            this.state.links.map((li) => (
              <NavLink
                className="nav-link"
                key={li.link}
                to={li.link}
                activeClassName="active"
              >
                {li.icon}
                {li.title}
                <RightArrow />
              </NavLink>
            ))}
        </Nav>
      </>
    );
  }
}

SideBar.contextTypes = {
  t: PropTypes.func,
};
const mapStateToProps = (state) => ({
  courses: state.courses,
  lang: state.i18nState.lang,
});
export default withRouter(connect(mapStateToProps)(SideBar));
