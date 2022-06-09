const BasicInputElementModel = require('./basic-element');

module.exports = class VanillaInputModel extends BasicInputElementModel {
	constructor(page, tagName, filePath) {
		super(page, tagName, filePath);
	}

	async getComponentWithTrailingIcon() {
		const rawHTML = `
			<${this.tagName}>
				<span slot="leading-icon">
					<i class="fa fa-user"></i>
				</span>
			</${this.tagName}>
		`;
		return this.setComponent(rawHTML);
	}
}
