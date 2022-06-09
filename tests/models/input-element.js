const BasicInputElementModel = require('./basic-element');

module.exports = class VanillaInputModel extends BasicInputElementModel {
	constructor(page, tagName, filePath) {
		super(page, tagName, filePath);
	}

	async getComponentWithTrailingIcon() {
		const rawHTML = `
			<${this.tagName}>
				<span slot="trailing-icon">
					<i class="fa fa-check"></i>
				</span>
			</${this.tagName}>
		`;
		return this.setComponent(rawHTML);
	}
}
