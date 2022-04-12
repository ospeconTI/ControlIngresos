import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goNext, goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { CAMERA, LOGO } from "../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const USUARIO = "autorizacion.loginTimeStamp";

export class splashScreen extends connect(store, MEDIA_CHANGE, SCREEN, USUARIO)(LitElement) {
    constructor() {
        super();
        this.hidden = true;
        this.area = "body";
        this.timeOut = 0;
    }

    static get styles() {
        return css`
            :host {
                display: grid;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0rem;
                left: 0rem;
                height: 100%;
                width: 100%;
                background-image: linear-gradient(var(--primary-color), #455879);
                /*background-image: linear-gradient(var(--color-azul-oscuro), var(--primary-color));*/
                /*background-color: var(--primary-color);*/
                padding: 0 !important;
            }

            :host([hidden]) {
                display: none;
            }

            #cuerpo {
                display: grid;
                height: 100%;
                width: 100vw;
                display: grid;
                place-content: center;
                justify-items: center;
            }

            #imagen {
                width: 100%;
                height: 30vh;
            }

            #version {
                display: grid;
                position: absolute;
                top: 3vh;
                left: 3vw;
                color: var(--ligth-version);
            }
            #usuario {
                display: grid;
                position: absolute;
                top: 7vh;
                left: 3vw;
                color: var(--ligth-version);
            }
            #svgLogo {
                height: 20vh;
                width: 56vh;
            }
        `;
    }

    render() {
        return html` <div id="cuerpo" @click=${this.proximo}>
            <div id="imagen">${LOGO}</div>
            <div id="version">V${__VERSION__}</div>
            <div id="usuario" class="grid activo no-padding">${this.usuario ? this.usuario.Profiles[0].Perfil.Usuario : ""}</div>
        </div>`;
    }

    stateChanged(state, name) {
        if (name == SCREEN || name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            this.hidden = true;
            const haveBodyArea = isInLayout(state, this.area);
            const SeMuestraEnUnasDeEstasPantallas = "-splash-".indexOf("-" + state.screen.name + "-") != -1;
            if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
                this.hidden = false;
                this.timeOut = setTimeout(() => {
                    store.dispatch(goTo("registroIngreso"));
                }, 1000);
                this.update();
            }
        }
        if (name == USUARIO) {
            if (state.autorizacion.usuario.Profiles && state.autorizacion.usuario.Profiles.length != 0) {
                this.usuario = state.autorizacion.usuario;
            }
            this.update();
        }
    }

    proximo() {
        clearTimeout(this.timeOut);
        store.dispatch(goTo("registroIngreso"));
        //store.dispatch(goTo("claveRecuperar"));
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            area: {
                type: String,
            },
        };
    }
}

window.customElements.define("splash-screen", splashScreen);
