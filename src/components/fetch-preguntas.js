import { LitElement, html, css } from 'lit';

export default class FetchPreguntas extends LitElement {
    static styles = css``;

    static properties = {
        jsonData: { type: Array },
    };

    constructor() {
        super();
        this.jsonData = [];
        this.getData()
    }

    firstUpdated(){
        this.getData()
    }

    _sendData(data) {
        this.dispatchEvent(new CustomEvent('ApiData', {
            datail: { data },
            bubbles: true,
            composed: true
        }))
    }

    getData =  () => {
        fetch("preguntas.json", { method: "GET" })
            .then((response) => response.text())
            .then(data => {
                const json = JSON.parse(data);
                this._sendData(json)
            }
            )
    }

    render() {
        return html``;
    }
}

customElements.define('fetch-preguntas', FetchPreguntas);
