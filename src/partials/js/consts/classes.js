/**
 * @property {string} hasLabel - Element has a label
 * @property {string} hasValue - Input contains truly value
 * @property {string} init - Element init completed
 * @property {string} pendingInit - Element not initialized yet
 * @readonly
 */
const Classes = Object.freeze({
	HAS_LABEL: 'has-label',
	HAS_VALUE: 'has-value',
	PENDING_INIT: 'pending-init',
	INITIALIZED: 'initialized',
});

module.exports = Classes;
