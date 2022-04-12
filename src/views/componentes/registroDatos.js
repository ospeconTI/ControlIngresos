/** @format */

import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers/connect";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { BUSCAR, DELETE, CLOSE, EXIT } from "../../../assets/icons/svgs";
import { LitElement, html, css } from "lit";
import { buscar } from "../../redux/ui/actions";

import { gridLayout } from "../css/gridLayout";
import { input } from "../css/input";
import { select } from "../css/select";
import { button } from "../css/button";
import { label } from "../css/label";

import { showRegistro, hideRegistro } from "../../redux/ui/actions";
import { getVisitaSinSalida, setSalida } from "../../redux/movimientos/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SHOW_REGISTRO = "ui.registroDatos.timeStampShow";
const HIDE_REGISTRO = "ui.registroDatos.timeStampHide";
const VISITA = "visita.entityTimeStamp";
const SET_SALIDA = "movimientos.setSalidaTimeStamp";

export class registroDatos extends connect(store, SCREEN, SHOW_REGISTRO, HIDE_REGISTRO, VISITA, SET_SALIDA)(LitElement) {
    constructor() {
        super();
        this.area = "body";
        this.seleccionado = {};
        this.visita = {};
        this.modo = "";
    }

    static get properties() {
        return {
            hidden: {
                type: Boolean,
                reflect: true,
            },
            item: {
                type: Object,
            },
        };
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${button}
            :host {
                display: grid;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-image: linear-gradient(#455879, var(--primary-color));
                box-shadow: 0 3px 6px 0 var(--primary-color);
                border-radius: 0.7rem;
                padding: 0vh 2vw 2vh 2vw;
            }
            :host([hidden]) {
                display: none;
            }
            .cuerpo {
                grid-template-rows: auto auto auto auto auto;

                color: var(--white-application-color);
                font-weight: bold;
            }
            .linea {
                border-bottom: solid 0.5px var(--ligth-version);
            }
            button {
                width: fit-content;
                justify-self: end;
            }
            label {
                color: var(--secondary-color);
                font-size: 0.7rem;
            }
            #imagenFoto {
                width: 7rem;
                height: 7rem;
            }
            textarea {
                background-color: var(--primary-color);
                color: var(--white-application-color);
                border: none;
            }
            .dos {
                grid-template-columns: 1fr 1fr;
            }
            .tres {
                grid-template-columns: 2fr 1fr;
            }
            .detalle {
                column-gap: 3rem;
            }
        `;
    }

    render() {
        return html`
            <div class="cuerpo inner-grid row">
                <button btn2 @click="${this.cerrar}">${CLOSE}</button>
                <div class=" inner-grid column tres">
                    <div class=" inner-grid row">
                        <div class="inner-grid column dos">
                            <div class="inner-grid row">
                                <label>Apellido</label>
                                <div>${this.seleccionado.apellido?.toUpperCase()}</div>
                            </div>
                            <div class="inner-grid row">
                                <label>Nombre</label>
                                <div>${this.seleccionado.nombre?.toUpperCase()}</div>
                            </div>
                        </div>

                        <div class="inner-grid column dos">
                            <div class="inner-grid row">
                                <label>Documento</label>
                                <div>${this.seleccionado.documento}</div>
                            </div>
                            <div class="inner-grid row">
                                <label>Sexo</label>
                                <div>${this.visita.sexo}</div>
                            </div>
                        </div>
                    </div>
                    <img id="imagenFoto" src=${this.visita.foto} class="justify-self-end" />
                </div>

                <div class="linea"></div>

                <div class="detalle inner-grid column">
                    <div class="inner-grid row">
                        <label>Sector</label>
                        <div>${this.seleccionado.sector?.toUpperCase()}</div>
                    </div>
                    <div class="inner-grid row">
                        <label>Referente</label>
                        <div>${this.seleccionado.referente?.toUpperCase()}</div>
                    </div>
                </div>
                <div class="inner-grid row">
                    <label>Observaciones</label>
                    <textarea disabled rows="3">${this.seleccionado.observaciones}</textarea>
                </div>
                <div class="linea"></div>

                <div class="inner-grid row">
                    <label>Entrada</label>
                    <div>${new Date(this.seleccionado.entrada).toLocaleString()}</div>
                </div>
                <button ?hidden=${this.modo == "consulta"} btn3 @click="${this.marcarEgreso}">MARCAR SALIDA</button>
            </div>
        `;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }

        if (name == SCREEN) {
            this.hidden = true;
            this.modo = state.screen.name;
            this.update();
        }

        if (name == SHOW_REGISTRO) {
            this.hidden = false;
            this.seleccionado = state.ui.registroDatos.item;
            const legajo = state.legajos.entities.find((l) => l.id == this.seleccionado.idLegajo);
            this.seleccionado.sector = legajo.nombreSector;
            this.seleccionado.referente = legajo.apellido + " " + legajo.nombre;
        }

        if (name == HIDE_REGISTRO) {
            this.hidden = true;
        }

        if (name == VISITA) {
            this.visita = state.visita.entity;
            this.update();
        }

        if (name == SET_SALIDA) {
            this.cerrar();
        }
    }

    cerrar() {
        store.dispatch(hideRegistro());
    }

    marcarEgreso(e) {
        const id = this.seleccionado.id;

        const itemSetSalida = {
            id: id,
            salida: new Date(),
            guardiaSalida: store.getState().autorizacion.usuario.Profiles[0].Perfil.Usuario,
            idPuertaSalida: 0,
        };

        if (confirm("No olvide archivar el ticket de egreso ¿Confirma la salida?")) {
            store.dispatch(setSalida(itemSetSalida));
        }
    }
}
window.customElements.define("registro-datos", registroDatos);
