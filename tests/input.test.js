const { test, expect } = require('@playwright/test');
const { Classes } = require('./../src/partials/js/consts');

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
			await expect(
				page.locator('vanilla-input #root-element'),
			).toHaveClass(new RegExp(Classes.INITIALIZED));
		});

		test('should have [initialized] class', async ({ page }) => {
			const rawHTML = `<vanilla-input></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const inputElem = await page.waitForSelector('vanilla-input');
			expect(inputElem).toBeDefined();
		});

		test('should label element be removed', async ({ page }) => {
			const rawHTML = `<vanilla-input></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = await page.$eval('vanilla-input', (elem) =>
				elem.shadowRoot.querySelector('#label-element'),
			);
			await expect(labelElem).toBeNull();
		});
	});

	test.describe('when define with label', () => {
		test('should have [has-label] class', async ({ page }) => {
			const rawHTML = `<vanilla-input label="FOO"></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const rootElem = page.locator('vanilla-input #root-element');
			await expect(rootElem).toHaveClass(new RegExp(Classes.HAS_LABEL));
		});

		test('should label element be visible', async ({ page }) => {
			const rawHTML = `<vanilla-input label="FOO"></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = page.locator('vanilla-input #label-element');
			await expect(labelElem).toBeVisible();
		});

		test('should label element has a text', async ({ page }) => {
			const rawHTML = `<vanilla-input label="FOO"></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const labelElem = page.locator('vanilla-input #label-element');
			await expect(labelElem).toHaveText(/.*/);
		});
	});

	test.describe('when define with invalid attribute', () => {
		test('should error messages element be visible', async ({ page }) => {
			const rawHTML = `
				<vanilla-input invalid>
					<span slot="errors">ERR MSG</span>
				</vanilla-input>
			`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const errSlotElem = page.locator(
				'vanilla-input #error-messages-slot',
			);
			await expect(errSlotElem).toBeVisible();
		});

		test('should hint text element be hidden', async ({ page }) => {
			const rawHTML = `<vanilla-input invalid></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const hintSlotElem = page.locator('vanilla-input #hint-text-slot');
			await expect(hintSlotElem).not.toBeVisible();
		});
	});

	test.describe('when define with hint text', () => {
		test('should hint text element be visible', async ({ page }) => {
			const rawHTML = `
				<vanilla-input>
					<span slot="hint">HINT TXT</span>
				</vanilla-input>
			`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const hintSlotElem = page.locator('vanilla-input #hint-text-slot');
			await expect(hintSlotElem).toBeVisible();
		});
	});

	test.describe('when define with icons', () => {
		test('should leading icon element be visible', async ({ page }) => {
			const rawHTML = `
				<vanilla-input>
					<span slot="leading-icon">
        				<i class="fa fa-user"></i>
    				</span>
				</vanilla-input>
			`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const iconSlotElem = page.locator(
				'vanilla-input #leading-icon-slot',
			);
			await expect(iconSlotElem).toBeVisible();
		});

		test('should trailing icon element be visible', async ({ page }) => {
			const rawHTML = `
				<vanilla-input>
					<span slot="trailing-icon">
        				<i class="fa fa-user"></i>
    				</span>
				</vanilla-input>
			`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const iconSlotElem = page.locator(
				'vanilla-input #trailing-icon-slot',
			);
			await expect(iconSlotElem).toBeVisible();
		});
	});

	test.describe('when type any text', () => {
		test('should have [has-value] class', async ({ page }) => {
			const rawHTML = `<vanilla-input></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const inputElem = page.locator('vanilla-input');
			await inputElem.focus();
			await inputElem.type('TEXT');
			const rootElem = inputElem.locator('#root-element');
			await expect(rootElem).toHaveClass(new RegExp(Classes.HAS_VALUE));
		});

		test('should return text value', async ({ page }) => {
			const text = 'TEXT';
			const rawHTML = `<vanilla-input></vanilla-input>`;
			await page.setContent(rawHTML, WAIT_UNTIL);
			const inputElem = page.locator('vanilla-input');
			await inputElem.focus();
			await inputElem.type(text);
			const inputValue = await inputElem.evaluate((elem) => elem.value);
			await expect(inputValue).toBe(text);
		});
	});
});
