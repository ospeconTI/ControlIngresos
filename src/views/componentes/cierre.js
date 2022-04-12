/** @format */

import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { BUSCAR, DELETE, SEARCH } from "../../../assets/icons/svgs";
import { LitElement, html, css } from "lit-element";
import { buscar } from "../../redux/ui/actions";
import { goTo } from "../../redux/routing/actions";

import { isInLayout } from "../../redux/screens/screenLayouts";
import { logout } from "../../redux/autorizacion/actions";
import { add as addParteDiario } from "../../redux/parteDiario/actions";

import { gridLayout } from "../css/gridLayout";
import { input } from "../css/input";
import { select } from "../css/select";
import { button } from "../css/button";
import { label } from "../css/label";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const PARTE_DIARIO = "parteDiario.timeStamp";

export class cierreComponent extends connect(store, SCREEN, MEDIA_CHANGE, PARTE_DIARIO)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.observaciones = "";
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
        };
    }

    static get styles() {
        return css`
            ${button}
            ${gridLayout}
            :host {
            }
            :host([hidden]) {
                display: none;
            }
            .body {
                background-color: var(--primary-color);
                padding: 0vh 3vw 1vh 3vw;
                height: 100%;
            }
            .cierre {
                display: grid;
                align-content: baseline;
                gap: 0.5rem;
            }
            label {
                font-family: "Nunito", sans-serif;
                color: var(--white-application-color);
                font-weight: bold;
                align-self: end;
                display: block;
                font-size: 2em;
                margin-block-start: 0.67em;
                margin-block-end: 0.67em;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
                font-weight: bold;
            }
            textarea {
                height: 10vh;
                border-radius: 0.7rem;
            }
            .cierreBtn {
                /*width: 40%;*/
                justify-self: end;
                align-self: start;
            }
            #filtroFechaDesde,
            #filtroFechaHasta {
                box-sizing: border-box;
                /*width: 100%;*/
                padding: 0.5rem;
                /*height: 2.5rem;*/
                background-color: var(--white-application-color);
                border: 1px solid var(--ligth-border-color);
                color: var(--primary-color);
                font-size: var(--font-bajada-size);
                font-weight: var(--font-bajada-weight);
                outline: none;
                border-radius: 5px;
                font-family: inherit;
            }
            .filtroEntreFechas {
                grid-template-columns: 15rem 15rem auto;
                padding: 2vh 3vw 2vh;
            }
        `;
    }

    render() {
        return html`
            <div class="body row">
                <div class="cierre">
                    <label>Observaciones: </label>
                    <textarea id="observaciones" @change="${this.observacionesChange}" .value="${this.observaciones}"></textarea>
                    <button class="cierreBtn" btn3 @click=${this.guardarParte}>GENERAR CIERRE</button>
                </div>
                <div class="filtroEntreFechas inner-grid columns">
                    <input placeholder="Desde..." id="filtroFechaDesde" type="date" />
                    <input placeholder="Hasta..." id="filtroFechaHasta" type="date" />
                    <button class="entreFecharBtn" btn1 @click="${this.buscarEntreFechas}">${SEARCH}</button>
                </div>
            </div>
        `;
    }

    observacionesChange(e) {
        this.observaciones = e.currentTarget.value;
    }
    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            //this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["cierre"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
            //this.update();
        }
        if (name == PARTE_DIARIO) {
            this.observaciones = "";
        }
    }

    guardarParte(e) {
        const itemCierre = {
            observaciones: this.observaciones,
            guardia: store.getState().autorizacion.usuario.Profiles[0].Perfil.Usuario,
        };
        store.dispatch(addParteDiario(itemCierre));
        this.update();
    }

    buscarEntreFechas(e) {
        /*const desde = this.shadowRoot.querySelector("#filtroFechaDesde").value;
        const hasta = this.shadowRoot.querySelector("#filtroFechaHasta").value;

        store.dispatch(getEntreFechas(desde, hasta));
        this.update();*/
    }
}
window.customElements.define("cierre-component", cierreComponent);
