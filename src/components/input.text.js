import templateHTML from './input.text.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

class InputText extends HTMLElement {

    get placeholder() {
        return this.getAttribute('placeholder') || ''
    }

    get label() {
        return this.getAttribute('label') || ''
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const root = this.shadowRoot.querySelector('#root-element');
        const input = this.shadowRoot.querySelector('#input-element');
        const label = this.shadowRoot.querySelector('#label-element');
        const labelContainer = this.shadowRoot.querySelector('#label-container');
        const elements = {
            root,
            input,
            labelContainer,
            label
        };

        this
            .initStates(elements)
            .initValues(elements)
            .attachEvents(elements);
        
    }

    initStates(elements) {
        
        const HAS_LABEL = 'has-label';
        const labelText = this.label;

        elements.root.classList.remove(HAS_LABEL);
        if(Boolean(labelText)) {
            elements.root.classList.add(HAS_LABEL);
        }
        else {
            elements.labelContainer.remove();
        }

        return this;
    }

    /**
     * Function set initial value all defined elements.
     * @param {*} elements 
     * @returns {InputText}
     */
    initValues(elements) {

        elements.input.setAttribute(
            'placeholder', 
            this.placeholder
        );

        elements.label.innerHTML = this.label

        return this;
    }

    /**
     * Function set events all defined elements.
     * @param {*} elements 
     * @returns {InputText}
     */
    attachEvents(elements) {

        elements.input.addEventListener(
            'change', 
            this.eventInputChange.bind(this)
        );
        return this;
    }
    
    /**
     * Function run when input value change.
     * If input has any content, add HAS_VALUE class
     * to container element.
     * 
     * @param {*} $event 
     * @return {void}
     */
    eventInputChange($event) {
        
        const HAS_VALUE = 'has-value';
        const value = $event.target.value;
        const root = this.shadowRoot.querySelector('#root-element');

        Boolean(value) ? 
            root.classList.add(HAS_VALUE) : 
            root.classList.remove(HAS_VALUE);
    }

    
}

window.customElements.define('input-text', InputText);