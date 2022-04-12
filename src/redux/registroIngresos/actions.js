export const GET = "[registroIngresos] get";
export const GET_SUCCESS = "[registroIngresos] get succes";
export const GET_ERROR = "[registroIngresos] get error";

export const ADD = "[registroIngresos] Add";
export const ADD_SUCCESS = "[registroIngresos] Add Sucess";
export const ADD_ERROR = "[registroIngresos] Add Error";

export const UPDATE_FIELD = "[controlIngresos] Update Field";
export const UPDATE_FIELD_SUCCESS = "[controlIngresos] Update Field Sucess";
export const UPDATE_FIELD_ERROR = "[controlIngresos] Update Field Error";

export const DELETE = "[controlIngresos] delete";
export const DELETE_SUCCESS = "[controlIngresos] delete succes";
export const DELETE_ERROR = "[controlIngresos] delete error";

export const AGREGAR_IMAGEN = "[registroIngresos] Agregar Imagen";
export const AGREGAR_IMAGEN_SUCCESS = "[registroIngresos] Agregar Imagen Success";

export const get = (options) => ({
    type: GET,
    options: options,
});
/* export const get = function (options) {
    return { type: GET, options: options }
}*/

export const add = (item) => ({
    type: ADD,
    item: item,
});

export const update = (id, name, value) => ({
    //clave valor de la hora de salida
    type: UPDATE_FIELD,
    id: id,
    name: name,
    value: value,
});

export const remove = (id) => ({
    type: DELETE,
    id: id,
});

export const agregarImagen = (id, nombre, imagen) => ({
    type: AGREGAR_IMAGEN,
    id: id,
    nombre: nombre,
    imagen: imagen,
});
