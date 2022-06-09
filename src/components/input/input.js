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
	 * Getter for slots list with event handler functions.
	 *
	 * @override
	 * @private
	 * @readonly
	 */
	get slots() {
		const leadingSlotElem = this.getRef(Identities.LEADING_ICON_SLOT);
		const trailingSlotElem = this.getRef(Identities.TRAILING_ICON_SLOT);
		return [
			{
				elem: leadingSlotElem,
				func: ($event) =>
					this.onReservedSlotChange($event, Classes.HAS_LEADING_ICON),
			},
			{
				elem: trailingSlotElem,
				func: ($event) =>
					this.onReservedSlotChange(
						$event,
						Classes.HAS_TRAILING_ICON,
					),
			},
		];
	}

	/**
	 * @override
	 * @returns {(string)[]}
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
			.setRef(Identities.LABEL)
			.setRef(Identities.LEADING_ICON_SLOT)
			.setRef(Identities.TRAILING_ICON_SLOT);


		this.getRef(Identities.LABEL_CONTAINER).remove();

		const rootRef = this.getRef(Identities.ROOT);
		rootRef.classList.remove(Classes.PENDING_INIT);
		rootRef.classList.add(Classes.INITIALIZED);

		this.shadowRoot.appendChild(rootRef);
		this.shadowRoot.appendChild(createStyleElement(CSS.toString()));
		this.addAllEventListeners();
		this.setSlotHandlers();

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
		const value = $event.target.value;
		const element = this.getRef(Identities.ROOT);
		const className = Classes.HAS_VALUE;
		this.updateClassByFlag({
			value,
			element,
			className,
		});
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

	/**
	 * @private
	 * @function
	 * @name onReservedSlotChange
	 * @param {Event} $event
	 * @param {string} className
	 * @returns {void}
	 */
	onReservedSlotChange($event, className) {
		$event.preventDefault();
		const value = this.hasSlotAnyNodes($event.target);
		const element = this.getRef(Identities.ROOT);
		this.updateClassByFlag({
			value,
			element,
			className,
		});
	}
}

window.customElements.define(VanillaInput.tagName, VanillaInput);
