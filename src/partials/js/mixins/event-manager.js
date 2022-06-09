import { NotImplementedMethod } from '#partials/js/errors';

/**
 * @template T
 * @function
 * @name EventManager
 * @param {T} superClass
 * @returns {{new(): EventManager, prototype: EventManager}}
 * @mixin
 */
export function EventManager(superClass) {
	/** @lends EventManager */
	return class EventManager extends superClass {
		/**
		 * Getter for event list with handler functions.
		 *
		 * @private
		 * @readonly
		 * @returns {Object<string, Event|Function>} - Event fixture object
		 * @throws {NotImplementedMethod} - Will throw this error if the
		 * method not implemented in subclass
		 * @example ```js
		 * 	get events() {
		 * 		return {
		 * 			[Events.CLICK]: ($event) => {},
		 * 		};
		 * 	}
		 * ```
		 */
		get events() {
			throw new NotImplementedMethod('events()');
		}

		constructor() {
			super();
		}

		/**
		 * @function
		 * @name removeAllEventListeners
		 * @returns {void}
		 */
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

		/**
		 * @function
		 * @name addAllEventListeners
		 * @returns {void}
		 */
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
	};
}
