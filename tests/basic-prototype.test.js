const { test, expect } = require('@playwright/test');
const { generateLocator, convertIdSelector } = require('./utils');
const {
	WAIT_UNTIL,
	INITIALIZED,
	HAS_VALUE,
	HAS_LABEL,
	ROOT,
	LABEL,
	ERROR_MESSAGES_SLOT,
	HINT_TEXT_SLOT,
	LEADING_ICON_SLOT,
	TRAILING_ICON_SLOT,
} = require('./consts');

const components = [
	{
		instanceName: 'VanillaInput',
		tagName: 'vanilla-input',
		scriptPath: './dist/input.min.js',
	},
	{
		instanceName: 'VanillaPassword',
		tagName: 'vanilla-password',
		scriptPath: './dist/password.min.js',
	},
];

for (const component of components) {
	test.describe(`The ${component.instanceName} instance`, () => {
		test.beforeEach(async ({ page }) => {
			await page.addScriptTag({
				path: component.scriptPath,
			});
		});

		test.describe('when define basically', () => {
			test('should be defined on DOM', async ({ page }) => {
				const rawHTML = `<${component.tagName}></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const inputElem = await page.waitForSelector(component.tagName);
				expect(inputElem).toBeDefined();
			});

			test('should have [initialized] class', async ({ page }) => {
				const rawHTML = `<${component.tagName}></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				await expect(
					page.locator(generateLocator(component.tagName, ROOT)),
				).toHaveClass(new RegExp(INITIALIZED));
			});

			test('[LABEL] should be removed', async ({ page }) => {
				const rawHTML = `<${component.tagName}></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const labelElem = await page.$eval(
					component.tagName,
					(elem, selector) =>
						elem.shadowRoot.querySelector(String(selector)),
					convertIdSelector(LABEL),
				);
				await expect(labelElem).toBeNull();
			});
		});

		test.describe('when define with [LABEL]', () => {
			test('should have [has-label] class', async ({ page }) => {
				const rawHTML = `<${component.tagName} label="FOO"></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const rootElem = page.locator(
					generateLocator(component.tagName, ROOT),
				);
				await expect(rootElem).toHaveClass(new RegExp(HAS_LABEL));
			});

			test('[LABEL] should be visible', async ({ page }) => {
				const rawHTML = `<${component.tagName} label="FOO"></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const labelElem = page.locator(
					generateLocator(component.tagName, LABEL),
				);
				await expect(labelElem).toBeVisible();
			});

			test('[LABEL] should has some text', async ({ page }) => {
				const rawHTML = `<${component.tagName} label="FOO"></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const labelElem = page.locator(
					generateLocator(component.tagName, LABEL),
				);
				await expect(labelElem).toHaveText(/.*/);
			});
		});

		test.describe('when define with [invalid] attribute', () => {
			test('[ERROR MESSAGES] should be visible', async ({ page }) => {
				const rawHTML = `
					<${component.tagName} invalid>
						<span slot="errors">ERR MSG</span>
					</${component.tagName}>
				`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const errSlotElem = page.locator(
					generateLocator(component.tagName, ERROR_MESSAGES_SLOT),
				);
				await expect(errSlotElem).toBeVisible();
			});

			test('[HINT TEXT] should be hidden', async ({ page }) => {
				const rawHTML = `<${component.tagName} invalid></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const hintSlotElem = page.locator(
					generateLocator(component.tagName, HINT_TEXT_SLOT),
				);
				await expect(hintSlotElem).not.toBeVisible();
			});
		});

		test.describe('when define with [HINT TEXT]', () => {
			test('[HINT TEXT] should be visible', async ({ page }) => {
				const rawHTML = `
					<${component.tagName}>
						<span slot="hint">HINT TXT</span>
					</${component.tagName}>
				`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const hintSlotElem = page.locator(
					generateLocator(component.tagName, HINT_TEXT_SLOT),
				);
				await expect(hintSlotElem).toBeVisible();
			});
		});

		test.describe('when define with [ICONS]', () => {
			test('[LEADING ICON] should be visible', async ({ page }) => {
				const rawHTML = `
					<${component.tagName}>
						<span slot="leading-icon">
							<i class="fa fa-user"></i>
						</span>
					</${component.tagName}>
				`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const iconSlotElem = page.locator(
					generateLocator(component.tagName, LEADING_ICON_SLOT),
				);
				await expect(iconSlotElem).toBeVisible();
			});

			test('[TRAILING ICON] should be visible', async ({ page }) => {
				const rawHTML = `
					<${component.tagName}>
						<span slot="trailing-icon">
							<i class="fa fa-user"></i>
						</span>
					</${component.tagName}>
				`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const iconSlotElem = page.locator(
					generateLocator(component.tagName, TRAILING_ICON_SLOT),
				);
				await expect(iconSlotElem).toBeVisible();
			});
		});

		test.describe('when type any text', () => {
			test('should have [has-value] class', async ({ page }) => {
				const rawHTML = `<${component.tagName}></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const inputElem = page.locator(component.tagName);
				await inputElem.focus();
				await inputElem.type('TEXT');
				const rootElem = inputElem.locator(convertIdSelector(ROOT));
				await expect(rootElem).toHaveClass(new RegExp(HAS_VALUE));
			});

			test('should return text value', async ({ page }) => {
				const text = 'TEXT';
				const rawHTML = `<${component.tagName}></${component.tagName}>`;
				await page.setContent(rawHTML, WAIT_UNTIL);
				const inputElem = page.locator(component.tagName);
				await inputElem.focus();
				await inputElem.type(text);
				const inputValue = await inputElem.evaluate(
					(elem) => elem.value,
				);
				await expect(inputValue).toBe(text);
			});
		});
	});
}
