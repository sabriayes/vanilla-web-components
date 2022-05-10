const HTML = require('./input.html');
const CSS = require('./input.scss');
const { Attrs, Classes, Events } = require('partials/js/consts/index');
const {
	createStyleElement,
	getAttributes,
} = require('partials/js/utils/index');

/**
 * HTML template content.
 * @var {HTMLElement} template
 */
const template = document.createElement('template');
template.innerHTML = HTML.toString();

/**
 * Custom text input element class. HTML tag is <vanilla-input>
 * @class
 * @extends {HTMLElement}
 * @constructor
 */
class VanillaInput extends HTMLElement {
	/**
	 * @property {string} tagName
	 * @static
	 */
	static get tagName() {
		return 'vanilla-input';
	}

	/**
	 * #root-element
	 * @property {HTMLElement} $root
	 * @public
	 */
	$root;

	/**
	 * #inner-container-element
	 * @property {HTMLElement} $innerContainer
	 * @public
	 */
	$innerContainer;

	/**
	 * #input-element
	 * @property {HTMLElement} $input
	 * @input
	 */
	$input;

	/**
	 * #label-container-element
	 * @property {HTMLElement} $labelContainer
	 * @public
	 */
	$labelContainer;

	/**
	 * #label-element
	 * @property {HTMLElement} $label
	 * @public
	 */
	$label;

	/**
	 * @return {string}
	 */
	get value() {
		return this.$input.value || '';
	}

	/**
	 * @return {void}
	 */
	set value(val) {
		if (this.$input) {
			this.$input.value = val;
		}
	}

	/**
	 * @return {string}
	 */
	get label() {
		return this.getAttribute(Attrs.LABEL);
	}

	/**
	 * @param {string} value
	 * @return {void}
	 */
	set label(value) {
		this.setAttribute(Attrs.LABEL, value);
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
		this.$input.removeEventListener(
			Events.CHANGE,
			this._eventChangedInputValue.bind(this),
		);
		this.$root.removeEventListener(
			Events.CLICK,
			this._eventClickedToRoot.bind(this),
		);
		this.$root.removeEventListener(
			Events.FOCUS,
			this._eventFocusedToRoot.bind(this),
		);
	}

	static get observedAttributes() {
		return Object.values(Attrs);
	}

	/**
	 * @param {string} name - Attribute name
	 * @param {string} value - Current value
	 * @param {string} newValue - Updated value
	 * @return {void}
	 */
	attributeChangedCallback(name, value, newValue) {
		this.changeAttributeValue(name, value, newValue);
	}

	/**
	 * @param {string} name - Attribute name
	 * @param {string} value - Current value
	 * @param {string} newValue - Updated value
	 * @return {void}
	 */
	changeAttributeValue(name, value, newValue) {
		if (!value) {
			return;
		}

		switch (name) {
			case Attrs.LABEL:
				// Invoke when change value of label attr/property
				this.updateLabelElement(newValue);
				break;

			case Attrs.VALUE:
				// Dispatch change event with fake event object
				const fakeEvent = new Event(Events.CHANGE);
				this.$input.setAttribute(name, newValue);
				this.$input.dispatchEvent(fakeEvent);
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
		this.$input.addEventListener(
			Events.CHANGE,
			this._eventChangedInputValue.bind(this),
		);
		this.$root.addEventListener(
			Events.CLICK,
			this._eventClickedToRoot.bind(this),
		);
		this.$root.addEventListener(
			Events.FOCUS,
			this._eventFocusedToRoot.bind(this),
		);

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
	 * @param {string} value - Label text value
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
	 * @param {Event} $event
	 * @return {void}
	 */
	_eventChangedInputValue($event) {
		const value = $event.target.value;
		if (Boolean(value)) {
			this.$root.classList.add(Classes.HAS_VALUE);
			return;
		}
		this.$root.classList.remove(Classes.HAS_VALUE);
	}

	/**
	 * @param {Event} $event
	 * @return {void}
	 */
	_eventClickedToRoot($event) {
		$event.preventDefault();
		this.$input.focus();
	}

	/**
	 * @param {Event} $event
	 * @return {void}
	 */
	_eventFocusedToRoot($event) {
		$event.preventDefault();
		this.$input.focus();
	}
}

window.customElements.define(VanillaInput.tagName, VanillaInput);
