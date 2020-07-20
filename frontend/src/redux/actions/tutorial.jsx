import { GET_TUTORIALS, CREATE_TUTORIAL, GET_TUTORIAL_BY_ID } from "./index";
import axios from "axios";

// Get all tutorials
export const getTutorials = () => async (dispatch) => {
  const result = await axios.get("/tutorials");
  const tutorials = [];
  result.data.forEach((payload) => {
    tutorials.push(payload);
  });
  dispatch({ type: GET_TUTORIALS, payload: tutorials });
};

// Create a Tutorial
export const createTutorials = (data) => async (dispatch) => {
  const tutorials = [];
  fetch("/tutorials/create", {
    method: "POST",
    body: data,
  })
    .then((res) => tutorials.push(res))
    .then(
      dispatch({
        type: CREATE_TUTORIAL,
        payload: tutorials,
      })
    );
};

// Get a tutorial by id
export const getTutorialById = (id) => async (dispatch) => {
  const result = await axios.get(`/tutorials/${id}`);
  const tutorials = [];
  result.data.forEach((payload) => {
    tutorials.push(payload);
  });
  dispatch({ type: GET_TUTORIAL_BY_ID, payload: tutorials });
};
