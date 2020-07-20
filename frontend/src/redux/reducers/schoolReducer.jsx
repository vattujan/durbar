import {
  GET_SCHOOLS,
  DELETE_SCHOOL,
  CREATE_SCHOOL,
  EDIT_SCHOOL,
} from "../actions/index";

const schoolReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_SCHOOLS:
      return payload;
    case CREATE_SCHOOL:
      return payload;
    case EDIT_SCHOOL:
      return payload;
    case DELETE_SCHOOL:
      return state.filter((s) => s.school_id !== payload);
    default:
      return state;
  }
};
export default schoolReducer;
