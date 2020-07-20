import { NEPAL_DATA } from "../actions/index";

const npcoronaReducer = (state = [], { type, payload }) => {
    switch (type) {
        case NEPAL_DATA:
            return payload;
        default:
            return state;
    }
};
export default npcoronaReducer;