/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApi = SERVICE_URL + "/api/v1";

export const loginFetch = fetchFactory(LOGIN_URL, "LoginOS");

export const legajoAllFetch = fetchFactory(webApi, "Legajos/all");
export const sectoresAllFetch = fetchFactory(webApi, "Sectores/all");

export const movimientosAllFectch = fetchFactory(webApi, "Movimientos/all");
export const setEntradaFetch = fetchFactory(webApi, "Movimientos/SetEntrada");
export const getVisitaSinSalidaFetch = fetchFactory(webApi, "Movimientos/GetVisitaSinSalida");
export const setSalidaFetch = fetchFactory(webApi, "Movimientos/SetSalida");
export const getEntreFechasFeth = fetchFactory(webApi, "Movimientos/getEntreFechas");
export const getByDocumentoFetch = fetchFactory(webApi, "Movimientos/getByDocumento");
export const getByVisitaIdFetch = fetchFactory(webApi, "Movimientos/getByVisitaId");

export const visitaAllFectch = fetchFactory(webApi, "Visita/all");
export const visitaFectch = fetchFactory(webApi, "Visita");
export const visitaByDniFetch = fetchFactory(webApi, "Visita/getByDocumento");
export const visitaAddFectch = fetchFactory(webApi, "Visita/add");

export const parteDiarioAddFectch = fetchFactory(webApi, "ParteDiario/add");
