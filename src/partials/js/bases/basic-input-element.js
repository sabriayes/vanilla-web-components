import { Attrs, Events, Identities } from '#partials/js/consts';
import { EventManager, NodeReferences } from '#partials/js/mixins';
import { mixer } from '#partials/js/utils';
import { NotImplementedMethod } from '#partials/js/errors';

/**
 * @class
 * @augments {HTMLElement}
 * @mixes {EventManager}
 * @mixes {NodeReferences}
 * @property {string} tagName - Getter for tag name
 * @property {string} value - Getter for value of input element
 * @property {string} label - Getter for label content
 */
export class BasicInputElement extends mixer(HTMLElement).with(
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
}
