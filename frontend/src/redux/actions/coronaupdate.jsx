import { NEPAL_DATA, WORLD_DATA } from "./index";

// Get Corona virus apis
var wpbaseHref = " https://coronavirus-19-api.herokuapp.com/all";
var npbaseHref = "https://coronavirus-19-api.herokuapp.com/countries/nepal"

//Get Corona Virus Cases in Nepal
export const getNepalData = () => async (dispatch) => {
    fetch(npbaseHref)
        .then(res => res.json())
        .then(covid =>
            dispatch({
                type: NEPAL_DATA,
                payload: covid
            })
        );
};
//Get Corona Virus Cases In World
export const getWorldData = () => async (dispatch) => {
    fetch(wpbaseHref)
        .then(res => res.json())
        .then(covid =>
            dispatch({
                type: WORLD_DATA,
                payload: covid
            })
        );
};