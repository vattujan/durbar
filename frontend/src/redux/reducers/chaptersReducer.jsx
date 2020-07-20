import {
  GET_CHAPTERS,
  GET_CHAPTER_BY_ID,
  CREATE_CHAPTER,
  EDIT_CHAPTER,
} from "../actions/index";

const chaptersReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_CHAPTERS:
      return payload;
    case GET_CHAPTER_BY_ID:
      return payload;
    case CREATE_CHAPTER:
      return payload;
    case EDIT_CHAPTER:
      return payload;
    default:
      return state;
  }
};
export default chaptersReducer;
