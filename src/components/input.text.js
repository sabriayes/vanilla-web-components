import templateHTML from './input.text.html';

/**
 * Template contents.
 * @var {HTMLElement} template
 */
const template = document.createElement('template');
template.innerHTML = templateHTML;

/**
 * CSS classes name.
 * @property {string} HAS_LABEL     - Element has a label.
 * @property {string} HAS_VALUE     - Input contains truly value.
 * @property {string} HAS_ICON      - slot[name='icon'] has any element.
 * @property {string} INIT          - Element init completed.
 * @property {string} PENDING_INIT  - Element not initialized yet.
 * @readonly
 */
const CLASS = {
    HAS_LABEL: 'has-label',
    HAS_VALUE: 'has-value',
    PENDING_INIT: 'pending-init',
    INIT: 'initialized'
}

/**
 * Custom component attribues.
 * @property {string} LABEL - Label attribute alias.
 * @readonly
 */
const ATTRS = {
    LABEL: 'label',
    PLACEHOLDER: 'placeholder',
    VALUE: 'value'
}

/**
 * Event list.
 * @property {string} CHANGE - Change event alias.
 * @property {string} CLICK  - Click event alias.
 * @readonly
 */
 const EVENTS = {
     CHANGE: 'change',
     CLICK: 'click',
     SLOT_CHANGE: 'slotchange'
}

/**
 * Custom text input element class.\
 * HTML tags is <input-text>\
 * 
 * @class
 * @extends {HTMLElement}
 * @constructor
 */
class InputText extends HTMLElement {

    /**
     * Tag name of InputText
     * @property {string} tagName
     * @static
     */
    static get tagName() {
        return 'vanilla-input';
    }
    
    /**
     * Style tag element in template.
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
     * @property {HTMLElement} $label
     * @public
     */
    $label;

    /**
     * Input value.
     * @property {string} _value
     * @public
     */
    _value = 'sss';

    /**
     * Get current value.
     * @return {string}
     */
    get value() {
        return this._value;
    }

    /**
     * Set value.
     * @return {void} 
     */
    set value(val) {
        this._value = val;
        this.$input.value = val;
    }

    /**
     * Get label property value.
     * @return {string}
     */
    get label() {
        return this.getAttribute(ATTRS.LABEL);
    }

    /**
     * Set label property value.
     * @param {string} value
     * @return {void}
     */
    set label(value) {
        this.setAttribute(ATTRS.LABEL, value);
    }

    static get observedAttributes() {
        return Object.values(ATTRS);
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open', composed: true });
    }

    /**
     * Invoked when change/update attriubtes that defined
     * at observedAttributes() function.
     * 
     * @param {string} name     - Attribute name.
     * @param {string} value    - Attribute current value.
     * @param {string} newValue - Attribute updated value.
     * @return {void}
     */
    attributeChangedCallback(name, value, newValue) {
        this.attributeChanged(name, value, newValue);
    }

    /**
     * Helper function that called by init() and 
     * attributeChangedCallback().
     * 
     * @param {string} name     - Attribute name.
     * @param {string} value    - Attribute current value.
     * @param {string} newValue - Attribute updated value.
     * @return {void}
     */
     attributeChanged(name, value, newValue) {
        
        if(value === null) return;

        switch(name) {
            case ATTRS.LABEL:
                // Invoke when change label attr/property value.
                this.generateLabelElement(newValue);
            break;

            case ATTRS.VALUE:
                // Dispatch change event with fake event.
                const fakeEvent = new Event(EVENTS.CHANGE);
                this.$input?.setAttribute(name, newValue);
                this.$input?.dispatchEvent(fakeEvent);
            break;

            default:
                this.$input?.setAttribute(name, newValue);
        }
    }

    connectedCallback() {
        this.init();
    }

    disconnectedCallback() {

        this.$input?.removeEventListener(
            EVENTS.CHANGE, 
            this.eventChangedInputValue.bind(this)
        );
        this.$root?.removeEventListener(
            EVENTS.CLICK,
            this.eventClickedToRoot.bind(this)
        );
    }

    init() {

        const clondedTemplate = template.content.cloneNode(true);
        
        // Access cloned DOM elements.
        this.$style = clondedTemplate.querySelector('style');
        this.$root = clondedTemplate.getElementById('root-element');
        this.$innerContainer = clondedTemplate.getElementById('inner-container-element');
        this.$input = clondedTemplate.getElementById('input-element');
        this.$label = clondedTemplate.getElementById('label-element');
        this.$labelContainer = clondedTemplate.getElementById('label-container-element');
        this.$labelContainer.remove();

        // Attach events.
        this.$input.addEventListener(
            EVENTS.CHANGE, 
            this.eventChangedInputValue.bind(this)
        );
        this.$root.addEventListener(
            EVENTS.CLICK,
            this.eventClickedToRoot.bind(this)
        );
        
        const initialAttributes = this.attributes;
        for(var node of initialAttributes) {
            this.attributeChanged(node.name, node.value, node.value);
        }

        this.shadowRoot.appendChild(this.$style);
        this.shadowRoot.appendChild(this.$root);

        this.$root.classList.remove(CLASS.PENDING_INIT);
        this.$root.classList.add(CLASS.INIT);
    }

    /**
     * Update label container element state.
     * If value is falsy remove label conatiner
     * in root.
     * 
     * @param {string} value - Label text value.
     * @returns {void}
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
     * Invoked when input value change.
     * If input has any content, add HAS_VALUE class
     * to container element.
     * 
     * @param {Event} $event 
     * @return {void}
     */
    eventChangedInputValue($event) {

        const value = $event.target.value;
        this._value = value;
        Boolean(value) ? 
            this.$root.classList.add(CLASS.HAS_VALUE) : 
            this.$root.classList.remove(CLASS.HAS_VALUE);
    }

    /**
     * Invoked run when click to root element.
     * Focus to input element.
     * 
     * @param {Event} $event 
     * @return {void}
     */
    eventClickedToRoot($event) {
        $event.preventDefault();
        this.$input.focus();
    }
}

window.customElements.define(InputText.tagName, InputText);