import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import schoolReducer from "./schoolReducer";
import userReducer from "./userReducer";
import studentReducer from "./studentReducer";
import coursedetailReducer from "./detailcourse";
import courseReducer from "./courseReducer";
import tutorialReducer from "./tutorialsReducer";
import { i18nState } from "redux-i18n";
import npcoronaReducer from "./coronacases";
import wpcoronaReducer from "./wpcoronareducer";
import newsdetailReducer from './newsdetailReducer';
import chaptersReducer from "./chaptersReducer";

export default combineReducers({
  news: newsReducer,
  schools: schoolReducer,
  user: userReducer,
  currentUser: userReducer,
  students: studentReducer,
  detailcourses: coursedetailReducer,
  newsdetail: newsdetailReducer,
  courses: courseReducer,
  chapters: chaptersReducer,
  tutorials: tutorialReducer,
  covid: npcoronaReducer,
  wpcovid: wpcoronaReducer,
  i18nState,
});
