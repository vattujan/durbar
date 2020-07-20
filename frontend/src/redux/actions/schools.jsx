import {
  GET_SCHOOLS,
  DELETE_SCHOOL,
  CREATE_SCHOOL,
  GET_SCHOOL_BY_ID,
  EDIT_SCHOOL,
} from "./index";
import axios from "axios";
import { CREATE_SCHOOLS } from "../../constants/routes";

// Get all schools
export const getSchools = () => async (dispatch) => {
  try {
    const result = await axios.get("/schools");
    const schools = [];
    result.data.forEach((payload) => {
      schools.push(payload);
    });
    dispatch({ type: GET_SCHOOLS, payload: schools });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Create a school
export const createSchool = (postData) => async (dispatch) => {
  const schools = [];
  fetch(CREATE_SCHOOLS, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => schools.push(res))
    .then(
      dispatch({
        type: CREATE_SCHOOL,
        payload: schools,
      })
    );
};

// Get a schools by id
export const getSchoolById = (schools_id) => async (dispatch) => {
  const result = await axios.get(`/schools/${schools_id}`);
  const schools = [];
  result.data.forEach((payload) => {
    schools.push(payload);
  });
  dispatch({ type: GET_SCHOOL_BY_ID, payload: schools });
};

// Edit a school
export const editSchool = (data) => async (dispatch) => {
  const schools = [];
  await axios
    .put(`/schools/edit/${data.id}`, data)
    .then((res) => schools.push(res))
    .then(
      dispatch({
        type: EDIT_SCHOOL,
        payload: schools,
      })
    );
};

// Delete a schools
export const deleteSchools = (school_id) => async (dispatch) => {
  await axios
    .delete(`/schools/delete/${school_id}`)
    .then((res) => res)
    .then(
      dispatch({
        type: DELETE_SCHOOL,
        payload: school_id,
      })
    );
};
