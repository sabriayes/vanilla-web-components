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
		super({
			template,
			styleSheets: CSS.toString(),
		});
		this.attachShadow({
			mode: 'open',
			delegatesFocus: true,
		});
	}

	connectedCallback() {
		//this.template = template.content.cloneNode(true);

		this.setRef(Identities.ROOT)
			.setRef(Identities.INNER_CONTAINER)
			.setRef(Identities.INPUT)
			.setRef(Identities.LABEL_CONTAINER)
			.setRef(Identities.LABEL);

		this.getRef(Identities.LABEL_CONTAINER).remove();

		this.addAllEventListeners();

		for (const node of getAttributes(this)) {
			this.changeAttributeValue(node.name, node.value, node.value);
		}

		this.shadowRoot.appendChild(createStyleElement(CSS.toString()));

		const rootRef = this.getRef(Identities.ROOT);

		this.shadowRoot.appendChild(rootRef);
		rootRef.classList.remove(Classes.PENDING_INIT);
		rootRef.classList.add(Classes.INITIALIZED);
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
	 * @function
	 * @name changeAttributeValue
	 * @param {string} name - Name of attribute
	 * @param {string} value - Value of current state
	 * @param {string} newValue - Value of new state
	 * @returns {void}
	 */
	changeAttributeValue(name, value, newValue) {
		if (!this.hasRef(Identities.ROOT)) {
			return;
		}

		const root = this.getRef(Identities.ROOT);

		switch (name) {
			case Attrs.LABEL:
				this.updateLabelElement(newValue);
				break;

			case Attrs.VALUE:
				root.setAttribute(name, newValue);
				root.dispatchEvent(new Event(Events.CHANGE));
				break;

			default:
				root.setAttribute(name, newValue);
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
		const root = this.getRef(Identities.ROOT);
		const innerContainer = this.getRef(Identities.INNER_CONTAINER);
		const labelContainer = this.getRef(Identities.LABEL_CONTAINER);
		const label = this.getRef(Identities.LABEL);

		if (!Boolean(value)) {
			root.classList.remove(Classes.HAS_LABEL);
			labelContainer.remove();
			return;
		}

		root.classList.add(Classes.HAS_LABEL);
		innerContainer.insertBefore(labelContainer, innerContainer.firstChild);
		label.innerHTML = value;
	}

	/**
	 * @private
	 * @param {string} value
	 * @returns {void}
	 */
	toggleValueClass(value) {
		const root = this.getRef(Identities.ROOT);
		if (Boolean(value)) {
			root.classList.add(Classes.HAS_VALUE);
			return;
		}
		root.classList.remove(Classes.HAS_VALUE);
	}

	/**
	 * @private
	 * @returns {void}
	 */
	focusToInput() {
		this.getRef(Identities.INPUT).focus();
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
