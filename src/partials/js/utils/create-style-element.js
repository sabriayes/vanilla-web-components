/**
 * Returns a <style> element with appended styles.
 *
 * @param {string} cssText - CSS style sheet content
 * @returns {HTMLElement}
 */
const createStyleElement = function (cssText) {
	const styleElement = document.createElement('style');
	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = cssText;
		return styleElement;
	}
	const textNode = document.createTextNode(cssText);
	styleElement.appendChild(textNode);
	return styleElement;
};

module.exports = createStyleElement;
