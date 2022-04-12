/** @format */

import { visitaAllFectch, visitaByDniFetch, visitaAddFectch, visitaFectch } from "../fetchs.js";
import {
    GET_ALL,
    GET_ALL_SUCCESS,
    GET_ALL_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR,
    UPDATE_FIELD,
    UPDATE_FIELD_SUCCESS,
    UPDATE_FIELD_ERROR,
    BUSCAR_DNI,
    BUSCAR_DNI_SUCCESS,
    BUSCAR_DNI_ERROR,
    GET_BY_ID,
    GET_BY_ID_ERROR,
    GET_BY_ID_SUCCESS,
} from "./actions";
import { apiRequest, apiAdd, apiUpdate } from "../api/actions";
import { goTo } from "../routing/actions.js";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ALL) {
            dispatch(apiRequest(visitaAllFectch, null, GET_ALL_SUCCESS, GET_ALL_ERROR));
            //dispatch({ type: GET_SUCCESS });
        }
    };
export const getById =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_ID) {
            dispatch(apiRequest(visitaFectch, action.id, GET_BY_ID_SUCCESS, GET_BY_ID_ERROR));
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
        if ((action.type === GET_ALL_ERROR, action.type === UPDATE_FIELD_ERROR)) {
            dispatch(showError(action.payload.message));
        }
    };

export const add =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === ADD) {
            dispatch(apiAdd(visitaAddFectch, action.item, ADD_SUCCESS, ADD_ERROR));
        }
    };

export const getByDni =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === BUSCAR_DNI) {
            dispatch(apiRequest(visitaByDniFetch, action.dni, BUSCAR_DNI_SUCCESS, BUSCAR_DNI_ERROR));
        }
    };

export const updateField =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === UPDATE_FIELD) {
            const body = { dni: action.dni };
            body[action.clave] = action.valor;
            dispatch(apiUpdate(visitaByDniFetch, body, UPDATE_FIELD_SUCCESS, UPDATE_FIELD_ERROR));
        }
    };

export const middleware = [get, processGet, processError, add, updateField, getByDni, getById];
