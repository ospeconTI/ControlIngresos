import { movimientosAllFectch, setEntradaFetch, getVisitaSinSalidaFetch, setSalidaFetch, getEntreFechasFeth, getByDocumentoFetch, getByVisitaIdFetch } from "../fetchs.js";
import {
    GET_ALL,
    GET_ALL_SUCCESS,
    GET_ALL_ERROR,
    GET_SIN_SALIDA,
    GET_SIN_SALIDA_SUCCESS,
    GET_SIN_SALIDA_ERROR,
    GET_ENTRE_FECHAS,
    GET_ENTRE_FECHAS_SUCCESS,
    GET_ENTRE_FECHAS_ERROR,
    GET_BY_DNI,
    GET_BY_DNI_SUCCESS,
    GET_BY_DNI_ERROR,
    GET_VISITA_BY_ID,
    GET_VISITA_BY_ID_SUCCESS,
    GET_VISITA_BY_ID_ERROR,
    SET_ENTRADA,
    SET_ENTRADA_SUCCESS,
    SET_ENTRADA_ERROR,
    SET_SALIDA,
    SET_SALIDA_SUCCESS,
    SET_SALIDA_ERROR,
} from "./actions";
import { store } from "../../redux/store";
import { apiRequest, apiAdd } from "../api/actions";
import { goTo } from "../routing/actions.js";
import { getVisitaSinSalida } from "./actions";

export const get =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ALL) {
            dispatch(apiRequest(movimientosAllFectch, null, GET_ALL_SUCCESS, GET_ALL_ERROR));
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

export const getSinSalida =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_SIN_SALIDA) {
            dispatch(apiRequest(getVisitaSinSalidaFetch, null, GET_SIN_SALIDA_SUCCESS, GET_SIN_SALIDA_ERROR));
            //dispatch({ type: GET_SUCCESS });
        }
    };

export const setEntrada =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SET_ENTRADA) {
            dispatch(apiAdd(setEntradaFetch, action.item, SET_ENTRADA_SUCCESS, SET_ENTRADA_ERROR));
        }
    };

export const setEntradaSuccess =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SET_ENTRADA_SUCCESS) {
            //console.log(store.getState().legajos.entities.find((legajo) => legajo.id === action.payload.receive.idLegajo));
            //console.log(store.getState().sectores.entities.find((sector) => sector.id === action.payload.receive.idSector));
            var body = action.payload.receive;
            let sector = store.getState().sectores.entities.find((sector) => sector.id === body.idSector);
            let legajo = store.getState().legajos.entities.find((legajo) => legajo.id === body.idLegajo);

            body.sector = sector.descripcion;
            body.legajo = legajo.apellido + " " + legajo.nombre;

            fetch("http://localhost:9000/", {
                method: "POST",
                body: JSON.stringify(body),
            });

            alert("La visita se registro correctamente");
        }
    };

export const setSalida =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SET_SALIDA) {
            dispatch(apiAdd(setSalidaFetch, action.item, SET_SALIDA_SUCCESS, SET_SALIDA_ERROR));
        }
    };

export const setSalidaSuccess =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === SET_SALIDA_SUCCESS) {
            dispatch(getVisitaSinSalida());
        }
    };

export const getEntreFechas =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_ENTRE_FECHAS) {
            dispatch(apiRequest(getEntreFechasFeth, action.desde + "/" + action.hasta, GET_ENTRE_FECHAS_SUCCESS, GET_ENTRE_FECHAS_ERROR));
        }
    };

export const getByDocumento =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_BY_DNI) {
            dispatch(apiRequest(getByDocumentoFetch, action.documento, GET_BY_DNI_SUCCESS, GET_BY_DNI_ERROR));
        }
    };

export const getVisitaById =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === GET_VISITA_BY_ID) {
            dispatch(apiRequest(getByVisitaIdFetch, action.id, GET_VISITA_BY_ID_SUCCESS, GET_VISITA_BY_ID_ERROR));
        }
    };

export const middleware = [get, processGet, processError, getSinSalida, getEntreFechas, getByDocumento, setEntrada, setSalida, setSalidaSuccess, getVisitaById, setEntradaSuccess];
