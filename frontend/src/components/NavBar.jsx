import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, NavLink, withRouter } from "react-router-dom";
import { LOGIN, LANDING, CREATE_SCHOOLS, CONTACTUS } from "../constants/routes";
import { getUser } from "../redux/actions/user";

class NavBar extends Component {
  render() {
    const isLoggedIn =
      Object.keys(this.props.user).length !== 0 &&
      this.props.user.constructor !== Object;
    const languages = ["en", "np"];
    return (
      <>
        <Navbar
          className={isLoggedIn ? "p-0" : ""}
          bg="light"
          expand="lg"
          fixed="top"
        >
          <Link
            className={`navbar-brand ${isLoggedIn ? "is_logged_in" : ""}`}
            to={LANDING}
          >
            {this.context.t("durbar")}
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isLoggedIn ? (
                ""
              ) : (
                <>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to={CREATE_SCHOOLS}
                  >
                    {this.context.t("register_school")}
                  </NavLink>
                  <NavLink className="nav-link" to={CONTACTUS}>
                    {this.context.t("contact_us")}
                  </NavLink>
                </>
              )}
              <select
                value={this.props.lang}
                onChange={this.props.onChangeLang}
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {isLoggedIn ? (
                <Button
                  size="sm"
                  className="btn btn-primary ml-lg-3 mr-lg-3"
                  onClick={this.props.handleSignout}
                >
                  {this.context.t("logout")}
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="btn btn-primary ml-lg-3 mr-lg-3"
                  onClick={() => this.props.history.push(LOGIN)}
                >
                  {this.context.t("login")}
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

NavBar.contextTypes = {
  t: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  lang: state.i18nState.lang,
});
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
