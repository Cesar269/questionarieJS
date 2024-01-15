import { LitElement, html, css } from 'lit';
import styles from "../styles/pregunta-styles"
import { classMap } from 'lit/directives/class-map.js';



export default class Pregunta extends LitElement {
    static get properties() {
        return {
            openQuestion: { type: Boolean },
            botonInicio: {},
            jsonData: {},
            index: { type: Number },
            preguntaActual: {},
            isCorrect: { type: Boolean },
            nextQuestion: {},
            tuRespuesta: {},
            isReset: {},
            person: {type: Object},

        };
    }
    static styles = [
        styles
    ];

    constructor() {
        super()
        this.tuRespuesta = false
        this.isReset = true
        this.openQuestion = false
        this.nextQuestion = true
        this.botonInicio = true
        this.jsonData = {}
        this.index = 0
        this.preguntaActual = {}
        this.isCorrect = undefined;
        this.getData()
        // this.addEventListener('ApiData', this.handleJsonLoaded);

    }

    getData = () => {
        fetch("preguntas.json", { method: "GET" })
            .then((response) => response.text())
            .then(data => {
                const json = JSON.parse(data);
                this.jsonData = json;
            }
            )
    }

    _comenzarCuestionario() {
        this.openQuestion = !this.openQuestion;
        this.botonInicio = !this.botonInicio
        this.preguntaActual = this.jsonData.preguntas[this.index]
        this.shuffle(this.preguntaActual.opciones)
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }


    _reset() {
        this.index = 0;
        this.preguntaActual = this.jsonData.preguntas[this.index]
        this._resetOptions()
    }


    _resetOptions() {
        const ele = this.shadowRoot.querySelectorAll('input[name="respuesta"]');
        for (let i = 0; i < ele.length; i++)
            ele[i].checked = false;
    }




    render() {

        return html`
            <button class="${classMap({ open: !this.botonInicio, iniciar: true })}" @click=${this._comenzarCuestionario}>Comenzar</button>
            <div class="${classMap({ open: !this.openQuestion })}">
                <h3>Pregunta ${this.preguntaActual.id}:</h3>
                <p>${this.preguntaActual.pregunta ?? ""}</p>
                <code></code>
                ${this.preguntaActual.opciones ?
                this.preguntaActual.opciones.map((opcion) => {
                    return html`
                        <input type="radio" name="respuesta" @click=${() => this.isCorrect = opcion.correcta} value=${opcion.texto}>${opcion.texto}<br>
                        `
                }) :
                ""}
                <br>
                <div class="actions">
                    <button @click=${this.corroborarRespuesta}>Contestar</button>
                    <button ?disabled=${this.nextQuestion} @click=${this.siguientePregunta}>Siguiente pregunta</button>
                    <button ?disabled=${this.isReset} @click=${this._reset}>Reiniciar</button>
                </div>

                <span class="${classMap({ open: !this.tuRespuesta })}">Tu respuesta es: 
                ${this.isCorrect
                ? html`<strong class="correcta">Correcta</strong>`
                : (this.isCorrect == undefined)
                    ? ""
                    : html`<strong class="incorrecta">Incorrecta</strong>`
            }
                </span>
            </div>
            `;
    }

    corroborarRespuesta() {
        
        if (this.isCorrect === true) {
            this.tuRespuesta = true;
            this.isReset = true
            this.nextQuestion = false
        } else if (this.isCorrect === false) {
            this.tuRespuesta = true;
            this.isReset = false
            this.nextQuestion = true
        }
        // Swal.fire({
        //     icon: "warning",
        //     text: "Existen campos vacíos, favor de completar todos los campos",
        // });
    }

    siguientePregunta() {
        this.index = this.index + 1
        this.preguntaActual = this.jsonData.preguntas[this.index]
        this._resetOptions();
        this.tuRespuesta = false;
        this.isReset = true;
        this.nextQuestion = true;
        this.shuffle(this.preguntaActual.opciones)
    }

}

customElements.define('pregunta-element', Pregunta);
