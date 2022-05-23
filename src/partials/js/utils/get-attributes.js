/**
 * Returns all attributes of the element as an array.
 *
 * @param {HTMLElement} element - HTML element
 * @returns {Array<Object<{name: string, value: string}>>}
 */
export function getAttributes(element) {
	return element
		.getAttributeNames()
		.map((name) => ({ name, value: element.getAttribute(name) }));
}
