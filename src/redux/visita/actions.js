/** @format */

export const GET_ALL = "[visitas] get all";
export const GET_ALL_SUCCESS = "[visitas] get all succes";
export const GET_ALL_ERROR = "[visitas] get all error";

export const GET_BY_ID = "[visitas] get by id";
export const GET_BY_ID_SUCCESS = "[visitas] get by id succes";
export const GET_BY_ID_ERROR = "[visitas] get by id error";

export const ADD = "[visitas] Add";
export const ADD_SUCCESS = "[visitas] Add Sucess";
export const ADD_ERROR = "[visitas] Add Error";

export const UPDATE_FIELD = "[visitas] Update Field";
export const UPDATE_FIELD_SUCCESS = "[visitas] Update Field Sucess";
export const UPDATE_FIELD_ERROR = "[visitas] Update Field Error";

export const BUSCAR_DNI = "[visitas] buscar dni";
export const BUSCAR_DNI_SUCCESS = "[visitas] buscar dni success";
export const BUSCAR_DNI_ERROR = "[visitas] buscar dni error";

export const getAll = () => ({
    type: GET_ALL,
});
export const getById = (id) => ({
    type: GET_BY_ID,
    id: id,
});

export const add = (item) => ({
    type: ADD,
    item: item,
});

export const getByDni = (dni) => ({
    type: BUSCAR_DNI,
    dni: dni,
});

export const update = (item) => ({
    type: UPDATE_FIELD,
    item: item,
});
