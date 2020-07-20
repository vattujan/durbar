import { SET_USER, GET_USER } from "../actions/index";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
