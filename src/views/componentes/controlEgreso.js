/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";

import { isInLayout } from "../../redux/screens/screenLayouts";

import { gridLayout } from "../css/gridLayout";
import { input } from "../css/input";
import { select } from "../css/select";
import { button } from "../css/button";
import { label } from "../css/label";
import { EXIT, ATRAS } from "../../../assets/icons/svgs";
import { showRegistro, hideRegistro } from "../../redux/ui/actions";
import { getVisitaSinSalida, setSalida } from "../../redux/movimientos/actions";
//import { remove } from "../../redux/registroIngresos/actions";

import { busquedaComponent } from "../componentes/busqueda";

import { getById } from "../../redux/visita/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const BUSQUEDA = "ui.busqueda.timeStamp";
const VISITA_SIN_SALIDA = "movimientos.getVisitaSinSalidaTimeStamp";

export class controlEgreso extends connect(store, MEDIA_CHANGE, SCREEN, VISITA_SIN_SALIDA, BUSQUEDA)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.items = [];
        this.itemsFiltrados = [];
    }
    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${button}
            :host {
                display: grid;
                position: relative;
                padding: 2rem;
            }
            :host([hidden]) {
                display: none;
            }
            .cuerpo {
                grid-template-rows: auto auto 1fr;
                background-color: var(--white-application-color);
                box-shadow: 0 3px 6px 0 var(--primary-color);
                border-radius: 0.7rem;
                padding: 2vh 1vw;
                overflow-y: auto;
                cursor: pointer;
            }
            .columnas {
                grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 0.5fr;
                padding: 1vh 1vw;
                place-items: center;
            }
            .cabecera {
                border-bottom: 1px solid var(--ligth-border-color);
                color: var(--disable-text-color);
                font-weight: bold;
            }
            .lista {
                color: var(--primary-color);
                overflow-y: auto;
                height: 53.8vh;
                align-content: start;
                align-items: start;
            }
            busqueda-component {
                width: 50%;
                justify-self: center;
            }
        `;
    }

    render() {
        return html`
            <div class="cuerpo inner-grid row align-start">
                <busqueda-component></busqueda-component>
                <div class="columnas inner-grid cabecera">
                    <label>APELLIDO</label>
                    <label>NOMBRE</label>
                    <label>DNI</label>
                    <label>INGRESO</label>
                    <label>MARCAR EGRESO</label>
                </div>
                <div class="lista inner-grid row cursor">
                    ${this.itemsFiltrados.map((item) => {
                        return html` <div class="inner-grid columnas" .item=${item}>
                            <div class="button cursor" .item=${item} @click=${this.abrirRegistro}>${item.apellido}</div>
                            <div class="button cursor" .item=${item} @click=${this.abrirRegistro}>${item.nombre}</div>
                            <div class="button cursor" .item=${item} @click=${this.abrirRegistro}>${item.documento}</div>
                            <div class="button cursor" .item=${item} @click=${this.abrirRegistro}>${new Date(item.entrada).toLocaleString()}</div>
                            <button btn3 .item=${item} @click="${this.abrirRegistro}">${EXIT}</button>
                        </div>`;
                    })}
                </div>
            </div>
        `;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
            //this.update();
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["controlEgreso"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                store.dispatch(getVisitaSinSalida());
                this.hidden = false;
            }
            this.update();
        }

        if (name == VISITA_SIN_SALIDA) {
            this.items = state.movimientos.visitasSinSalida;
            this.itemsFiltrados = state.movimientos.visitasSinSalida;
        }

        if (name == BUSQUEDA) {
            if (state.screen.name == "controlEgreso") {
                if (state.ui.busqueda.texto != "") {
                    this.itemsFiltrados = this.items.filter((item) => {
                        const text = item.documento + item.nombre.toUpperCase() + item.apellido.toUpperCase() + new Date(item.entrada).toLocaleString();
                        return text.includes(state.ui.busqueda.texto.toUpperCase());
                    });
                } else {
                    this.itemsFiltrados = this.items;
                }
                state.ui.busqueda.texto = "";
                this.update();
            }
        }
    }

    marcarEgreso(e) {
        const id = e.currentTarget.item.id;

        const itemSetSalida = {
            id: id,
            salida: new Date(),
            guardiaSalida: store.getState().autorizacion.usuario.Profiles[0].Perfil.Usuario,
            idPuertaSalida: 0,
        };

        if (confirm("No olvide archivar el ticket de egreso ¿Confirma la salida de " + e.currentTarget.item.apellido + " " + e.currentTarget.item.nombre + " ?")) {
            store.dispatch(setSalida(itemSetSalida));
        }
        //console.log(e.currentTarget.item);
    }

    back() {
        store.dispatch(goTo("registroIngreso"));
        /*<button @click=${this.back}>${ATRAS}</button>*/
    }

    abrirRegistro(e) {
        store.dispatch(showRegistro(e.currentTarget.item));
        store.dispatch(getById(e.currentTarget.item.idVisita));
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            orientation: {
                type: String,
                reflect: true,
            },
            items: {
                type: Array,
                state: true,
            },
            nombre: {
                type: String,
                state: true,
            },
        };
    }
}
window.customElements.define("control-egreso", controlEgreso);
