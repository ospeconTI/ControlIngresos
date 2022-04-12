import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    ADD_SUCCESS,
    UPDATE_FIELD,
    UPDATE_FIELD_SUCCESS,
    UPDATE_FIELD_ERROR,
    DELETE,
    DELETE_ERROR,
    DELETE_SUCCESS,
    AGREGAR_IMAGEN,
    AGREGAR_IMAGEN_SUCCESS,
} from "./actions";
import { store } from "../store";

const initialState = {
    entities: [],
    timeStamp: null,
    errorTimeStamp: null,
    options: null,
    mesanjeError: null,
    agregarImagenTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state,
    };
    switch (action.type) {
        case GET:
            newState.options = action.options;
            //newState.entities = action.payload.receive;
            break;
        case GET_SUCCESS:
            //newState.entities = action.payload.receive;
            newState.entities = [
                {
                    dni: 35947760,
                    sexo: "F",
                    nombre: "Florencia",
                    apellido: "Peñaranda",
                    ingreso: "2021-11-25",
                },
                {
                    dni: 30556789,
                    sexo: "M",
                    nombre: "Jorge",
                    apellido: "Perez",
                    ingreso: "2021-11-25",
                },
                {
                    dni: 15889746,
                    sexo: "M",
                    nombre: "Juan",
                    apellido: "Rodriguez",
                    ingreso: "2021-11-25",
                },
                {
                    dni: 17885689,
                    sexo: "M",
                    nombre: "Roberto",
                    apellido: "Lopez",
                    ingreso: "2021-11-25",
                },
                {
                    dni: 36974115,
                    sexo: "F",
                    nombre: "Lucia",
                    apellido: "Garcia",
                    ingreso: "2021-11-25",
                },
            ];
            newState.timeStamp = new Date().getTime();
            break;
        case GET_ERROR:
            newState.errorTimeStamp = new Date().getTime();
            break;
        case DELETE:
            newState.entities = newState.entities.filter((item) => item.dni != action.id);
            newState.timeStamp = new Date().getTime();
            break;
        case AGREGAR_IMAGEN_SUCCESS:
            newState.agregarImagenTimeStamp = new Date().getTime();
            break;
    }
    return newState;
};
