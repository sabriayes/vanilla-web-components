/**
 * @file password.js is the root file for VanillaPassword element
 * @author Sabri Ayeş <sabri@naylalabs.com>
 * @see <a href="https://naylalabs.com/vanilla">Vanilla Web Components</a>
 */

import HTML from './password.html';
import CSS from './password.scss';
import { Attrs, Classes, Events } from 'partials/js/consts';
import { createStyleElement, getAttributes } from 'partials/js/utils';

/**
 * HTML template content.
 *
 * @constant {HTMLElementTagNameMap[string]} template
 */
const template = document.createElement('template');
template.innerHTML = HTML.toString();

const TEXT = 'text';
const PASSWORD = 'password';

/**
 * Class of custom password input element. HTML tag is [vanilla-password]
 *
 * @class
 * @augments HTMLElement
 * @property {string} tagName 					- Getter for tag of custom element
 * @property {HTMLElement} $root 				- Reference of main container div
 * @property {HTMLElement} $innerContainer 		- Reference of secondary container div
 * @property {HTMLElement} $input 				- Reference of input[type="text|password"]
 * @property {HTMLElement} $labelContainer		- Reference of container with label
 * @property {HTMLElement} $label				- Reference of label
 * @property {HTMLElement} $switchBtnContainer	- Reference to switch button container
 */
class VanillaPassword extends HTMLElement {
	/**
	 * @static
	 * @readonly
	 * @returns {string} - Return tag name
	 */
	static get tagName() {
		return 'vanilla-password';
	}

	/**
	 * [id="root-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $root
	 */
	$root;

	/**
	 * [id="inner-container-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $innerContainer
	 */
	$innerContainer;

	/**
	 * [id="input-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $input
	 */
	$input;

	/**
	 * [id="label-container-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $labelContainer
	 */
	$labelContainer;

	/**
	 * [id="label-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $label
	 */
	$label;

	/**
	 * [id="switch-btn-container-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $switchBtnContainer
	 */
	$switchBtnContainer;

	/**
	 * Flag for input element type.
	 * If it falsy then input element type will be text.
	 *
	 * @private
	 * @property {boolean} isInputTypePassword
	 * @default true
	 */
	isInputTypePassword = true;

	/**
	 * Getter for current value.
	 *
	 * @public
	 * @returns {string}
	 */
	get value() {
		return this.$input.value || '';
	}

	/**
	 * Setter for value changing.
	 *
	 * @public
	 * @param {string} value
	 * @returns {void}
	 */
	set value(value) {
		if (this.$input) {
			this.$input.value = value;
		}
	}

	/**
	 * Getter for text of label.
	 *
	 * @public
	 * @returns {string}
	 */
	get label() {
		return this.getAttribute(Attrs.LABEL);
	}

	/**
	 * Setter for label text changing.
	 *
	 * @public
	 * @param {string} value
	 * @returns {void}
	 */
	set label(value) {
		this.setAttribute(Attrs.LABEL, value);
	}

	/**
	 * Getter for event list with handler functions.
	 *
	 * @private
	 * @readonly
	 * @returns {Object<string, Event|Function>} - Return event fixture
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
			[Events.TYPE_CHANGE]: this.onTypeChange,
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
	 * @returns {void}
	 */
	changeAttributeValue(name, value, newValue) {
		if (!this.$root) {
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

		this.$switchBtnContainer = clondedTemplate.getElementById(
			'switch-btn-container-element',
		);
		this.$switchBtnContainer.addEventListener(Events.CLICK, () => {
			this.isInputTypePassword = !this.isInputTypePassword;
			const type = this.isInputTypePassword ? PASSWORD : TEXT;
			this.$root.dispatchEvent(
				new CustomEvent(Events.TYPE_CHANGE, {
					bubbles: true,
					composed: true,
					detail: { type },
				}),
			);
		});

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
	 * If value is falsy remove label container in root.
	 *
	 * @private
	 * @param {string} value
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
	 * @private
	 * @param {string} value
	 * @returns {void}
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
	 * @returns {void}
	 */
	focusToInput() {
		this.$input.focus();
	}

	/**
	 * @private
	 * @returns {void}
	 */
	changeInputTypeAsText() {
		this.$input.setAttribute(Attrs.TYPE, 'text');
	}

	/**
	 * @private
	 * @returns {void}
	 */
	changeInputTypeAsPassword() {
		this.$input.setAttribute(Attrs.TYPE, 'password');
	}

	/**
	 * @private
	 * @returns {void}
	 */
	changeSwitchBtnAsPassword() {
		this.$switchBtnContainer.classList.remove(Classes.TYPE_TEXT);
		this.$switchBtnContainer.classList.add(Classes.TYPE_PASSWORD);
	}

	/**
	 * @private
	 * @returns {void}
	 */
	changeSwitchBtnAsText() {
		this.$switchBtnContainer.classList.remove(Classes.TYPE_PASSWORD);
		this.$switchBtnContainer.classList.add(Classes.TYPE_TEXT);
	}

	/**
	 * @private
	 * @param {Event} $event
	 * @returns {void}
	 */
	onChange($event) {
		this.toggleValueClass($event.target.value);
	}

	/**
	 * @private
	 * @param {Event} $event
	 * @returns {void}
	 */
	onClick($event) {
		$event.preventDefault();
		this.focusToInput();
	}

	/**
	 * @private
	 * @param {Event} $event
	 * @returns {void}
	 */
	onFocus($event) {
		$event.preventDefault();
		this.focusToInput();
	}

	/**
	 * @private
	 * @param {CustomEvent} $event
	 * @returns {void}
	 */
	onTypeChange($event) {
		const { type } = $event.detail;
		if (type === TEXT) {
			this.changeInputTypeAsText();
			this.changeSwitchBtnAsText();
			return;
		}

		if (type === PASSWORD) {
			this.changeInputTypeAsPassword();
			this.changeSwitchBtnAsPassword();
			return;
		}
	}
}

window.customElements.define(VanillaPassword.tagName, VanillaPassword);
