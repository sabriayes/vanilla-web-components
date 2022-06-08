const { test, expect } = require('@playwright/test');
const { generateLocator, convertIdSelector } = require('./utils');
const TAG_NAME = 'vanilla-password';
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

test.describe('The VanillaPassword instance', () => {
	test.beforeEach(async ({ page }) => {
		await page.addScriptTag({
			path: './dist/password.min.js',
		});
	});

	test.describe('when define basically', () => {
		test('should be defined on DOM', async ({ page }) => {
			const rawHTML = `<vanilla-password></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const inputElem = await page.waitForSelector(TAG_NAME);
			expect(inputElem).toBeDefined();
		});

		test('should have [initialized] class', async ({ page }) => {
			const rawHTML = `<vanilla-password></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			await expect(
				page.locator(generateLocator(TAG_NAME, ROOT)),
			).toHaveClass(new RegExp(INITIALIZED));
		});

		test('should label element be removed', async ({ page }) => {
			const rawHTML = `<vanilla-password></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = await page.$eval(
				TAG_NAME,
				(elem, selector) =>
					elem.shadowRoot.querySelector(String(selector)),
				convertIdSelector(LABEL),
			);
			await expect(labelElem).toBeNull();
		});
	});

	test.describe('when define with label', () => {
		test('should have [has-label] class', async ({ page }) => {
			const rawHTML = `<vanilla-password label="FOO"></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const rootElem = page.locator(generateLocator(TAG_NAME, ROOT));
			await expect(rootElem).toHaveClass(new RegExp(HAS_LABEL));
		});

		test('should label element be visible', async ({ page }) => {
			const rawHTML = `<vanilla-password label="FOO"></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = page.locator(generateLocator(TAG_NAME, LABEL));
			await expect(labelElem).toBeVisible();
		});

		test('should label element has a text', async ({ page }) => {
			const rawHTML = `<vanilla-password label="FOO"></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = page.locator(generateLocator(TAG_NAME, LABEL));
			await expect(labelElem).toHaveText(/.*/);
		});
	});

	test.describe('when define with [invalid] attribute', () => {
		test('should error messages element be visible', async ({ page }) => {
			const rawHTML = `
				<vanilla-password invalid>
					<span slot="errors">ERR MSG</span>
				</vanilla-password>
			`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const errSlotElem = page.locator(
				generateLocator(TAG_NAME, ERROR_MESSAGES_SLOT),
			);
			await expect(errSlotElem).toBeVisible();
		});

		test('should hint text element be hidden', async ({ page }) => {
			const rawHTML = `<vanilla-password invalid></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const hintSlotElem = page.locator(
				generateLocator(TAG_NAME, HINT_TEXT_SLOT),
			);
			await expect(hintSlotElem).not.toBeVisible();
		});
	});

	test.describe('when define with hint text', () => {
		test('should hint text element be visible', async ({ page }) => {
			const rawHTML = `
				<vanilla-password>
					<span slot="hint">HINT TXT</span>
				</vanilla-password>
			`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const hintSlotElem = page.locator(
				generateLocator(TAG_NAME, HINT_TEXT_SLOT),
			);
			await expect(hintSlotElem).toBeVisible();
		});
	});

	test.describe('when define with icons', () => {
		test('should leading icon element be visible', async ({ page }) => {
			const rawHTML = `
				<vanilla-password>
					<span slot="leading-icon">
        				<i class="fa fa-lock"></i>
    				</span>
				</vanilla-password>
			`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const iconSlotElem = page.locator(
				generateLocator(TAG_NAME, LEADING_ICON_SLOT),
			);
			await expect(iconSlotElem).toBeVisible();
		});
	});

	test.describe('when type any text', () => {
		test('should have [has-value] class', async ({ page }) => {
			const rawHTML = `<vanilla-password></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const inputElem = page.locator(TAG_NAME);
			await inputElem.focus();
			await inputElem.type('TEXT');
			const rootElem = inputElem.locator(convertIdSelector(ROOT));
			await expect(rootElem).toHaveClass(new RegExp(HAS_VALUE));
		});

		test('should return text value', async ({ page }) => {
			const text = 'TEXT';
			const rawHTML = `<vanilla-password></vanilla-password>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const inputElem = page.locator(TAG_NAME);
			await inputElem.focus();
			await inputElem.type(text);
			const inputValue = await inputElem.evaluate((elem) => elem.value);
			await expect(inputValue).toBe(text);
		});
	});
});