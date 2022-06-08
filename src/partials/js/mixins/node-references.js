import {
	ReferenceNotFound,
	DuplicatedReference,
	MissingProperty,
} from '#partials/js/errors';
import {Identities} from "#partials/js/consts";

/**
 * @template T
 * @function
 * @name NodeReferences
 * @param {T} superClass
 * @returns {{new(): NodeReferences, prototype: NodeReferences}}
 * @mixin
 */
export function NodeReferences(superClass) {
	/** @lends NodeReferences */
	return class NodeReferences extends superClass {
		/**
		 * @public
		 * @readonly
		 * @type {Node}
		 */
		template;

		/**
		 * @private
		 * @readonly
		 * @type {Object<HTMLElement>}
		 * @default {}
		 */
		refs = {};

		/**
		 * @param {object} options
		 */
		constructor(options) {
			super(options);
			const { template } = options;
			if (!template) {
				throw new MissingProperty('template');
			}

			this.template = template.content.cloneNode(true);
		}

		/**
		 * @public
		 * @function
		 * @name hasRef
		 * @param {string} query
		 * @returns {boolean}
		 */
		hasRef(query) {
			return Boolean(this.refs[query]);
		}

		/**
		 * @public
		 * @function
		 * @name getRef
		 * @param {string} query
		 * @returns {HTMLElement|HTMLInputElement|undefined}
		 */
		getRef(query) {
			return this.refs[query];
		}

		/**
		 * @public
		 * @function
		 * @name setRef
		 * @param {string} query
		 * @returns {NodeReferences}
		 * @throws {DuplicatedReference} - Will throw this error if the
		 * query already exists in refs
		 * @throws {ReferenceNotFound} - Will throw this error if the
		 * searched element is not found in DOM
		 */
		setRef(query) {
			if (this.refs[query]) {
				throw new DuplicatedReference(query);
			}
			const foundElement = this.template.getElementById(query);
			if (!foundElement) {
				throw new ReferenceNotFound(query);
			}
			this.refs[query] = foundElement;
			return this;
		}
	};
}
