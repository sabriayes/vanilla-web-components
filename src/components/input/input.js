/**
 * @file input.js is the root file for VanillaInput element
 * @author Sabri Ayeş <sabri@naylalabs.com>
 * @see <a href="https://naylalabs.com/vanilla">Vanilla Web Components</a>
 */

const HTML = require('./input.html');
const CSS = require('./input.scss');
const { Attrs, Classes, Events } = require('partials/js/consts/index');
const {
	createStyleElement,
	getAttributes,
} = require('partials/js/utils/index');

/**
 * HTML template content.
 * @const {HTMLElementTagNameMap[string]} template
 */
const template = document.createElement('template');
template.innerHTML = HTML.toString();

/**
 * Class of custom text input element. HTML tag is [vanilla-input]
 * @class
 * @extends {HTMLElement}
 * @constructor
 * @property {string} tagName 				- Getter for tag of custom element
 * @property {HTMLElement} $root 			- Reference of main container div
 * @property {HTMLElement} $innerContainer 	- Reference of secondary container div
 * @property {HTMLElement} $input 			- Reference of input[type="text"]
 * @property {HTMLElement} $labelContainer	- Reference of container with label
 * @property {HTMLElement} $label			- Reference of label
 *
 */
class VanillaInput extends HTMLElement {
	/**
	 * @function {string} tagName
	 * @static
	 * @readonly
	 */
	static get tagName() {
		return 'vanilla-input';
	}

	/**
	 * [id="root-element"]
	 * @property {HTMLElement} $root
	 * @public
	 * @readonly
	 */
	$root;

	/**
	 * [id="inner-container-element"]
	 * @property {HTMLElement} $innerContainer
	 * @public
	 * @readonly
	 */
	$innerContainer;

	/**
	 * [id="input-element"]
	 * @property {HTMLElement} $input
	 * @public
	 * @readonly
	 */
	$input;

	/**
	 * [id="label-container-element"]
	 * @property {HTMLElement} $labelContainer
	 * @public
	 * @readonly
	 */
	$labelContainer;

	/**
	 * [id="label-element"]
	 * @property {HTMLElement} $label
	 * @public
	 * @readonly
	 */
	$label;

	/**
	 * Getter for current value.
	 * @public
	 * @return {string} - Return value of current state
	 */
	get value() {
		return this.$input.value || '';
	}

	/**
	 * Setter for value changing.
	 * @public
	 * @param {string} value
	 * @return {void}
	 */
	set value(value) {
		if (this.$input) {
			this.$input.value = value;
		}
	}

	/**
	 * Getter for text of label.
	 * @public
	 * @return {string} - Return text of label [$label]
	 */
	get label() {
		return this.getAttribute(Attrs.LABEL);
	}

	/**
	 * Setter for label text changing.
	 * @param {string} value
	 * @public
	 * @return {void}
	 */
	set label(value) {
		this.setAttribute(Attrs.LABEL, value);
	}

	/**
	 * Getter for event list with handler functions.
	 * @return {Object.<{ [p:string]: Event|Function }>} - Return event fixture
	 * @private
	 * @readonly
	 * @example ```js
	 * 	{ click: [object Function] }
	 * ```
	 */
	get events() {
		return {
			[Events.CLICK]: this.onClick,
			[Events.CHANGE]: this.onChange,
			[Events.FOCUS]: this.onFocus,
			[Events.INPUT]: this.onChange,
		};
	}

	constructor() {
		super();
		this.attachShadow({
			mode: 'open',
			delegatesFocus: true,
		});
	}

	connectedCallback() {
		this.init();
	}

	disconnectedCallback() {
		Object.entries(this.events).forEach(([event, func]) => {
			this.removeEventListener(event, function ($event) {
				func.call(this, $event);
			});
		});
	}

	static get observedAttributes() {
		return Object.values(Attrs);
	}

	attributeChangedCallback(name, value, newValue) {
		this.changeAttributeValue(name, value, newValue);
	}

	/**
	 * @param {string} name 	- Name of attribute
	 * @param {string} value 	- Value of current state
	 * @param {string} newValue - Value of new state
	 * @return {void}
	 */
	changeAttributeValue(name, value, newValue) {
		if (!newValue) {
			return;
		}

		switch (name) {
			case Attrs.LABEL:
				// Invoke when change value of label attr/property
				this.updateLabelElement(newValue);
				break;

			case Attrs.VALUE:
				this.$input.setAttribute(name, newValue);
				this.$input.dispatchEvent(new Event(Events.CHANGE));
				break;

			default:
				this.$input.setAttribute(name, newValue);
		}
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
		Object.entries(this.events).forEach(([event, func]) => {
			this.addEventListener(event, function ($event) {
				func.call(this, $event);
			});
		});

		for (const node of getAttributes(this)) {
			this.changeAttributeValue(node.name, node.value, node.value);
		}

		// Append styles to root element
		this.shadowRoot.appendChild(createStyleElement(CSS.toString()));

		this.shadowRoot.appendChild(this.$root);
		this.$root.classList.remove(Classes.PENDING_INIT);
		this.$root.classList.add(Classes.INITIALIZED);
	}

	/**
	 * Update state of label container element.
	 * If value is falsy remove label container
	 * in root.
	 *
	 * @param {string} value
	 * @private
	 * @returns {void}
	 */
	updateLabelElement(value) {
		if (Boolean(value)) {
			this.$root.classList.add(Classes.HAS_LABEL);
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
		this.$root.classList.remove(Classes.HAS_LABEL);
		this.$labelContainer.remove();
	}

	/**
	 * @param {string} value
	 * @private
	 * @return {void}
	 */
	toggleValueClass(value) {
		if (Boolean(value)) {
			this.$root.classList.add(Classes.HAS_VALUE);
			return;
		}
		this.$root.classList.remove(Classes.HAS_VALUE);
	}

	/**
	 * @private
	 * @return {void}
	 */
	focusToInput() {
		this.$input.focus();
	}

	/**
	 * @param {Event} $event
	 * @private
	 * @return {void}
	 */
	onChange($event) {
		this.toggleValueClass($event.target.value);
	}

	/**
	 * @param {Event} $event
	 * @private
	 * @return {void}
	 */
	onClick($event) {
		$event.preventDefault();
		this.focusToInput();
	}

	/**
	 * @param {Event} $event
	 * @private
	 * @return {void}
	 */
	onFocus($event) {
		$event.preventDefault();
		this.focusToInput();
	}
}

window.customElements.define(VanillaInput.tagName, VanillaInput);
