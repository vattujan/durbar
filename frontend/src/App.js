import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import './App.scss';
import Home from './components/home';
import PageNotFound from './components/404';
import Navbar from './components/NavBar';
import StudentDashboard from './components/dashboard/StudentDashboard';
import CreateSchool from './components/school/createSchool';
import CreateNews from './components/news/createnews';
import Createrecords from './components/records/createrecords';
import CreateCourses from './components/courses/createcourses';
import CreateChapter from './components/chapters/createChapter';
import CreateTutorials from './components/tutorials/createtutorials';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AdminRoute from './components/Auth/AdminRoute';
import SchoolRoute from './components/Auth/SchoolRoute';
import StudentRoute from './components/Auth/StudentRoute';
import NewsDetailRoute from './components/Auth/NewsDetailRoute';
import ContactUs from './components/contactUs/contactus';
import LoggedInRoute from './components/Auth/LoggedInRoute';
import NotLoggedInRoute from './components/Auth/NotLoggedInRoute';
import SchoolDashboard from './components/dashboard/SchoolDashboard';
import Login from './components/Auth/Login';
import { LANDING, REGISTER_SCHOOL, LOGIN, STUDENT_BOARD, CONTACTUS, USERGUIDE, RECORDS, TUTORIALS, CREATE_TUTORIALS, COURSES, STAFFS, EDIT_CHAPTER, SCHOOL_BOARD, ADMIN_BOARD, CREATE_NEWS, CREATE_RECORDS, PAGE_NOT_FOUND, NEWS_DETAILS, COURSES_DETAILS, CREATE_CHAPTER, CREATE_COURSES, CREATE_SCHOOLS, EDIT_COURSE } from './constants/routes';
import Newsdetail from './components/news/newsdetail';
import Coursesdetail from './components/courses/coursesdetail';
import SideBar from "./components/component/sideBar";
import { Container } from 'react-bootstrap';
import Register from './components/Auth/Register';
import Records from './components/records/records';
import Courses from './components/courses/courses';
import { getUser } from './redux/actions/user';
import firebase from './firebase';
import Tutorials from './components/tutorials/tutorials';
import { toast } from 'react-toastify';
import { setLanguage } from "redux-i18n";
import { getCourseById, getCoursesByUserId } from './redux/actions/courses';
import EditCourse from './components/courses/editcourse';
import EditChapter from './components/chapters/editchapter';
import CreateStaffs from './components/staffs/createStaffs';
import Userguide from './components/component/userguide';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      parentUID: localStorage.getItem("parentUID"),
      userId: localStorage.getItem("currentUserUID")
    }

  }

  componentDidMount() {
    this.props.getUser();
    if (localStorage.getItem('setLang')) {
      if (localStorage.getItem('setLang') === 'en') {
        this.props.setLanguage('en');
      } else if (localStorage.getItem('setLang') === 'np') {
        this.props.setLanguage('np');
      }
    }
  }
  componentDidUpdate(prevState) {
    if (prevState.parentUID !== this.state.parentUID && prevState.userId !== this.state.userId) {
      let parentUID = localStorage.getItem("parentUID");
      let userID = localStorage.getItem("currentUserUID");
      let userRole = localStorage.getItem("currentUserRole");
      if (userID) {
        firebase
          .database()
          .ref("/users/" + userID)
          .on("value", (snapshot) => {
            var cclass = snapshot.val().studentClass;
            var sem = snapshot.val().semester;
            if (sem && cclass) {
              this.props.getCourseById(parentUID, cclass, sem);

            } else if (userRole === "School") {
              this.props.getCoursesByUserId(userID);
            }
          });
      }
    }
  }

  onChangeLang = (e) => {
    this.props.setLanguage(e.target.value);
    localStorage.setItem('setLang', e.target.value)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && nextProps.currentUser.length !== 0 && this.props.currentUser.length === 0) {
      this.props.getUser(nextProps.currentUser);
      this.setState({ currentUser: nextProps.currentUser })
    }
    this.setState({ isLoggedIn: localStorage.getItem("currentUserUID") });

  }

  handleSignout = () => {
    if (window.confirm("Do you really want to logout?") === true) {
      firebase.auth().signOut();
      localStorage.removeItem('currentUserUID');
      localStorage.removeItem('parentUID');
      localStorage.removeItem('currentUserRole');
      localStorage.removeItem('student_id');
      toast.success(
        `Successfully Logged out`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        }
      );
      this.props.history.push(LANDING);
    }
  };

  render() {
    const currentUser = Object.keys(this.props.currentUser).length === 0 &&
      this.props.currentUser.constructor === Object;
    return (
      <>
        <Router>
          <Navbar onChangeLang={this.onChangeLang} user={this.props.currentUser} handleSignout={this.handleSignout} />
          <Container fluid style={{ marginTop: "54px" }}>
            <SideBar isLoggedIn={currentUser ? "d-none" : ""} />
            <div className={`${!currentUser ? "content-wrapper" : ""}`}>
              <Switch>
                <Route path={LANDING} component={Home} exact />
                <Route path={USERGUIDE} component={Userguide} exact />
                <NotLoggedInRoute path={CREATE_SCHOOLS} component={CreateSchool} exact />
                <NotLoggedInRoute path={CONTACTUS} component={ContactUs} exact />
                <NotLoggedInRoute path={LOGIN} component={Login} exact user={this.props.currentUser} />
                <StudentRoute path={RECORDS} component={Records} exact />
                <SchoolRoute path={STAFFS} component={CreateStaffs} exact />
                <StudentRoute path={TUTORIALS} component={Tutorials} exact />
                <LoggedInRoute path={CREATE_NEWS} component={CreateNews} exact />
                <SchoolRoute path={CREATE_RECORDS} component={Createrecords} exact />
                <SchoolRoute path={CREATE_COURSES} component={CreateCourses} exact />
                <LoggedInRoute path={COURSES} component={Courses} exact />
                <SchoolRoute path={CREATE_CHAPTER} component={CreateChapter} exact />
                <SchoolRoute path={EDIT_COURSE} component={EditCourse} exact />
                <SchoolRoute path={EDIT_CHAPTER} component={EditChapter} exact />
                <SchoolRoute path={CREATE_TUTORIALS} component={CreateTutorials} exact />
                <LoggedInRoute path={REGISTER_SCHOOL} component={Register} exact />
                <NewsDetailRoute path={NEWS_DETAILS} component={Newsdetail} exact />
                <LoggedInRoute path={COURSES_DETAILS} component={Coursesdetail} exact />
                <AdminRoute path={ADMIN_BOARD} component={AdminDashboard} exact user={this.props.currentUser} />
                <SchoolRoute path={SCHOOL_BOARD} component={SchoolDashboard} exact />
                <StudentRoute path={STUDENT_BOARD} component={StudentDashboard} exact />
                <Route path={PAGE_NOT_FOUND} component={PageNotFound} />
              </Switch>
            </div>
          </Container>
        </Router>
      </>
    );
  }
}

App.contextTypes = {
  t: PropTypes.func
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  lang: state.i18nState.lang,
  courses: state.courses
});
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  setLanguage: (lang) => dispatch(setLanguage(lang)),
  getCourseById: (parentUID, cclass, sem) =>
    dispatch(getCourseById(parentUID, cclass, sem)),
  getCoursesByUserId: (useruid) =>
    dispatch(getCoursesByUserId(useruid))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
