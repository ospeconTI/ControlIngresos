/** @format */

import {} from "../css/main.css";
import {} from "../css/media.css";
import {} from "../css/nunito.css";
import {} from "../css/fontSizes.css";
import {} from "../css/colors.css";
import {} from "../css/shadows.css";

import { store } from "./redux/store";
import { captureMedia } from "./redux/ui/actions";
import { goTo } from "./redux/routing/actions";
import { viewManager } from "./views/manager";
import { login } from "./redux/autorizacion/actions";
import { register as registerSW, activate as activateSW } from "./libs/serviceWorker";

import { add } from "./redux/registroIngresos/actions";
import { get as getRegistroIngreso } from "./redux/registroIngresos/actions";
import { getAll as getAllLegajos } from "./redux/legajos/actions";
import { getAll as getAllSectores } from "./redux/sectores/actions";
import { getAll as getAllMovimientos } from "./redux/movimientos/actions";
import { getAll as getAllVisita } from "./redux/visita/actions";

if (process.env.NODE_ENV === "production") {
    registerSW();
    activateSW();
}

//viewMode("main");
store.dispatch(captureMedia());
//store.dispatch(goTo("splash"));

store.dispatch(getAllLegajos());
store.dispatch(getAllSectores());
//store.dispatch(getRegistroIngreso());

console.log("Sirviendo datos de :" + SERVICE_URL);
if ("credentials" in navigator) {
    navigator.credentials
        .get({ password: true, mediation: "optional" })
        .catch((err) => console.log("navigator.credentials.get: No funciona en Firefox"))
        .then((cred) => {
            if (cred) {
                store.dispatch(login(cred.id, cred.password, true));
            } else {
                store.dispatch(goTo("login"));
            }
        });
} else {
    store.dispatch(goTo("login"));
}

export default {
    login: (email, password) => {
        store.dispatch(login(email, password));
    },
    cambioClave: () => {
        store.dispatch(goTo("cambioClave"));
    },
    miembro: () => {
        store.dispatch(goTo("serMiembro"));
    },
};
