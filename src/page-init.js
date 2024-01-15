import { LitElement, html, css } from 'lit';
import styles from "./styles/page-init-styles"
import Pregunta from "./components/pregunta-element.js"


export class PageInit extends LitElement {
    static get properties() {
        return {
            Pregunta,
        };
    }

    static styles = [
        styles
    ];

    render() {
        return html`
            <h4>Cuestionario de JavaScript + LitElement</h4>
            <pregunta-element ></pregunta-element>
            `;
    }
}
customElements.define('page-init', PageInit);
