/**
 * Returns all attibutes of the element as an array.
 *
 * @param {HTMLElement} element - HTML element
 * @returns {Array<Object<{name: string, value: string}>>}
 */
const getAttributes = function (element) {
	return element
		.getAttributeNames()
		.map((name) => ({ name, value: element.getAttribute(name) }));
};

module.exports = getAttributes;
