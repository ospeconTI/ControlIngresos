export const GET_ALL = "[movimientos] get all";
export const GET_ALL_SUCCESS = "[movimientos] get all succes";
export const GET_ALL_ERROR = "[movimientos] get all error";

export const GET_SIN_SALIDA = "[movimientos] get sin salida";
export const GET_SIN_SALIDA_SUCCESS = "[movimientos] get sin salida succes";
export const GET_SIN_SALIDA_ERROR = "[movimientos] get sin salida error";

export const GET_BY_DNI = "[movimientos] get by dni";
export const GET_BY_DNI_SUCCESS = "[movimientos] get by dni succes";
export const GET_BY_DNI_ERROR = "[movimientos] get by dni error";

export const SET_ENTRADA = "[movimientos] set entrada";
export const SET_ENTRADA_SUCCESS = "[movimientos] set entrada success";
export const SET_ENTRADA_ERROR = "[movimientos] set entrada error";

export const SET_SALIDA = "[movimientos] set salida";
export const SET_SALIDA_SUCCESS = "[movimientos] set salida success";
export const SET_SALIDA_ERROR = "[movimientos] set salida error";

export const GET_ENTRE_FECHAS = "[movimientos] get entre fechas";
export const GET_ENTRE_FECHAS_SUCCESS = "[movimientos] get entre fechas success";
export const GET_ENTRE_FECHAS_ERROR = "[movimientos] get entre fechas error";

export const GET_VISITA_BY_ID = "[movimientos] get visita by id";
export const GET_VISITA_BY_ID_SUCCESS = "[movimientos] get visita by id success";
export const GET_VISITA_BY_ID_ERROR = "[movimientos] get visita by id error";

export const getAll = () => ({
    type: GET_ALL,
});

export const getVisitaSinSalida = () => ({
    type: GET_SIN_SALIDA,
});

export const getByVisitaId = (id) => ({
    type: GET_VISITA_BY_ID,
    id: id,
});

export const setEntrada = (item) => ({
    type: SET_ENTRADA,
    item: item,
});

export const setSalida = (item) => ({
    type: SET_SALIDA,
    item: item,
});

export const getEntreFechas = (desde, hasta) => ({
    type: GET_ENTRE_FECHAS,
    desde: desde,
    hasta: hasta,
});

export const getByDocumento = (documento) => ({
    type: GET_BY_DNI,
    documento: documento,
});
