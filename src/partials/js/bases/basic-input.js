import { Attrs, Events } from '../consts';

/**
 * Class of basic input element for vanilla component.
 *
 * @class
 * @augments HTMLElement
 * @property {string} tagName 				- Getter for tag of custom element
 * @property {HTMLElement} $root 			- Reference of main container div
 * @property {HTMLElement} $innerContainer 	- Reference of secondary container div
 * @property {HTMLElement} $input 			- Reference of input element
 * @property {HTMLElement} $labelContainer	- Reference of container with label
 * @property {HTMLElement} $label			- Reference of label
 */
export class BasicInputElement extends HTMLElement {
	/**
	 * [id="root-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $root
	 * @default undefined
	 */
	$root;

	/**
	 * [id="inner-container-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $innerContainer
	 * @default undefined
	 */
	$innerContainer;

	/**
	 * [id="input-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $input
	 * @default undefined
	 */
	$input;

	/**
	 * [id="label-container-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $labelContainer
	 * @default undefined
	 */
	$labelContainer;

	/**
	 * [id="label-element"]
	 *
	 * @public
	 * @readonly
	 * @property {HTMLElement} $label
	 * @default undefined
	 */
	$label;

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
	 * Setter for tag name.
	 *
	 * @static
	 * @readonly
	 * @returns {string} - Return tag name
	 */
	static get tagName() {
		throw new Error('This method has not been implemented yet');
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
		throw new Error('This method has not been implemented yet');
	}

	constructor() {
		super();
	}

	removeAllEventListeners() {
		const eventEntries = Object.entries(this.events);
		if (!eventEntries.length) {
			return;
		}
		eventEntries.forEach(([event, func]) => {
			this.removeEventListener(event, function ($event) {
				func.call(this, $event);
			});
		});
	}

	addAllEventListeners() {
		const eventEntries = Object.entries(this.events);
		if (!eventEntries.length) {
			return;
		}
		eventEntries.forEach(([event, func]) => {
			this.addEventListener(event, function ($event) {
				func.call(this, $event);
			});
		});
	}
}
