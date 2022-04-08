/**
 * Returns all attibutes of element as an array.
 * @param {HTMLElement} element - HTML element
 * @return {Object[]} 			- Array like [{ name: string, value: string }]
 */
export default function getAttributes(element) {
	return element
		.getAttributeNames()
		.map((name) => ({ name, value: element.getAttribute(name) }));
}
