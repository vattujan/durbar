import {
  GET_CHAPTERS,
  GET_CHAPTER_BY_ID,
  CREATE_CHAPTER,
  EDIT_CHAPTER,
} from "./index";
import axios from "axios";

// Get all chapters by course id
export const getChaptersByCourseId = (id) => async (dispatch) => {
  const result = await axios.get(`/chapters/${id}`);
  const chapters = [];
  result.data.forEach((payload) => {
    chapters.push(payload);
  });
  dispatch({ type: GET_CHAPTERS, payload: chapters });
};

// Create a chapter
export const createChapter = (postData) => async (dispatch) => {
  const chapters = [];
  let id = postData.get("v_course_id");
  fetch(`/chapters/create/${id}`, {
    method: "POST",
    body: postData,
  })
    .then((res) => chapters.push(res))
    .then(
      dispatch({
        type: CREATE_CHAPTER,
        payload: chapters,
      })
    );
};

// Edit a chapter
export const editChapter = (data) => async (dispatch) => {
  const chapters = [];
  await fetch(`/chapters/edit/${data.get("v_chapter_id")}`, {
    method: "PUT",
    body: data,
  })
    .then((res) => chapters.push(res))
    .then(
      dispatch({
        type: EDIT_CHAPTER,
        payload: chapters,
      })
    );
};

// Get chapter by id
export const getChapterById = (id) => async (dispatch) => {
  const result = await axios.get(`/chapters/detail/${id}`);
  const chapters = [];
  result.data.forEach((payload) => {
    chapters.push(payload);
  });
  dispatch({ type: GET_CHAPTER_BY_ID, payload: chapters });
};
