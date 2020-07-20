import {
  GET_COURSES,
  CREATE_COURSE,
  GET_COURSES_BY_ID,
  GET_COURSE_BY_USERID,
  GET_COURSES_DETAIL,
  EDIT_COURSE,
} from "./index";
import axios from "axios";

// Get all courses
export const getCourses = () => async (dispatch) => {
  const result = await axios.get(`/courses`);
  const courses1 = [];
  result.data.forEach((payload) => {
    courses1.push(payload);
  });
  dispatch({ type: GET_COURSES, payload: courses1 });
};

// Get all courses by uid
export const getCoursesByUserId = (parentuid) => async (dispatch) => {
  const result = await axios.get(`/courses/${parentuid}`);
  const courses = [];
  result.data.forEach((payload) => {
    courses.push(payload);
  });
  dispatch({ type: GET_COURSE_BY_USERID, payload: courses });
};

// Create a course
export const createCourses = (postData) => async (dispatch) => {
  const courses = [];
  fetch("/courses/create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => courses.push(res))
    .then(
      dispatch({
        type: CREATE_COURSE,
        payload: courses,
      })
    );
};

// Get a courses by id
export const getCourseById = (parentuid, cclass, sem) => async (dispatch) => {
  const result = await axios.get(`/courses/${parentuid}/${cclass}/${sem}`);
  const courses = [];
  result.data.forEach((payload) => {
    courses.push(payload);
  });
  dispatch({ type: GET_COURSES_BY_ID, payload: courses });
};

export const getCoursesDetail = (id) => async (dispatch) => {
  const result = await axios.get(`/courses/detail/${id}`);
  const detailcourses = [];
  result.data.forEach((payload) => {
    detailcourses.push(payload);
  });
  dispatch({ type: GET_COURSES_DETAIL, payload: detailcourses });
};

// Edit a school
export const editCourse = (data) => async (dispatch) => {
  const courses = [];
  await axios
    .put(`/courses/edit/${data.v_course_id}`, data)
    .then((res) => courses.push(res))
    .then(
      dispatch({
        type: EDIT_COURSE,
        payload: courses,
      })
    );
};
