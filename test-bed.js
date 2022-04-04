class TestBed {
	static async MockComponent(options) {
		let appRoot;
		window.customElements.define(options.selector, options.target);
		appRoot = await _waitForComponentToRender(options.selector);
		return appRoot;
	}

	static RemoveComponent(node) {
		document.removeChild(node);
	}
}

async function _waitForComponentToRender(tag) {
	let elem = document.createElement(tag);
	document.body.appendChild(elem);
	return new Promise((resolve) => {
		function requestComponent() {
			const element = document.querySelector(tag);
			if (element) {
				resolve(element);
				return;
			}
			window.requestAnimationFrame(requestComponent);
		}
		requestComponent();
	});
}

module.exports = TestBed;
