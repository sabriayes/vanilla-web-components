/**
 * @file password.js is the root file for VanillaPassword element
 * @author Sabri Ayeş <sabri@naylalabs.com>
 * @see <a href="https://naylalabs.com/vanilla">Vanilla Web Components</a>
 */

import HTML from './password.html';
import CSS from './password.scss';
import { Attrs, Classes, Events, Identities } from '#partials/js/consts';
import { createStyleElement, getAttributes } from '#partials/js/utils';
import { BasicInputElement } from '#partials/js/bases';

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
 * @augments BasicInputElement
 * @property {string} tagName - Getter for tag of custom element
 */
class VanillaPassword extends BasicInputElement {
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
	 * @override
	 * @static
	 * @readonly
	 * @returns {string} - Return tag name
	 */
	static get tagName() {
		return 'vanilla-password';
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
			[Events.TYPE_CHANGE]: this.onTypeChange,
		};
	}

	/**
	 * @override
	 * @return {(string)[]}
	 */
	static get observedAttributes() {
		return [Attrs.VALUE, Attrs.LABEL, Attrs.PLACEHOLDER, Attrs.TYPE];
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
			.setRef(Identities.SWITCH_BTN_CONTAINER)
			.setRef(Identities.SWITCH_BTN_SLOT);

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

		this.getRef(Identities.SWITCH_BTN_CONTAINER).addEventListener(
			Events.CLICK,
			this.onSwitchBtnClick.bind(this),
		);

		this.getRef(Identities.SWITCH_BTN_SLOT).addEventListener(
			Events.SLOT_CHANGE,
			this.onSwitchBtnSlotChange.bind(this),
		);
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
		this.getRef(Identities.ROOT).focus();
	}

	/**
	 * @private
	 * @function
	 * @name changeInputTypeAsText
	 * @returns {void}
	 */
	changeInputTypeAsText() {
		this.getRef(Identities.INPUT).setAttribute(Attrs.TYPE, TEXT);
	}

	/**
	 * @private
	 * @function
	 * @name changeInputTypeAsPassword
	 * @returns {void}
	 */
	changeInputTypeAsPassword() {
		this.getRef(Identities.INPUT).setAttribute(Attrs.TYPE, PASSWORD);
	}

	/**
	 * @private
	 * @function
	 * @name changeSwitchBtnAsPassword
	 * @returns {void}
	 */
	changeSwitchBtnAsPassword() {
		const switchBtnContainer = this.getRef(Identities.SWITCH_BTN_CONTAINER);
		switchBtnContainer.classList.remove(Classes.TYPE_TEXT);
		switchBtnContainer.classList.add(Classes.TYPE_PASSWORD);
	}

	/**
	 * @private
	 * @function
	 * @name changeSwitchBtnAsText
	 * @returns {void}
	 */
	changeSwitchBtnAsText() {
		const switchBtnContainer = this.getRef(Identities.SWITCH_BTN_CONTAINER);
		switchBtnContainer.classList.remove(Classes.TYPE_PASSWORD);
		switchBtnContainer.classList.add(Classes.TYPE_TEXT);
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
	 * @name onTypeChange
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
		}
	}

	/**
	 * @private
	 * @function
	 * @name onSwitchBtnClick
	 * @param {Event} $event
	 * @returns {void}
	 */
	onSwitchBtnClick($event) {
		const switchBtnSlot = this.getRef(Identities.SWITCH_BTN_SLOT);
		if (!this.hasSlotAnyNodes(switchBtnSlot)) {
			return;
		}
		this.isInputTypePassword = !this.isInputTypePassword;
		const type = this.isInputTypePassword ? PASSWORD : TEXT;
		this.getRef(Identities.ROOT).dispatchEvent(
			new CustomEvent(Events.TYPE_CHANGE, {
				bubbles: true,
				composed: true,
				detail: { type },
			}),
		);
	}

	/**
	 * @private
	 * @function
	 * @name onSwitchBtnSlotChange
	 * @param {Event} $event
	 * @returns {void}
	 */
	onSwitchBtnSlotChange($event) {
		const btnContainer = this.getRef(Identities.SWITCH_BTN_CONTAINER);
		if (!this.hasSlotAnyNodes($event.target)) {
			btnContainer.classList.remove(Classes.HAS_NODE);
			return;
		}
		btnContainer.classList.add(Classes.HAS_NODE);
	}
}

window.customElements.define(VanillaPassword.tagName, VanillaPassword);
