/** @format */

import {
    GET_ALL,
    GET_ALL_SUCCESS,
    GET_ALL_ERROR,
    ADD_SUCCESS,
    UPDATE_FIELD,
    UPDATE_FIELD_SUCCESS,
    UPDATE_FIELD_ERROR,
    BUSCAR_DNI_SUCCESS,
    BUSCAR_DNI_ERROR,
    GET_BY_ID_SUCCESS,
    GET_BY_ID_ERROR,
} from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    entity: null,
    entiyTimeStamp: null,
    timeStamp: null,
    errorTimeStamp: null,
    errorBody: null,
    currentVisitaTimeStamp: null,
    currentVisita: null,
    updateFieldTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET_ALL:
            newState.options = action.options;
            break;
        case GET_ALL_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_BY_ID_SUCCESS:
            newState.entity = action.payload.receive;
            newState.entityTimeStamp = new Date().getTime();
            break;
        case GET_ALL_ERROR:
        case GET_BY_ID_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case BUSCAR_DNI_SUCCESS:
            newState.currentVisitaTimeStamp = new Date().getTime();
            newState.currentVisita = action.payload.receive;
            break;
        case BUSCAR_DNI_ERROR:
            newState.errorBody = action.payload;
            if (newState.currentVisita?.id) {
                newState.currentVisita = null;
                newState.currentVisitaTimeStamp = new Date().getTime();
            }
            newState.errorTimeStamp = new Date().getTime();
            break;
        case UPDATE_FIELD_SUCCESS:
            newState.entities = newState.entities.map((visita) => {
                if (visita.documento == action.dni) {
                    const visitaAux = { ...visita };
                    visitaAux.clave = action.valor;
                    newState.updateFieldTimeStamp = new Date().getTime();
                    return visitaAux;
                }
            });
            break;
    }
    return newState;
};
