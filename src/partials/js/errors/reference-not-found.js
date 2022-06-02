/**
 * Custom error for the element that not found in DOM reference
 *
 * @class
 * @augments {Error}
 */
export class ReferenceNotFound extends Error {
	/**
	 * @param {string} query - The querystring that used for element searched
	 */
	constructor(query) {
		super();
		this.message = `Reference|Element not found in DOM [${query}]`;
		Error.captureStackTrace(this, ReferenceNotFound);
	}
}
