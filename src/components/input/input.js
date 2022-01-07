import HTML from './input.html';
import CSS from './input.scss';

/**
 * Template contents.
 * @var {HTMLElement} template
 */
const template = document.createElement('template');
template.innerHTML = HTML;

/**
 * CSS classes name.
 * @property {string} hasLabel    - Element has a label.
 * @property {string} hasValue    - Input contains truly value.
 * @property {string} init        - Element init completed.
 * @property {string} pendingInit - Element not initialized yet.
 * @readonly
 */
const CLASSES = {
    hasLabel: 'has-label',
    hasValue: 'has-value',
    pendingInit: 'pending-init',
    init: 'initialized'
}

/**
 * Custom component attribues.
 * @property {string} label       - Alias of label attr.
 * @property {string} placeholder - Alias of placeholder attr.
 * @property {string} value       - Alias of value attr.
 * @readonly
 */
const ATTRS = {
    label: 'label',
    placeholder: 'placeholder',
    value: 'value'
}

/**
 * Event list.
 * @property {string} change     - Alias change event.
 * @property {string} click      - Alias click event.
 * @property {string} slotChange - Alias slot change event.
 * @readonly
 */
 const EVENTS = {
     change: 'change',
     click: 'click',
     slotChange: 'slotchange'
}

/**
 * Custom text input element classES.
 * HTML tags is <vanilla-input>
 * 
 * @class
 * @extends {HTMLElement}
 * @constructor
 */
class VanillaInput extends HTMLElement {

    /**
     * Tag name of VanillaInput
     * @property {string} tagName
     * @static
     */
    static get tagName() {
        return 'vanilla-input';
    }
    
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
     * Get current value.
     * @return {string}
     */
    get value() {
        return this.$input.value || '';
    }

    /**
     * Set value.
     * @return {void} 
     */
    set value(val) {
        if(this.$input) 
            this.$input.value = val;
    }

    /**
     * Get label property value.
     * @return {string}
     */
    get label() {
        return this.getAttribute(ATTRS.label);
    }

    /**
     * Set label property value.
     * @param {string} value
     * @return {void}
     */
    set label(value) {
        this.setAttribute(ATTRS.label, value);
    }

    static get observedAttributes() {
        return Object.values(ATTRS);
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
            case ATTRS.label:
                // Invoke when change label attr/property value.
                this.generateLabelElement(newValue);
            break;

            case ATTRS.VALUE:
                // Dispatch change event with fake event.
                const fakeEvent = new Event(EVENTS.change);
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
            EVENTS.change, 
            this.eventChangedInputValue.bind(this)
        );
        this.$root?.removeEventListener(
            EVENTS.click,
            this.eventClickedToRoot.bind(this)
        );
    }

    init() {

        const clondedTemplate = template.content.cloneNode(true);
        
        // Access cloned DOM elements.
        this.$root = clondedTemplate.getElementById('root-element');
        this.$innerContainer = clondedTemplate.getElementById('inner-container-element');
        this.$input = clondedTemplate.getElementById('input-element');
        this.$label = clondedTemplate.getElementById('label-element');
        this.$labelContainer = clondedTemplate.getElementById('label-container-element');
        this.$labelContainer.remove();

        // Attach events.
        this.$input.addEventListener(
            EVENTS.change, 
            this.eventChangedInputValue.bind(this)
        );
        this.$root.addEventListener(
            EVENTS.click,
            this.eventClickedToRoot.bind(this)
        );
        
        const initialAttributes = this.attributes;
        for(var node of initialAttributes) {
            this.attributeChanged(node.name, node.value, node.value);
        }

        const css = document.createElement('style');
        
        if(css.styleSheet) {
            css.styleSheet.cssText = CSS;
        } 
        else {
            const textNode = document.createTextNode(CSS);
            css.appendChild(textNode);
        }
            
        this.shadowRoot.appendChild(css);
        this.shadowRoot.appendChild(this.$root);

        this.$root.classList.remove(CLASSES.pendingInit);
        this.$root.classList.add(CLASSES.init);
    }

    /**
     * Update state of label container element.
     * If value is falsy remove label container
     * in root.
     * 
     * @param {string} value - Label text value.
     * @returns {void}
     */
    generateLabelElement(value) {

        if(Boolean(value)) {

            this.$root.classList.add(CLASSES.hasLabel);
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
            this.$root.classList.remove(CLASSES.hasLabel);
            this.$labelContainer.remove();
        }
    }
    
    /**
     * Invoked when input value change.
     * If input has any content, add hasValue class
     * to container element.
     * 
     * @param {Event} $event 
     * @return {void}
     */
    eventChangedInputValue($event) {

        const value = $event.target.value;
        if(Boolean(value)) {
            this.$root.classList.add(CLASSES.hasValue)
        }
        else {
            this.$root.classList.remove(CLASSES.hasValue);
        }            
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

window.customElements.define(VanillaInput.tagName, VanillaInput);