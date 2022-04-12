import { sectoresAllFetch } from "../fetchs.js";
import { GET_ALL, GET_ALL_SUCCESS, GET_ALL_ERROR } from "./actions";
import { apiRequest } from "../api/actions";
import { goTo } from "../routing/actions.js";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ALL) {
            dispatch(apiRequest(sectoresAllFetch, null, GET_ALL_SUCCESS, GET_ALL_ERROR));
            //dispatch({ type: GET_SUCCESS });
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ALL_SUCCESS) {
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ALL_ERROR) {
            dispatch(showError(action.payload.message));
        }
    };

export const middleware = [get, processGet, processError];
