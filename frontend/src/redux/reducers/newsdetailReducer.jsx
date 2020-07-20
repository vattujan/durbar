import {  GET_NEWS_DETAIL } from "../actions/index";

const newsdetailReducer = (state = [], { type, payload }) => {
    switch (type) {
        case  GET_NEWS_DETAIL:
            return payload;
        default:
            return state;
    }
};
export default newsdetailReducer;
