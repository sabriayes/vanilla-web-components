/**
 * Custom error for the missing property in options.
 *
 * @class
 * @augments {Error}
 */
export class MissingProperty extends Error {
	/**
	 * @param {string} property
	 */
	constructor(property) {
		super();
		this.message = `Missing property [${property}] in options`;
		Error.captureStackTrace(this, MissingProperty);
	}
}
