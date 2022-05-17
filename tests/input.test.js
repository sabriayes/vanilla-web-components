const { test, expect } = require('@playwright/test');

const WAIT_UNTIL = { waitUntil: 'domcontentloaded' };

test.describe('The VanillaInput instance', () => {
	test.beforeEach(async ({ page }) => {
		await page.addScriptTag({
			path: './dist/input.min.js',
		});
	});

	test.describe('when define basically', () => {
		test('should be defined on DOM', async ({ page }) => {
			const rawHTML = `<vanilla-input></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const inputElem = await page.waitForSelector('vanilla-input');
			expect(inputElem).toBeDefined();
		});

		test('should label element is removed', async ({ page }) => {
			const rawHTML = `<vanilla-input></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = await page.$eval('vanilla-input', (elem) =>
				elem.shadowRoot.querySelector('#label-element'),
			);
			await expect(labelElem).toBeNull();
		});
	});

	test.describe('when define with label', () => {
		test('should label element is visible', async ({ page }) => {
			const rawHTML = `<vanilla-input label="FOO"></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = page.locator('vanilla-input #label-element');
			await expect(labelElem).toBeVisible();
		});

		test('should label has a text', async ({ page }) => {
			const rawHTML = `<vanilla-input label="FOO"></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = page.locator('vanilla-input #label-element');
			await expect(labelElem).toHaveText(/.*/);
		});
	});

	test.describe('when define with error message', () => {});

	test.describe('when define with hint message', () => {});

	test.describe('when define with icons', () => {});
});
