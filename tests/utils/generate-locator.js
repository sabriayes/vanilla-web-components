const convertIdSelector = require('./convert-id-selector');

/**
 * Generate selector path from string array.
 *
 * @function
 * @name generateLocator
 * @param {string} elementTag - Element tag name
 * @param {string} args - Selectors string
 * @return {string}
 * @example ```js
 * 	generateLocator('elementName', 'id1', 'id2');
 * ```
 */
const generateLocator = (elementTag, ...args) => {
	if (!args.length) {
		return elementTag;
	}
	const mappedSelectors = convertIdSelector(...args);
	return [elementTag, mappedSelectors].join(' ');
};

module.exports = generateLocator;
