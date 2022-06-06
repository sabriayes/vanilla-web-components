/**
 * @type {Object<string, any>}
 */
module.exports = {
	// Playwright
	WAIT_UNTIL: { waitUntil: 'domcontentloaded' },

	// Classes
	INITIALIZED: 'initialized',
	HAS_VALUE: 'has-value',
	HAS_LABEL: 'has-label',

	// Identities
	ROOT: 'root-element',
	INNER_CONTAINER: 'inner-container-element',
	INPUT_CONTAINER: 'input-container-element',
	INPUT: 'input-element',
	LABEL_CONTAINER: 'label-container-element',
	LABEL: 'label-element',
	SWITCH_BTN_CONTAINER: 'switch-btn-container-element',
	ERROR_MESSAGES_SLOT: 'error-messages-slot',
	HINT_TEXT_SLOT: 'hint-text-slot',
	LEADING_ICON_SLOT: 'leading-icon-slot',
	TRAILING_ICON_SLOT: 'trailing-icon-slot',
};
