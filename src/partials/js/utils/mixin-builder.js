/**
 * @typedef {{prototype: HTMLElement, new(): HTMLElement}} HTMLElementExtended
 */

/**
 * @class
 * @template T
 * @property {HTMLElementExtended} superClass - Reference of parent class
 */
class MixinBuilder {
	/**
	 * @private
	 * @readonly
	 * @type {HTMLElementExtended}
	 */
	superClass;

	/**
	 * @param {HTMLElementExtended} superClass
	 */
	constructor(superClass) {
		this.superClass = superClass;
	}

	/**
	 * @public
	 * @function
	 * @name with
	 * @param {function(T): T} mixins
	 * @returns {HTMLElementExtended}
	 */
	with(...mixins) {
		return mixins.reduce(
			(current, mixin) => mixin(current),
			this.superClass,
		);
	}
}

/**
 * @function
 * @name mixer
 * @template {Constructor<{}>} T
 * @param {HTMLElementExtended} htmlElement
 * @returns {MixinBuilder}
 * @example ```js
 *  class SomeClass extends mixer(BaseClass).with(Mixin1, Mixin2) {}
 * ```
 */
export function mixer(htmlElement) {
	return new MixinBuilder(htmlElement);
}
