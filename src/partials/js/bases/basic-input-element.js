import { Attrs, Classes, Events, Identities } from '#partials/js/consts';
import { EventManager, NodeReferences, SlotManager } from '#partials/js/mixins';
import { mixer } from '#partials/js/utils';
import { NotImplementedMethod } from '#partials/js/errors';

/**
 * @class
 * @augments {HTMLElement}
 * @mixes {EventManager}
 * @mixes {NodeReferences}
 * @mixes {SlotManager}
 * @property {string} tagName - Getter for tag name
 * @property {string} value - Getter for value of input element
 * @property {string} label - Getter for label content
 */
export class BasicInputElement extends mixer(HTMLElement).with(
	SlotManager,
	EventManager,
	NodeReferences,
) {
	/**
	 * Getter for tag name.
	 *
	 * @static
	 * @function
	 * @name tagName
	 * @returns {string}
	 * @throws {NotImplementedError} - Will throw this error if the
	 * method not implemented in subclass
	 * @example ```js
	 * 	static get tagName() { return 'TAG_NAME'; }
	 * ```
	 */
	static get tagName() {
		throw new NotImplementedMethod('tagName()');
	}

	/**
	 * Setter for value changing.
	 *
	 * @public
	 * @param {string} value
	 * @returns {void}
	 */
	set value(value) {
		if (this.hasRef(Identities.INPUT)) {
			this.getRef(Identities.INPUT).value = value;
		}
	}

	/**
	 * Getter for current value.
	 *
	 * @public
	 * @returns {string}
	 */
	get value() {
		return this.getRef(Identities.INPUT).value || '';
	}

	/**
	 * Getter for label text.
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
	 * @param {object} options
	 */
	constructor(options) {
		super(options);
	}

	/**
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
	 * @function
	 * @name updateLabelElement
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
	 * @public
	 * @function
	 * @name updateClassByFlag
	 * @param {Object<{ element: HTMLElement, className: string, value: * }>} options
	 * @returns {void}
	 */
	updateClassByFlag(options) {
		const { element, value, className } = options;
		if (Boolean(value)) {
			element.classList.add(className);
			return;
		}
		element.classList.remove(className);
	}

	/**
	 * If the slot element has any node returns true.
	 *
	 * @public
	 * @function
	 * @name hasSlotAnyNodes
	 * @param {HTMLSlotElement} slotElem
	 * @returns {boolean}
	 */
	hasSlotAnyNodes(slotElem) {
		const assignedNodes = slotElem.assignedNodes();
		return Boolean(assignedNodes.length);
	}
}
