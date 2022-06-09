const { expect } = require('@playwright/test');
const { test } = require('./bases/input');
const { generateLocator, convertIdSelector } = require('./utils');
const VanillaInputModel = require('./models/input-element');
const {
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

test.describe('The VanillaInput instance', () => {
	let componentModel;
	test.beforeEach(async ({ page, tagName, filePath }) => {
		componentModel = new VanillaInputModel(page, tagName, filePath);
		await componentModel.initComponent();
	});

	test.describe('when define basically', () => {
		let inputElement;
		test.beforeEach(async () => {
			inputElement = await componentModel.getComponent();
		});

		test('should be defined on DOM', async ({ page }) => {
			expect(inputElement).toBeDefined();
		});

		test('should have [initialized] class', async ({ page, tagName }) => {
			await expect(
				page.locator(generateLocator(tagName, ROOT)),
			).toHaveClass(new RegExp(INITIALIZED));
		});

		test('label should be removed', async ({ page, tagName }) => {
			const labelElem = await page.$eval(
				tagName,
				(elem, selector) =>
					elem.shadowRoot.querySelector(String(selector)),
				convertIdSelector(LABEL),
			);
			await expect(labelElem).toBeNull();
		});

		test('icons should be hidden', async ({ page, tagName }) => {
			const leadingIconSlotElem = page.locator(
				generateLocator(tagName, LEADING_ICON_SLOT),
			);
			const trailingIconSlotElem = page.locator(
				generateLocator(tagName, TRAILING_ICON_SLOT),
			);
			await expect(leadingIconSlotElem).toBeVisible();
			await expect(trailingIconSlotElem).toBeVisible();
		});
	});

	test.describe('when define with label', () => {
		test.beforeEach(async () => {
			await componentModel.getComponentWithLabel();
		});

		test('should have [has-label] class', async ({ page, tagName }) => {
			const rootElem = page.locator(generateLocator(tagName, ROOT));
			await expect(rootElem).toHaveClass(new RegExp(HAS_LABEL));
		});

		test('label should be visible', async ({ page, tagName }) => {
			const labelElem = page.locator(generateLocator(tagName, LABEL));
			await expect(labelElem).toBeVisible();
		});

		test('label should has some text', async ({ page, tagName }) => {
			const labelElem = page.locator(generateLocator(tagName, LABEL));
			await expect(labelElem).toHaveText(/.*/);
		});
	});

	test.describe('when define with [invalid] attribute', () => {
		test.beforeEach(async () => {
			await componentModel.getComponentWithErrorMessages();
		});

		test('error messages should be visible', async ({ page, tagName }) => {
			const errSlotElem = page.locator(
				generateLocator(tagName, ERROR_MESSAGES_SLOT),
			);
			await expect(errSlotElem).toBeVisible();
		});

		test('hint text should be hidden', async ({ page, tagName }) => {
			const hintSlotElem = page.locator(
				generateLocator(tagName, HINT_TEXT_SLOT),
			);
			await expect(hintSlotElem).toBeHidden();
		});
	});

	test.describe('when define with hint text', () => {
		test.beforeEach(async () => {
			await componentModel.getComponentWithHintText();
		});

		test('hint text should be visible', async ({ page, tagName }) => {
			const hintSlotElem = page.locator(
				generateLocator(tagName, HINT_TEXT_SLOT),
			);
			await expect(hintSlotElem).toBeVisible();
		});
	});

	test.describe('when define with icons', () => {
		test('leading icon should be visible', async ({ page, tagName }) => {
			await componentModel.getComponentWithLeadingIcon();
			const iconSlotElem = page.locator(
				generateLocator(tagName, LEADING_ICON_SLOT),
			);
			await expect(iconSlotElem).toBeVisible();
		});

		test('trailing icon should be visible', async ({ page, tagName }) => {
			await componentModel.getComponentWithTrailingIcon();
			const iconSlotElem = page.locator(
				generateLocator(tagName, TRAILING_ICON_SLOT),
			);
			await expect(iconSlotElem).toBeVisible();
		});
	});

	test.describe('when type any text', () => {
		let inputElement;
		test.beforeEach(async () => {
			inputElement = await componentModel.getComponent();
		});

		test('should have [has-value] class', async ({ page }) => {
			await inputElement.focus();
			await inputElement.type('TEXT');
			const rootElem = inputElement.locator(convertIdSelector(ROOT));
			await expect(rootElem).toHaveClass(new RegExp(HAS_VALUE));
		});

		test('should return text value', async ({ page }) => {
			const text = 'TEXT';
			await inputElement.focus();
			await inputElement.type(text);
			const inputValue = await inputElement.evaluate(
				(elem) => elem.value,
			);
			await expect(inputValue).toBe(text);
		});
	});
});
