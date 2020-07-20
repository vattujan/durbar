import { GET_STUDENTS, DELETE_STUDENT, GET_STUDENT_BY_ID } from "./index";
import axios from "axios";

// Get all students
export const getStudents = () => async (dispatch) => {
  const result = await axios.get("/students");
  const students = [];
  result.data.forEach((payload) => {
    students.push(payload);
  });
  dispatch({ type: GET_STUDENTS, payload: students });
};

// Create a student
export const createStudent = (data) => async (dispatch) => {
  const students = [];
  await axios
    .post("/students/create", data)
    .then((res) => students.push(res))
    .then(
      dispatch({
        type: GET_STUDENTS,
        payload: students,
      })
    );
};

// Get a students by id
export const getStudentById = (student_id) => async (dispatch) => {
  const result = await axios.get(`/students/${student_id}`);
  const students = [];
  result.data.forEach((payload) => {
    students.push(payload);
  });
  dispatch({ type: GET_STUDENT_BY_ID, payload: students });
};

// Delete a students
export const deleteStudent = (student_id) => async (dispatch) => {
  await axios
    .delete(`/students/delete/${student_id}`)
    .then((res) => res)
    .then(
      dispatch({
        type: DELETE_STUDENT,
        payload: student_id,
      })
    );
};
