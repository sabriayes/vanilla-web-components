const { Window } = require('happy-dom');
const window = new Window();

Object.defineProperties(global, {
	document: {
		value: window.document,
		writable: true,
		configurable: true,
	},
	HTMLElement: {
		value: window.HTMLElement,
		writable: true,
		configurable: true,
	},
	customElements: {
		value: window.customElements,
		writable: true,
		configurable: true,
	},
	window: {
		value: window,
		writable: true,
		configurable: true,
	},
});
