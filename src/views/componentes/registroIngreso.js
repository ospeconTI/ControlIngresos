/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
// import { jsPDF } from "jspdf";

import { isInLayout } from "../../redux/screens/screenLayouts";
import { CAMERA, VIDEOCAM } from "../../../assets/icons/svgs";
import { gridLayout } from "../css/gridLayout";
import { input } from "../css/input";
import { select } from "../css/select";
import { button } from "../css/button";

import { setEntrada, GetVisitaSinSalida, getByVisitaId } from "../../redux/movimientos/actions";
import { getByDni as buscarVisitaPorDni } from "../../redux/visita/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const LEGAJOS = "legajos.timeStamp";
const SECTORES = "sectores.timeStamp";
const VISITA = "visita.currentVisitaTimeStamp";

const ENTRADA = "movimientos.setEntradaTimeStamp";
const ENTRADA_ERROR = "movimientos.setEntradaTimeStampError";

const constraints = (window.constraints = {
	audio: false,
	video: true,
});

export class registroIngreso extends connect(store, MEDIA_CHANGE, SCREEN, LEGAJOS, SECTORES, VISITA, ENTRADA, ENTRADA_ERROR)(LitElement) {
	constructor() {
		super();
		this.area = "body";
		this.item = {};
		this.datos = "";
		this.timeOut = null;
		this.shift = false;
		this.datosVisita = this.datosVisitaDefault();
		this.modoVideo = true;
		this.legajos = [];
		this.legajosFiltrados = [];
		this.sectores = [];
		this.escaneando = false;
		this.changed = false;
		this.disable = true;
		this.dniAnterior = 0;
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
			item: {
				type: Object,
				state: true,
			},
			hidden: {
				type: Boolean,
				reflect: true,
			},
			modoVideo: {
				type: Boolean,
				reflect: true,
			},
			documento: {
				type: Object,
				state: true,
			},
		};
	}

	datosVisitaDefault() {
		return {
			sexo: "",
			fechaNacimiento: "",
			apellido: "",
			nombre: "",
			foto: "",
			sector: "",
			legajo: "",
			observaciones: "",
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
				padding: 2rem;
			}
			:host([hidden]) {
				display: none;
			}
			.cuerpo {
				display: grid;
				background-color: var(--white-application-color);
				box-shadow: 0 3px 6px 0 var(--primary-color);
				border-radius: 0.7rem;
				align-self: center;
				justify-self: center;
				padding: 5vh 5vw;
				width: 90%;
				height: 90%;
			}
			.datosPersonales,
			.sectorPersonas {
				grid-template-columns: 1fr 1fr;
			}
			textarea {
				display: grid;
				height: 10vh;
				border: 1px solid var(--ligth-border-color);
				border-radius: 5px;
				font-size: 1rem;
			}
			.photo {
			}
			.buttons {
				justify-content: end;
				gap: 2rem;
			}
			input {
				padding: 0;
			}
			label {
				color: var(--primary-color);
				font-size: var(--font-label-size);
				font-weight: bold;
			}
			video {
				background: #222;
				height: 30vh;
			}
			img {
				height: 30vh;
			}
			.BtnCaptura {
				align-items: end;
				cursor: pointer;
				border-radius: 1rem;
				height: 3rem;
				width: 3rem;

				color: var(--light-application-color);
				fill: var(--light-application-color);
				stroke: var(--secondary-color: );
				background-color: var(--primary-color);
				font-size: var(--font-bajada-size);
				font-weight: var(--font-bajada-weight);
			}
			input,
			select,
			textarea {
				border-color: var(--primary-color) !important;
			}
			/*:host([modoVideo]) #btnVideo {
                display: none;
            }*/
		`;
	}

	render() {
		return html`
            <div class="cuerpo row">
                <div class="datosPersonales inner-grid column">
                    <div class="inner-grid row">
                        <div class="inner-grid column">
                            <div class="input">
                                <label>DNI</label>
                                <input id="docuNro" type="text"  @blur=${this.buscarDni} />
                            </div>
                            <div class="select">
                                <label>SEXO</label>
                                <select id="sexo"  @change=${this.change("sexo")}  .value="${this.datosVisita.sexo}">
                                    <option value="" selected hidden></option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="X">No binario</option>
                                </select>
                            </div>
                            <div class="input">
                                <label>FECHA NACIMIENTO</label>
                                <input id="naciFecha" type="date" @change=${this.change("fechaNacimiento")}  .value="${this.datosVisita.fechaNacimiento}" />
                            </div>
                            </div>   
                            <div class="input">
                                <label>NOMBRE</label>
                                <input id="nombre" type="text" @change=${this.change("nombre")}  .value="${this.datosVisita.nombre}" />
                            </div>
                            <div class="input">
                                <label>APELLIDO</label>
                                <input id="apellido" type="text" @change=${this.change("apellido")}  .value="${this.datosVisita.apellido}" />
                            </div>
                        </div>
                        <div class="photo inner-grid column center align-end">
                            <video id="video"  autoplay="" playsinline=""></video>
                            <canvas id="canvas" hidden></canvas>
                            <img id="imagen" src=${this.datosVisita.foto} />
                            <button id="btnPhoto" class="BtnCaptura" @click=${this.capturarImagen}>${CAMERA}</button>
                        </div>
                    </div>

                    <div class="sectorPersonas inner-grid column">
                        <div class="select">
                            <label>SECTOR</label>
                            <select id="sectores" @change=${this.change("sector")}  .value=${this.datosVisita.sector}>
                                <option value="" selected hidden></option>
                                ${this.sectores.map((item) => {
									return html` <option value="${item.id}">${item.descripcion}</option> `;
								})}
                            </select>
                        </div>
                        <div class="select">
                            <label>REFERENTE</label>
                            <select id="legajo" @change=${this.change("legajo")}   .value=${this.datosVisita.legajo} >
                                <option value="" selected hidden .value=${this.datosVisita.legajo}></option>
                                ${this.legajos.map((item) => {
									return html` <option value="${item.id}">${item.apellido}, ${item.nombre}</option>`;
								})}
                            </select>
                        </div>
                    </div>

                    <div class="inner-grid row">
                        <div class="input">
                            <label>OBSERVACIONES</label>
                            <textarea id="observaciones" @change=${this.change("observaciones")}  .value="${this.datosVisita.observaciones}"></textarea>
                        </div>
                        <div class="buttons inner-grid column">
                            <button btn1 @click=${this.guardarVisita} .disabled=${!this.changed}>ACEPTAR</button>
                            <button btn1 @click=${this.camposDefault}>LIMPIAR</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
	}

	change(field) {
		return (e) => {
			this.changed = true;
			this.datosVisita[field] = e.currentTarget.value;
			this.update();
		};
	}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			//this.update();
		}
		if (name == SCREEN) {
			this.hidden = true;
			const isCurrentScreen = ["main", "registroIngreso"].includes(state.screen.name);
			if (isInLayout(state, this.area) && isCurrentScreen) {
				this.hidden = false;
			}
			//this.update();
		}
		if (name == LEGAJOS) {
			this.legajos = state.legajos.entities;
		}

		if (name == SECTORES) {
			this.sectores = state.sectores.entities;
		}

		if (name == VISITA) {
			if (state.visita.currentVisita) {
				this.datosVisita = state.visita.currentVisita;
				this.datosVisita.observaciones = "";
				this.datosVisita.sector = "";
				this.datosVisita.legajo = "";

				this.datosVisita.fechaNacimiento = this.datosVisita?.fechaNacimiento?.substr(0, 10);
			} else {
				this.datosVisita = this.datosVisitaDefault();
			}
			this.disable = false;
			this.update();
		}

		if (name == ENTRADA) {
			this.datosVisita = this.datosVisitaDefault();
			this.shadowRoot.querySelector("#docuNro").value = "";
			this.changed = false;
			this.disable = true;

			this.update();
		}

		if (name == ENTRADA_ERROR) {
			alert("No se pudo registrar la visita");
		}
	}

	setModoVideo() {
		this.modoVideo = true;
	}

	firstUpdated(changedProperties) {
		document.addEventListener("keydown", this.lector.bind(this));

		this.init();
	}

	lector(e) {
		if (e.key) {
			if (e.key == "F2") this.escaneando = true; //el scanner se programó con el prefijo Hex 17

			if (this.escaneando) {
				e.preventDefault();

				if (this.timeOut)
					//toma los datos del lector
					clearTimeout(this.timeOut);

				let caracter = e.key;

				if (this.shift) {
					this.shift = false;
					if (caracter == "2") caracter = '"';
					if (caracter != "2") caracter = caracter.toUpperCase();
				}
				if (caracter == "Shift") {
					caracter = "";
					this.shift = true;
				}

				this.datos += caracter;

				this.timeOut = setTimeout(() => {
					this.interpretarDatos(this.datos);
					this.datos = "";
					this.timeOut = null;
					this.escaneando = false;
				}, 50);
			}
		}
	}

	interpretarDatos(datos) {
		if (datos.length > 10 && store.getState().screen.name == "registroIngreso") {
			if (!this.changed) {
				this.aplicarDatos(datos);
			} else {
				if (confirm("Descarta las modificaciones del formulario?")) {
					this.aplicarDatos(datos);
				}
			}
		}
		//alert(JSON.stringify(documento));
	}

	aplicarDatos(datos) {
		const splitDatos = datos.split('"');
		let dateParts = "";

		this.datosVisita = this.datosVisitaDefault();

		if (splitDatos.length < 10) {
			dateParts = splitDatos[6].split("-");
			this.shadowRoot.querySelector("#docuNro").value = splitDatos[4];
			this.datosVisita.apellido = splitDatos[1];
			this.datosVisita.nombre = splitDatos[2];
			this.datosVisita.sexo = splitDatos[3];
			this.datosVisita.fechaNacimiento = new Date(dateParts[2], parseInt(dateParts[1]) - 1, dateParts[0]).toISOString().substr(0, 10);
		} else {
			dateParts = splitDatos[7].split("-");
			this.shadowRoot.querySelector("#docuNro").value = splitDatos[1].toUpperCase().replace(/ /g, "").replace(/[A-Z]/g, "");
			this.datosVisita.apellido = splitDatos[4];
			this.datosVisita.nombre = splitDatos[5];
			this.datosVisita.sexo = splitDatos[8];
			this.datosVisita.fechaNacimiento = new Date(dateParts[2], parseInt(dateParts[1]) - 1, dateParts[0]).toISOString().substr(0, 10);
		}
		this.changed = false;
		this.dniAnterior = this.shadowRoot.querySelector("#docuNro").value;
		this.update();
		store.dispatch(buscarVisitaPorDni(this.shadowRoot.querySelector("#docuNro").value));
	}

	handleSuccess(stream) {
		const video = this.shadowRoot.querySelector("video");
		const videoTracks = stream.getVideoTracks();
		//console.log("Got stream with constraints:", constraints);
		//console.log(`Using video device: ${videoTracks[0].label}`);
		window.stream = stream; // make variable available to browser console
		video.srcObject = stream;
	}

	async init() {
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		this.handleSuccess(stream);
	}

	capturarImagen(e) {
		const canvas = this.shadowRoot.querySelector("#canvas");
		const video = this.shadowRoot.querySelector("#video");
		const imagen = this.shadowRoot.querySelector("#imagen");
		canvas.width = 200;
		canvas.height = 150;
		canvas.getContext("2d").drawImage(video, 0, 0, 200, 150);
		var data = canvas.toDataURL("image/png");
		imagen.setAttribute("src", data);
		this.modoVideo = false;
		this.datosVisita.foto = data;
		this.update();
	}

	guardarVisita() {
		const docuNro = this.shadowRoot.querySelector("#docuNro").value;
		const sexo = this.shadowRoot.querySelector("#sexo").value;
		const nombre = this.shadowRoot.querySelector("#nombre").value;
		const apellido = this.shadowRoot.querySelector("#apellido").value;
		const sector = this.shadowRoot.querySelector("#sectores").value;
		const legajo = this.shadowRoot.querySelector("#legajo").value;
		const observaciones = this.shadowRoot.querySelector("#observaciones").value;
		const naciFecha = this.shadowRoot.querySelector("#naciFecha").value;
		const foto = this.shadowRoot.querySelector("#imagen").src;
		let idVisita = 0;

		if (store.getState().visita.currentVisita?.id) {
			idVisita = store.getState().visita.currentVisita.id;
		}

		const itemEntrada = {
			visita: {
				apellido: apellido,
				nombre: nombre,
				documento: docuNro,
				sexo: sexo,
				fechaNacimiento: naciFecha,
				foto: foto,
				guardia: store.getState().autorizacion.usuario.Profiles[0].Perfil.Usuario,
			},
			idVisita: idVisita,
			idSector: sector,
			idLegajo: legajo,
			idPuertaEntrada: 0,
			observaciones: observaciones,
			guardiaEntrada: store.getState().autorizacion.usuario.Profiles[0].Perfil.Usuario,
		};

		if (confirm("Desea guardar Registro?")) {
			this.update();
			store.dispatch(setEntrada(itemEntrada));
		}
	}

	camposDefault() {
		if (!this.changed || confirm("Desea limpiar los campos? Perdera los datos")) {
			this.datosVisita = this.datosVisitaDefault();
			this.shadowRoot.querySelector("#docuNro").value = "";
			this.disable = true;
			this.changed = false;
			this.update();
		}
	}

	buscarDni(e) {
		if (e.currentTarget.value != this.dniAnterior) {
			if (this.changed) {
				if (confirm("Descarta las modificaciones del formulario?")) {
					this.datosVisita = this.datosVisitaDefault();
					this.update();
					store.dispatch(buscarVisitaPorDni(e.currentTarget.value));
					this.changed = false;
				}
				this.dniAnterior = e.currentTarget.value;
			} else {
				store.dispatch(buscarVisitaPorDni(e.currentTarget.value));
				this.dniAnterior = e.currentTarget.value;
				this.disable = false;
			}
		}
	}

	imprimir(e) {
		/**
         *  Así esta hecha la impresión de bonos del ZOM
         * imprime en red desde el servidor con ActiveXObject
         * 
         var pImpresora = "Termica";

            //\\\\BARA_AX09AC_01\\TERMICA
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var Printer = fso.CreateTextFile(pImpresora, true);

            //Printer.WriteLine("012345678901234567890123456789012345678901");

            Printer.WriteLine("Hola");
            Printer.Close();
        
         *  Impresión desde un archivos .pdf mediante jsPDF
         
            var doc = new jsPDF();

            doc.setFontSize(40);
            doc.text(store.getState().visita.currentVisita.nombre, 50, 50);

         * De esta forma de guarda y se imprime el archivo guardado
         * 
            doc.autoPrint({ variant: "non-conform" });
            doc.save("print.pdf");
       
         * Con estos parámetros en la funcion output se abren directamente las opciones de impresión
         * sin guardar el archivo
         *
            doc.autoPrint();
            doc.output("dataurlnewwindow", { filename: "comprobante.pdf" });  
                  
        **/
		/**
         * 
         * var divToPrint = document.createElement("div");

        const ESC = String.fromCharCode(27);
        const GS = String.fromCharCode(32);
        divToPrint.innerHTML = String.fromCharCode(27, 32, 255) + store.getState().visita.currentVisita.nombre + store.getState().visita.currentVisita.apellido; // + GS + "V" + String.fromCharCode(66, 20);

        var newWin = window.open();

        newWin.document.write(divToPrint.innerHTML);
        newWin.document.close();
        newWin.focus();
        newWin.print();
        newWin.close();*/
	}
}
window.customElements.define("registro-ingreso", registroIngreso);
