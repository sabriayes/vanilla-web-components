/**
 * Generate ID selector path from string array.
 *
 * @function
 * @name convertIdSelector
 * @param {string} args - Selectors string
 * @return {string}
 * @example ```js
 * 	convertIdSelector('id1', 'id2', ...);
 * ```
 */
const convertIdSelector = (...args) => args.map((elem) => `#${elem}`).join(' ');
module.exports = convertIdSelector;
