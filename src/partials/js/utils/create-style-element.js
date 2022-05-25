/**
 * Returns a <style> element with appended styles.
 *
 * @param {string} cssText - CSS style sheet content
 * @returns {HTMLElement}
 */
export function createStyleElement(cssText) {
	const styleElement = document.createElement('style');
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssText;
		return styleElement;
	}
	const textNode = document.createTextNode(cssText);
	styleElement.appendChild(textNode);
	return styleElement;
}
