import { GET_TUTORIALS, CREATE_TUTORIAL, GET_TUTORIAL_BY_ID } from "../actions/index";

const tutorialReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_TUTORIALS:
      return payload;
    case GET_TUTORIAL_BY_ID:
      return payload;
    case CREATE_TUTORIAL:
      return payload;
    default:
      return state;
  }
};
export default tutorialReducer;
