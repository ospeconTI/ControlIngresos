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
    GET_BY_DNI_SUCCESS,
    GET_BY_DNI_ERROR,
    GET_VISITA_BY_ID,
    GET_VISITA_BY_ID_SUCCESS,
    GET_VISITA_BY_ID_ERROR,
    SET_ENTRADA_SUCCESS,
    SET_ENTRADA_ERROR,
    SET_SALIDA,
    SET_SALIDA_SUCCESS,
    SET_SALIDA_ERROR,
} from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
    visitasSinSalida: [],
    getVisitaSinSalidaTimeStamp: null,
    getVisitaSinSalidaTimeStampError: null,
    movimientosEntreFechas: [],
    getEntreFechasTimpestamp: null,
    getEntreFechasTimpestampError: null,
    movimientosByDni: [],
    getMovimientosByDniTimeStamp: null,
    getMovimientosByDniTimeStampError: null,
    visitasById: [],
    getVisitasByIdTimeStamp: null,
    getVisitaByIdTimeStampError: null,
    setEntradaTimeStamp: null,
    setEntradaTimeStampError: null,
    setSalidaTimeStamp: null,
    setSalidaTimeStampError: null,
    setSalidaTimeStamp: null,
    setSalidaTimeStampError: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET_ALL:
            newState.options = action.options;
            //newState.entities = action.payload.receive;
            break;
        case GET_ALL_SUCCESS:
            newState.entities = action.payload.receive;
            newState.timeStamp = new Date().getTime();
            break;
        case GET_ALL_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case GET_SIN_SALIDA:
            newState.options = action.options;
            //newState.entities = action.payload.receive;
            break;
        case GET_SIN_SALIDA_SUCCESS:
            newState.visitasSinSalida = action.payload.receive;
            newState.getVisitaSinSalidaTimeStamp = new Date().getTime();
            break;
        case GET_SIN_SALIDA_ERROR:
            newState.getVisitaSinSalidaTimeStampError = new Date().getTime();
            break;
        case GET_ENTRE_FECHAS_SUCCESS:
            newState.getEntreFechasTimpestamp = new Date().getTime();
            newState.movimientosEntreFechas = action.payload.receive;
            break;
        case GET_ENTRE_FECHAS_ERROR:
            newState.getEntreFechasTimpestampError = new Date().getTime();
            break;
        case GET_BY_DNI_SUCCESS:
            newState.getMovimientosByDniTimeStamp = new Date().getTime();
            newState.movimientosByDni = action.payload.receive;
            break;
        case GET_BY_DNI_ERROR:
            newState.getMovimientosByDniTimeStampError = new Date().getTime();
            break;
        case GET_VISITA_BY_ID_SUCCESS:
            newState.visitasById = action.payload.receive;
            newState.getVisitasByIdTimeStamp = new Date().getTime();
            break;
        case GET_VISITA_BY_ID_SUCCESS:
            newStae.getVisitaByIdTimeStampError = new Date().getTime();
            break;
        case SET_ENTRADA_SUCCESS:
            newState.setEntradaTimeStamp = new Date().getTime();
            break;
        case SET_ENTRADA_ERROR:
            newState.setEntradaTimeStampError = new Date().getTime();
            break;
        case SET_SALIDA_SUCCESS:
            newState.setSalidaTimeStamp = new Date().getTime();
            break;
        case SET_SALIDA_ERROR:
            newState.setSalidaTimeStampError = new Date().getTime();
            break;
    }
    return newState;
};
