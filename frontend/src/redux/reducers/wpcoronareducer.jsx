import {WORLD_DATA } from "../actions/index";

const wpcoronaReducer = (state = [], { type, payload }) => {
    switch (type) {
        case WORLD_DATA:
            return payload;
        default:
            return state;
    }
};
export default wpcoronaReducer;