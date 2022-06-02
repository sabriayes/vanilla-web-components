/**
 * Custom error for no implemented methods.
 *
 * @class
 * @augments {Error}
 */
export class NotImplementedMethod extends Error {
	/**
	 * @param {string} methodName - Name of no implemented method
	 */
	constructor(methodName) {
		super();
		this.message = `[${methodName}] is not implemented yet`;
		Error.captureStackTrace(this, NotImplementedMethod);
	}
}
