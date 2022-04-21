const { test, expect } = require('@playwright/test');

test.describe('<vanilla-input>', () => {
	test('init', async ({ page }) => {
		await page.goto('input.min.js');
	});
});
