const { chromium, test, expect } = require('@playwright/test');
const TAG_NAME = 'vanilla-input';

test.describe('<vanilla-input>', () => {
	test.beforeEach(async ({ page }) => {
		await page.addScriptTag({
			path: './dist/input.min.js',
		});
		await page.setContent('<vanilla-input label="FOO"></vanilla-input>', {
			waitUntil: 'domcontentloaded',
		});
	});

	test('should changed input text value', async ({ page }) => {
		await page.waitForSelector('text=FOO');
		await page.type(TAG_NAME, 'BAR', { delay: 100 });
		const inputValue = await page.$eval(TAG_NAME, (elem) => elem.value);
		expect(inputValue).toBe('BAR');
	});
});
