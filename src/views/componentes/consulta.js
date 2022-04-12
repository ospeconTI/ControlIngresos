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
import { EXIT, ATRAS, SEARCH } from "../../../assets/icons/svgs";
import { showRegistro, hideRegistro, ordenar } from "../../redux/ui/actions";
import { getAll as getMovimientos, getEntreFechas, getByDocumento } from "../../redux/movimientos/actions";
import { getAll as getVisita, getById } from "../../redux/visita/actions";

import { busquedaComponent } from "../componentes/busqueda";
import { registroDatos } from "../componentes/registroDatos";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const BUSQUEDA = "ui.busqueda.timeStamp";
const MOVIMIENTOS_ENTRE_FECHAS = "movimientos.getEntreFechasTimpestamp";
const MOVIMIENTOS_BY_DNI = "movimientos.getMovimientosByDniTimeStamp";
const ORDENAR = "ui.ordenar.timeStamp";

export class consultaIngresos extends connect(store, MEDIA_CHANGE, SCREEN, MOVIMIENTOS_ENTRE_FECHAS, MOVIMIENTOS_BY_DNI, BUSQUEDA, ORDENAR)(LitElement) {
	constructor() {
		super();
		this.area = "body";
		this.orderActual = "apellido";
		this.movimientosEntreFechas = [];
		this.movimientroByDni = [];
		this.movimientosFitlrados = [];
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
				grid-template-rows: auto auto auto 1fr;
				background-color: var(--white-application-color);
				box-shadow: 0 3px 6px 0 var(--primary-color);
				border-radius: 0.7rem;
				align-self: center;
				padding: 2vh 1vw;
				justify-self: center;

				width: 98%;
				height: 60vh;
				overflow-y: auto;

				cursor: pointer;
			}
			.columnas {
				grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
				padding: 1vh 1vw;
				place-items: center;
			}
			.cabecera {
				border-bottom: 1px solid var(--ligth-border-color);
				color: var(--disable-text-color);
				font-weight: bold;
				font-size: 0.7rem !important;
			}
			.lista {
				color: var(--primary-color);
				font-size: 0.8rem;
				overflow-y: auto;
			}
			.registrosList {
				border-bottom: 1px solid var(--ligth-border-color);
			}
			.nombre {
				justify-self: start;
			}
			busqueda-component {
				width: 50%;
				justify-self: center;
			}
			#filtroFechaDesde,
			#filtroFechaHasta,
			#busquedaDni {
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
			.filtros {
				grid-template-columns: 1fr 1fr;
			}
			#labelBusqueda {
				color: var(--secondary-color);
				font-size: 0.7rem;
				font-weight: bold;
			}
			.dosfilas {
				grid-template-rows: auto auto;
				gap: 0;
			}
			.filtroDni {
				grid-template-columns: 1fr auto;
			}
			.filtroEntreFechas {
				grid-template-columns: 1fr 1fr auto;
			}
			.ordena {
				cursor: pointer;
			}
			div[selected] {
				color: var(--secondary-color);
			}
			input,
			select,
			textarea {
				border-color: var(--primary-color) !important;
			}
		`;
	}

	render() {
		return html`
			<div class="cuerpo inner-grid row align-start">
				<div class="filtros inner-grid columns">
					<div class="dosfilas inner-grid row">
						<label id="labelBusqueda">Busqueda por documento: </label>
						<div class="filtroDni inner-grid columns">
							<input placeholder="Documento..." id="busquedaDni" type="text" />
							<button btn3 @click="${this.buscarDni}">${SEARCH}</button>
						</div>
					</div>
					<div class="dosfilas inner-grid row">
						<label id="labelBusqueda">Busqueda entre fechas: </label>
						<div class="filtroEntreFechas inner-grid columns">
							<input placeholder="Desde..." id="filtroFechaDesde" type="date" />
							<input placeholder="Hasta..." id="filtroFechaHasta" type="date" />
							<button btn3 @click="${this.buscarEntreFechas}">${SEARCH}</button>
						</div>
					</div>
				</div>
				<!--                 <busqueda-component></busqueda-component> -->
				<div class="columnas inner-grid cabecera">
					<label class="ordena" ?selected=${this.orderActual == "apellido"} @click=${this.ordenar} .order=${"apellido"}>NOMBRE</label>
					<label class="ordena" ?selected=${this.orderActual == "documento"} @click=${this.ordenar} .order=${"documento"}>DNI</label>
					<label class="ordena" ?selected=${this.orderActual == "entrada"} @click=${this.ordenar} .order=${"entrada"}>INGRESO</label>
					<label>EGRESO</label>
				</div>
				<div class="lista inner-grid row cursor align-start">
					${this.movimientosFitlrados.map((item) => {
						return html` <div class="registrosList inner-grid columnas" .item=${item} @click=${this.abrirRegistro}>
							<div class="nombre button cursor" .item=${item}>${item.apellido?.toUpperCase()} , ${item.nombre?.toUpperCase()}</div>
							<div class="button cursor" .item=${item}>${item.documento}</div>
							<div class="button cursor" .item=${item}>${new Date(item.entrada).toLocaleString()}</div>
							<div class="button cursor" .item=${item}>${item.salida != "0001-01-01T00:00:00" ? new Date(item.salida).toLocaleString() : ""}</div>
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
			const isCurrentScreen = ["consulta"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) {
				this.hidden = false;
			}
			this.update();
		}

		if (name == MOVIMIENTOS_ENTRE_FECHAS) {
			this.movimientosEntreFechas = state.movimientos.movimientosEntreFechas;
			this.movimientosFitlrados = state.movimientos.movimientosEntreFechas;
			this.shadowRoot.querySelector("#filtroFechaDesde").value = "";
			this.shadowRoot.querySelector("#filtroFechaHasta").value = "";
			this.update();
		}

		if (name == MOVIMIENTOS_BY_DNI) {
			this.movimientroByDni = state.movimientos.movimientroByDni;
			this.movimientosFitlrados = state.movimientos.movimientosByDni;
			this.shadowRoot.querySelector("#busquedaDni").value = "";
			this.update();
		}

		if (name == BUSQUEDA) {
			if (state.screen.name == "consulta") {
				if (state.ui.busqueda.texto != "") {
					this.movimientosFitlrados = this.movimientosEntreFechas.filter((item) => {
						const text = item.documento + item.nombre.toUpperCase() + item.apellido.toUpperCase() + new Date(item.entrada).toLocaleString() + new Date(item.salida).toLocaleString();
						return text.includes(state.ui.busqueda.texto.toUpperCase());
					});
				} else {
					this.movimientosFitlrados = this.movimientosEntreFechas;
					this.movimientosFitlrados = this.movimientroByDni;
				}
				state.ui.busqueda.texto = "";
				this.update();
			}
		}

		if (name == ORDENAR) {
			let orden = state.ui.ordenar.order;
			this.orderActual = orden;
			this.movimientosFitlrados = this.movimientosFitlrados.sort((a, b) => {
				if (a[orden] > b[orden]) return 1;
				if (a[orden] < b[orden]) return -1;
				return 0;
			});
			this.update();
		}
	}

	abrirRegistro(e) {
		store.dispatch(showRegistro(e.currentTarget.item));
		store.dispatch(getById(e.currentTarget.item.idVisita));
		//        console.log(e.currentTarget.item.idVisita);
	}

	buscarDni(e) {
		const documento = this.shadowRoot.querySelector("#busquedaDni").value;

		store.dispatch(getByDocumento(documento));
		this.update();
	}

	buscarEntreFechas(e) {
		const desde = this.shadowRoot.querySelector("#filtroFechaDesde").value;
		const hasta = this.shadowRoot.querySelector("#filtroFechaHasta").value;

		store.dispatch(getEntreFechas(desde, hasta));
		this.update();
	}

	ordenar(e) {
		store.dispatch(ordenar(e.currentTarget.order));
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
window.customElements.define("consulta-ingresos", consultaIngresos);
