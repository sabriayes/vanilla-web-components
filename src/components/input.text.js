import templateHTML from './input.text.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

class InputText extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const shadowRoot = this.shadowRoot;
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('input-text', InputText);