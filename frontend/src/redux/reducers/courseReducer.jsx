import {
  GET_COURSES,
  CREATE_COURSE,
  GET_COURSES_BY_ID,
  GET_COURSE_BY_USERID,
  EDIT_COURSE,
} from "../actions/index";

const courseReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_COURSES:
      return payload;
    case GET_COURSES_BY_ID:
      return payload;
    case GET_COURSE_BY_USERID:
      return payload;
    case CREATE_COURSE:
      return payload;
    case EDIT_COURSE:
      return payload;
    default:
      return state;
  }
};
export default courseReducer;
