import { GET_COURSES_DETAIL } from "../actions/index";

const coursedetailReducer = (state = [], { type, payload }) => {
    switch (type) {
        case GET_COURSES_DETAIL:
            return payload;
        default:
            return state;
    }
};
export default coursedetailReducer;
