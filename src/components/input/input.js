/**
 * @file input.js is the root file for VanillaInput element
 * @author Sabri Ayeş <sabri@naylalabs.com>
 * @see <a href="https://naylalabs.com/vanilla">Vanilla Web Components</a>
 */

import HTML from './input.html';
import CSS from './input.scss';
import { BasicInputElement } from '#partials/js/bases';
import { Attrs, Events, Classes, Identities } from '#partials/js/consts';
import { createStyleElement, getAttributes } from '#partials/js/utils';

/**
 * HTML template content.
 *
 * @constant {HTMLElementTagNameMap[string]} template
 */
const template = document.createElement('template');
template.innerHTML = HTML.toString();

/**
 * Class of custom text input element. HTML tag is [vanilla-input]
 *
 * @class
 * @augments BasicInputElement
 * @property {string} tagName 	- Getter for tag of custom element
 */
class VanillaInput extends BasicInputElement {
	/**
	 * @override
	 * @static
	 * @readonly
	 * @returns {string} - Return tag name
	 */
	static get tagName() {
		return 'vanilla-input';
	}

	/**
	 * Getter for event list with handler functions.
	 *
	 * @override
	 * @private
	 * @readonly
	 * @returns {Object<string, Event|Function>} - Return event fixture
	 * @example ```js
	 * 	get events() {
	 * 		return {
	 * 			[Events.CLICK]: ($event) => {},
	 * 		};
	 * 	}
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
		this.templateNode = template.content.cloneNode(true);
		this.setRef(Identities.ROOT)
			.setRef(Identities.INNER_CONTAINER)
			.setRef(Identities.INPUT)
			.setRef(Identities.LABEL_CONTAINER)
			.setRef(Identities.LABEL);

		this.getRef('label-container-element').remove();

		// Bind all event listeners
		this.addAllEventListeners();

		for (const node of getAttributes(this)) {
			this.changeAttributeValue(node.name, node.value, node.value);
		}

		// Append styles to root element
		this.shadowRoot.appendChild(createStyleElement(CSS.toString()));

		this.shadowRoot.appendChild(this.getRef(Identities.ROOT));
		this.getRef(Identities.ROOT).classList.remove(Classes.PENDING_INIT);
		this.getRef(Identities.ROOT).classList.add(Classes.INITIALIZED);
	}

	disconnectedCallback() {
		this.removeAllEventListeners();
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
		if (!this.getRef('root-element')) {
			return;
		}

		switch (name) {
			case Attrs.LABEL:
				// Invoke when change value of label attr/property
				this.updateLabelElement(newValue);
				break;

			case Attrs.VALUE:
				this.getRef('input-element').setAttribute(name, newValue);
				this.getRef('input-element').dispatchEvent(
					new Event(Events.CHANGE),
				);
				break;

			default:
				this.getRef('input-element').setAttribute(name, newValue);
		}
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
			this.getRef('root-element').classList.add(Classes.HAS_LABEL);
			this.getRef('inner-container-element').insertBefore(
				this.getRef('label-container-element'),
				this.getRef('inner-container-element').firstChild,
			);

			this.$labelContainer = this.getRef(
				'inner-container-element',
			).querySelector('label-container-element');
			this.getRef('label-element').innerHTML = value;
			return;
		}
		this.getRef('root-element').classList.remove(Classes.HAS_LABEL);
		this.getRef('label-container-element').remove();
	}

	/**
	 * @private
	 * @param {string} value
	 * @returns {void}
	 */
	toggleValueClass(value) {
		if (Boolean(value)) {
			this.getRef('root-element').classList.add(Classes.HAS_VALUE);
			return;
		}
		this.getRef('root-element').classList.remove(Classes.HAS_VALUE);
	}

	/**
	 * @private
	 * @returns {void}
	 */
	focusToInput() {
		this.getRef('input-element').focus();
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
}

window.customElements.define(VanillaInput.tagName, VanillaInput);
