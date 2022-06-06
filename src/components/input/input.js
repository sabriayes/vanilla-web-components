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
 * @property {string} tagName - Getter for tag of custom element
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

	/**
	 * @override
	 * @return {(string)[]}
	 */
	static get observedAttributes() {
		return [Attrs.LABEL, Attrs.VALUE, Attrs.PLACEHOLDER];
	}

	constructor() {
		super({ template });
		this.attachShadow({
			mode: 'open',
			delegatesFocus: true,
		});
	}

	connectedCallback() {
		this.setRef(Identities.ROOT)
			.setRef(Identities.INNER_CONTAINER)
			.setRef(Identities.INPUT)
			.setRef(Identities.LABEL_CONTAINER)
			.setRef(Identities.LABEL);

		this.getRef(Identities.LABEL_CONTAINER).remove();

		const rootRef = this.getRef(Identities.ROOT);
		rootRef.classList.remove(Classes.PENDING_INIT);
		rootRef.classList.add(Classes.INITIALIZED);

		this.shadowRoot.appendChild(rootRef);
		this.shadowRoot.appendChild(createStyleElement(CSS.toString()));
		this.addAllEventListeners();

		for (const node of getAttributes(this)) {
			this.changeAttributeValue(node.name, node.value, node.value);
		}
	}

	disconnectedCallback() {
		this.removeAllEventListeners();
	}

	attributeChangedCallback(name, value, newValue) {
		this.changeAttributeValue(name, value, newValue);
	}

	/**
	 * @private
	 * @function
	 * @name focusToInput
	 * @returns {void}
	 */
	focusToInput() {
		this.getRef(Identities.INPUT).focus();
	}

	/**
	 * @private
	 * @function
	 * @name onChange
	 * @param {Event} $event
	 * @returns {void}
	 */
	onChange($event) {
		this.toggleValueClass($event.target.value);
	}

	/**
	 * @private
	 * @function
	 * @name onClick
	 * @param {Event} $event
	 * @returns {void}
	 */
	onClick($event) {
		$event.preventDefault();
		this.focusToInput();
	}

	/**
	 * @private
	 * @function
	 * @name onFocus
	 * @param {Event} $event
	 * @returns {void}
	 */
	onFocus($event) {
		$event.preventDefault();
		this.focusToInput();
	}
}

window.customElements.define(VanillaInput.tagName, VanillaInput);
