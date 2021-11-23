import templateHTML from './input.text.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

/**
 * CSS classes name.
 * @property {string} HAS_LABEL - Element has a label.
 * @property {string} HAS_VALUE - Input contains truly value.
 * @readonly
 */
const CLASS = {
    HAS_LABEL: 'has-label',
    HAS_VALUE: 'has-value'
}

/**
 * Custom component attribues.
 * @property {string} LABEL         - Label attribute alias.
 * @property {string} PLACEHOLDER   - Placeholder attribute alias.
 * @readonly
 */
const ATTRS = {
    LABEL: 'label',
    PLACEHOLDER: 'placeholder'
}

/**
 * Event list.
 * @property {string} CHANGE - Change event alias.
 * @property {string} CLICK  - Click event alias.
 * @readonly
 */
 const EVENTS = {
     CHANGE: 'change',
     CLICK: 'click'
}

/**
 * Custom text input element class.
 * @class
 * @extends {HTMLElement}
 * @constructor
 */
class InputText extends HTMLElement {
    
    /**
     * style tage element in template.
     * @property {CSSStyleSheet} $style
     * @public
     */
    $style; 

    /**
     * ID #root-element in template.
     * @property {HTMLElement} $root
     * @public
     */
    $root;

    /**
     * ID #inner-container-element in template.
     * @property {HTMLElement} $innerContainer
     * @public
     */
    $innerContainer;

    /**
     * ID #input-element in template.
     * @property {HTMLElement} $input
     * @input
     */
    $input;

    /**
     * ID #label-container-element in template.
     * @property {HTMLElement} $labelContainer
     * @public
     */
    $labelContainer;

    /**
     * ID #label-element in template.
     * @property {HTMLElement} $innerContainer
     * @public
     */
    $label;
    
    get label() {
        return this.getAttribute(ATTRS.LABEL);
    }
    set label(value) {
        this.setAttribute(ATTRS.LABEL, value);
    }

    get placeholder() {
        return this.getAttribute(ATTRS.PLACEHOLDER);
    }
    set placeholder(value) {
        this.setAttribute(ATTRS.PLACEHOLDER, value);
    }

    static get observedAttributes() {
        return Object.values(ATTRS);
    }
      
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.init();
    }

    attributeChangedCallback(name, value, newValue) {

        if(value === null) return;

        switch (name) {

            case ATTRS.LABEL:
                this.generateLabelElement(newValue);
            break;

            case ATTRS.PLACEHOLDER:
                this.$input.setAttribute(
                    ATTRS.PLACEHOLDER,
                    newValue
                );
            break;
        }
    }

    disconnectedCallback() {

        this.$input?.removeEventListener(
            EVENTS.CHANGE, 
            this.eventInputChange.bind(this)
        );
        this.$root?.removeEventListener(
            EVENTS.CLICK,
            this.eventClickToRoot.bind(this)
        );
    }

    init() {
        
        const clondedTemplate = template.content.cloneNode(true);
        
        this.$style = clondedTemplate.querySelector('style');
        this.$root = clondedTemplate.getElementById('root-element');
        this.$innerContainer = clondedTemplate.getElementById('inner-container-element');
        this.$input = clondedTemplate.getElementById('input-element');
        this.$label = clondedTemplate.getElementById('label-element');
        this.$labelContainer = clondedTemplate.getElementById('label-container-element');

        const _label = this.getAttribute(ATTRS.LABEL);
        this.$labelContainer.remove();
        this.generateLabelElement(_label);

        const _placeholder = this.getAttribute(ATTRS.PLACEHOLDER);
        this.$input.setAttribute(ATTRS.PLACEHOLDER, _placeholder);
        
        this.$input.addEventListener(
            EVENTS.CHANGE, 
            this.eventInputChange.bind(this)
        );
        this.$root.addEventListener(
            EVENTS.CLICK,
            this.eventClickToRoot.bind(this)
        );

        this.shadowRoot.appendChild(this.$style);
        this.shadowRoot.appendChild(this.$root);
    }

    /**
     * Update label container element state.
     * If value is falsy remove label conatiner
     * in root.
     * @param {*} value - Label text value.
     * @returns{void}
     */
    generateLabelElement(value) {

        if(Boolean(value)) {

            this.$root.classList.add(CLASS.HAS_LABEL);
            this.$innerContainer.insertBefore(
                this.$labelContainer,
                this.$innerContainer.firstChild
            );

            this.$labelContainer = this.$innerContainer
                .querySelector('#label-container-element');
            this.$label = this.$innerContainer
                .querySelector('#label-element');
            this.$label.innerHTML = value;    
        }
        else {
            this.$root.classList.remove(CLASS.HAS_LABEL);
            this.$labelContainer.remove();
        }
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

        const value = $event.target.value;
        Boolean(value) ? 
            this.$root.classList.add(CLASS.HAS_VALUE) : 
            this.$root.classList.remove(CLASS.HAS_VALUE);
    }

    eventClickToRoot($event) {
        $event.preventDefault();
        this.$input.focus();
    }
}

window.customElements.define('input-text', InputText);