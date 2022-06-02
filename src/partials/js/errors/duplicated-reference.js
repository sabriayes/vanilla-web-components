/**
 * Custom error for duplicated element in DOM reference.
 *
 * @class
 * @augments {Error}
 */
export class DuplicatedReference extends Error {
	/**
	 * @param {string} query - The querystring that used for element searched
	 */
	constructor(query) {
		super();
		this.message = `Duplicated DOM reference with [${query}] query`;
		Error.captureStackTrace(this, DuplicatedReference);
	}
}
