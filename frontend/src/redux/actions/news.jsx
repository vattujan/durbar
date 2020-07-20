import {
  DELETE_NEWS,
  CREATE_NEWS,
  GET_NEWS_BY_ID,
  GET_NEWS_DETAIL,
} from "./index";
import axios from "axios";

// Get all news
// export const getNews = () => async (dispatch) => {
//   const result = await axios.get("/news");
//   const news = [];
//   result.data.forEach((payload) => {
//     news.push(payload);
//   });
//   dispatch({ type: GET_NEWS, payload: news });
// };

// Create a news
export const createNews = (postData) => async (dispatch) => {
  const news = [];
  fetch("/news/create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(postData),
  })
    .then((res) => news.push(res))
    .then(
      dispatch({
        type: CREATE_NEWS,
        payload: news,
      })
    );
};
// Get a news by id
export const getNewsById = (news_id) => async (dispatch) => {
  const result = await axios.get(`/news/${news_id}`);
  const news = [];
  result.data.forEach((payload) => {
    news.push(payload);
  });
  dispatch({ type: GET_NEWS_BY_ID, payload: news });
};
//get news Details
export const getNewsDetail = (id) => async (dispatch) => {
  const result = await axios.get(`/news/detail/${id}`);
  const newsdetail = [];
  result.data.forEach((payload) => {
    newsdetail.push(payload);
  });
  dispatch({ type: GET_NEWS_DETAIL, payload: newsdetail });
};

// Delete a news
export const deleteNews = (news_id) => async (dispatch) => {
  await axios
    .delete(`/news/delete/${news_id}`)
    .then((res) => res)
    .then(
      dispatch({
        type: DELETE_NEWS,
        payload: news_id,
      })
    );
};
