import { parteDiarioAddFectch } from "../fetchs.js";
import { ADD, ADD_SUCCESS, ADD_ERROR } from "./actions";
import { apiAdd } from "../api/actions";
import { goTo } from "../routing/actions.js";
import { store } from "../../redux/store";

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(apiAdd(parteDiarioAddFectch, action.item, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const processGet =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_SUCCESS) {
            alert("el cierre de parte diario de realizó con éxito");
            store.dispatch(goTo("login"));
        }
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD_ERROR) {
            dispatch(showError(action.payload.message));
        }
    };

export const middleware = [add, processGet];
