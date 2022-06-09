const { WAIT_UNTIL } = require('../consts');

module.exports = class BasicInputElementModel {
	constructor(page, tagName, filePath) {
		this.page = page;
		this.tagName = tagName;
		this.filePath = filePath;
	}

	async initComponent() {
		await this.page.addScriptTag({ path: this.filePath });
	}

	async setComponent(html) {
		await this.page.setContent(html, WAIT_UNTIL);
		await this.page.waitForSelector(this.tagName);
		return this.page.locator(this.tagName);
	}

	async getComponent() {
		const rawHTML = `<${this.tagName}></${this.tagName}>`;
		return this.setComponent(rawHTML);
	}

	async getComponentWithValue() {
		const rawHTML = `<${this.tagName} value="VALUE_TEXT"></${this.tagName}>`;
		return this.setComponent(rawHTML);
	}

	async getComponentWithLabel() {
		const rawHTML = `<${this.tagName} label="SOME_TEXT"></${this.tagName}>`;
		return this.setComponent(rawHTML);
	}

	async getComponentWithInvalidAttr() {
		const rawHTML = `<${this.tagName} invalid></${this.tagName}>`;
		return this.setComponent(rawHTML);
	}

	async getComponentWithErrorMessages() {
		const rawHTML = `
			<${this.tagName} invalid>
				<span slot="errors">SOME_ERR_MESSAGES</span>
				<span slot="hint">SOME_DESCRIPTIONS</span>
			</${this.tagName}>
		`;
		return this.setComponent(rawHTML);
	}

	async getComponentWithHintText() {
		const rawHTML = `
			<${this.tagName}>
				<span slot="hint">SOME_DESCRIPTIONS</span>
			</${this.tagName}>
		`;
		return this.setComponent(rawHTML);
	}

	async getComponentWithLeadingIcon() {
		const rawHTML = `
			<${this.tagName}>
				<span slot="leading-icon">
					<i class="fa fa-user"></i>
				</span>
			</${this.tagName}>
		`;
		return this.setComponent(rawHTML);
	}
};
