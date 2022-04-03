import HTML from './input.html';
import CSS from './input.scss';

/**
 * HTML template content.
 * @var {HTMLElement} template
 */
const template = document.createElement('template');
template.innerHTML = HTML;

/**
 * CSS classes.
 * @property {string} hasLabel    - Element has a label
 * @property {string} hasValue    - Input contains truly value
 * @property {string} init        - Element init completed
 * @property {string} pendingInit - Element not initialized yet
 * @readonly
 */
const CLASSES = {
	hasLabel: 'has-label',
	hasValue: 'has-value',
	pendingInit: 'pending-init',
	initialized: 'initialized',
};

/**
 * All custom attributes.
 * @property {string} label       - Alias of label attr
 * @property {string} placeholder - Alias of placeholder attr
 * @property {string} value       - Alias of value attr
 * @readonly
 */
const ATTRS = {
	label: 'label',
	placeholder: 'placeholder',
	value: 'value',
};

/**
 * All event aliases.
 * @property {string} change     - Alias of change event
 * @property {string} click      - Alias of click event
 * @property {string} slotChange - Alias of slot change event
 * @readonly
 */
const EVENTS = {
	change: 'change',
	click: 'click',
	slotChange: 'slotchange',
};

/**
 * Returns a <style> element with appended styles.
 * @param {string} cssText - CSS style sheet content.
 * @return {HTMLElement}
 */
const getStyleElement = function (cssText) {
	const styleElement = document.createElement('style');
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssText;
		return styleElement;
	}
	const textNode = document.createTextNode(cssText);
	styleElement.appendChild(textNode);
	return styleElement;
};

/**
 * Custom text input element class. HTML tag is <vanilla-input>
 * @class
 * @extends {HTMLElement}
 * @constructor
 */
class VanillaInput extends HTMLElement {
	/**
	 * Tag name of custom element.
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
	 * Getter method for input value.
	 * @return {string}
	 */
	get value() {
		return this.$input.value || '';
	}

	/**
	 * Setter method for input value.
	 * @return {void}
	 */
	set value(val) {
		if (this.$input) {
			this.$input.value = val;
		}
	}

	/**
	 * Getter method for label property.
	 * @return {string}
	 */
	get label() {
		return this.getAttribute(ATTRS.label);
	}

	/**
	 * Setter method for label property.
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
	 * Invoked when change/update attributes that defined
	 * at observedAttributes() function.
	 *
	 * @param {string} name     - Attribute name
	 * @param {string} value    - Attribute current value
	 * @param {string} newValue - Attribute updated value
	 * @return {void}
	 */
	attributeChangedCallback(name, value, newValue) {
		this.changeAttributeValue(name, value, newValue);
	}

	/**
	 * Helper function that called by init() and
	 * attributeChangedCallback()
	 *
	 * @param {string} name     - Attribute name
	 * @param {string} value    - Attribute current value
	 * @param {string} newValue - Attribute updated value
	 * @return {void}
	 */
	changeAttributeValue(name, value, newValue) {
		if (!value) {
			return;
		}

		switch (name) {
			case ATTRS.label:
				// Invoke when change value of label attr/property
				this.updateLabelElement(newValue);
				break;

			case ATTRS.value:
				// Dispatch change event with fake event object
				const fakeEvent = new Event(EVENTS.change);
				this.$input.setAttribute(name, newValue);
				this.$input.dispatchEvent(fakeEvent);
				break;

			default:
				this.$input.setAttribute(name, newValue);
		}
	}

	connectedCallback() {
		this.init();
	}

	disconnectedCallback() {
		this.$input.removeEventListener(
			EVENTS.change,
			this._eventChangedInputValue.bind(this),
		);
		this.$root.removeEventListener(
			EVENTS.click,
			this._eventClickedToRoot.bind(this),
		);
	}

	init() {
		const clondedTemplate = template.content.cloneNode(true);

		// Access cloned DOM elements
		this.$root = clondedTemplate.getElementById('root-element');
		this.$innerContainer = clondedTemplate.getElementById(
			'inner-container-element',
		);
		this.$input = clondedTemplate.getElementById('input-element');
		this.$label = clondedTemplate.getElementById('label-element');
		this.$labelContainer = clondedTemplate.getElementById(
			'label-container-element',
		);
		this.$labelContainer.remove();

		// Bind all event listeners
		this.$input.addEventListener(
			EVENTS.change,
			this._eventChangedInputValue.bind(this),
		);
		this.$root.addEventListener(
			EVENTS.click,
			this._eventClickedToRoot.bind(this),
		);

		for (const node of this.attributes) {
			this.changeAttributeValue(node.name, node.value, node.value);
		}

		// Append styles to root element
		this.shadowRoot.appendChild(getStyleElement(CSS));

		this.shadowRoot.appendChild(this.$root);
		this.$root.classList.remove(CLASSES.pendingInit);
		this.$root.classList.add(CLASSES.initialized);
	}

	/**
	 * Update state of label container element.
	 * If value is falsy remove label container
	 * in root.
	 *
	 * @param {string} value - Label text value
	 * @returns {void}
	 */
	updateLabelElement(value) {
		if (Boolean(value)) {
			this.$root.classList.add(CLASSES.hasLabel);
			this.$innerContainer.insertBefore(
				this.$labelContainer,
				this.$innerContainer.firstChild,
			);

			this.$labelContainer = this.$innerContainer.querySelector(
				'#label-container-element',
			);
			this.$label = this.$innerContainer.querySelector('#label-element');
			this.$label.innerHTML = value;
			return;
		}
		this.$root.classList.remove(CLASSES.hasLabel);
		this.$labelContainer.remove();
	}

	/**
	 * Invoked when input value change.
	 * If input has any content, add hasValue class
	 * to container element.
	 *
	 * @param {Event} $event
	 * @return {void}
	 */
	_eventChangedInputValue($event) {
		const value = $event.target.value;
		if (Boolean(value)) {
			this.$root.classList.add(CLASSES.hasValue);
			return;
		}
		this.$root.classList.remove(CLASSES.hasValue);
	}

	/**
	 * Invoked run when click to root element.
	 * Focus to input element.
	 *
	 * @param {Event} $event
	 * @return {void}
	 */
	_eventClickedToRoot($event) {
		$event.preventDefault();
		this.$input.focus();
	}
}

window.customElements.define(VanillaInput.tagName, VanillaInput);
