import { GET_STUDENTS, DELETE_STUDENT, CREATE_STUDENT, GET_STUDENT_BY_ID } from "../actions/index";

const studentReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_STUDENTS:
      return payload;
    case GET_STUDENT_BY_ID:
      return payload;
    case CREATE_STUDENT:
      return payload;
    case DELETE_STUDENT:
      return state.filter((s) => s.student_id !== payload);
    default:
      return state;
  }
};
export default studentReducer;
