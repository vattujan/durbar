import * as actionTypes from "./index";
import firebase from "../../firebase";

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const getUser = () => (dispatch) => {
  var currentUser = {};
  firebase.auth().onAuthStateChanged((user) => {
    if (user && user.uid) {
      currentUser = user;
      dispatch({ type: actionTypes.GET_USER, payload: currentUser });
    } else {
      dispatch({ type: actionTypes.GET_USER, payload: {} });
    }
  });
};
