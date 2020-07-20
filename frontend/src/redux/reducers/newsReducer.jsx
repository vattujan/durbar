import { GET_NEWS, DELETE_NEWS, CREATE_NEWS, GET_NEWS_BY_ID } from "../actions/index";

const newsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_NEWS:
      return payload;
    case GET_NEWS_BY_ID:
      return payload;
    case CREATE_NEWS:
      return payload;
    case DELETE_NEWS:
      return state.filter((s) => s.project_id !== payload);
    default:
      return state;
  }
};
export default newsReducer;
