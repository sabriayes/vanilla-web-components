import { NotImplementedMethod } from '#partials/js/errors';
import { Events } from '#partials/js/consts';

/**
 * @template T
 * @function
 * @name SlotManager
 * @param {T} superClass
 * @returns {{new(): SlotManager, prototype: SlotManager}}
 * @mixin
 */
export function SlotManager(superClass) {
	/** @lends SlotManager */
	return class SlotManager extends superClass {
		/**
		 * Getter for slots list with event handler functions.
		 *
		 * @private
		 * @readonly
		 * @returns {Array<Object<HTMLSlotElement, Event|Function>>} - Event fixture object
		 * @throws {NotImplementedMethod} - Will throw this error if the
		 * method not implemented in subclass
		 * @example ```js
		 * 	get slots() {
		 * 		return [
		 * 		 	{
		 * 		 	 	elem: this.getRef(Identities.LEADING_ICON_SLOT),
		 * 		 	 	func: ($event) => { }
		 * 		 	},
		 * 		];
		 * 	}
		 * ```
		 */
		get slots() {
			throw new NotImplementedMethod('slots()');
		}

		constructor() {
			super();
		}

		/**
		 * @function
		 * @name unsetSlotHandlers
		 * @returns {void}
		 */
		unsetSlotHandlers() {
			if (!this.slots.length) {
				return;
			}
			this.slots.forEach((slot) => {
				slot.elem.removeEventListener(
					Events.SLOT_CHANGE,
					function ($event) {
						slot.func.call(this, $event);
					},
				);
			});
		}

		/**
		 * @function
		 * @name setSlotHandlers
		 * @returns {void}
		 */
		setSlotHandlers() {
			if (!this.slots.length) {
				return;
			}
			this.slots.forEach((slot) => {
				slot.elem.addEventListener(
					Events.SLOT_CHANGE,
					function ($event) {
						slot.func.call(this, $event);
					},
				);
			});
		}
	};
}
