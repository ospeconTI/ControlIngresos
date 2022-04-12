/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";
import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as legajosReducer } from "./legajos/reducer";
import { reducer as sectoresReducer } from "./sectores/reducer";
import { reducer as movimientosReducer } from "./movimientos/reducer";
import { reducer as visitaReducer } from "./visita/reducer";
import { reducer as ParteDiarioReducer } from "./parteDiario/reducer";

export const rootReducer = (state = {}, action) => {
    const presentacionesEstadosRed = state.presentacionesEstados;
    return {
        api: apiReducer(state.api, action),
        ui: uiReducer(state.ui, action),
        screen: screenReducer(state.screen, action),
        routing: routingReducer(state.routing, action),
        legajos: legajosReducer(state.legajos, action),
        sectores: sectoresReducer(state.sectores, action),
        movimientos: movimientosReducer(state.movimientos, action),
        visita: visitaReducer(state.visita, action),
        autorizacion: autorizacionReducer(state.autorizacion, action),
        parteDiario: ParteDiarioReducer(state.parteDiario, action),
    };
};
