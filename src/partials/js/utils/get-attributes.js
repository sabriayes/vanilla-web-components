export default function getAttributes(element) {
	return element
		.getAttributeNames()
		.map((name) => ({ name, value: element.getAttribute(name) }));
}
