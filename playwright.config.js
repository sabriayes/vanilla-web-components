const { devices } = require('@playwright/test');

const SECONDS_5 = 5_000;
const SECONDS_30 = 30_000;

module.exports = {
	timeout: SECONDS_30,
	expect: { timeout: SECONDS_5 },
	workers: process.env.CI ? 1 : undefined,
	use: {
		headless: true,
		channel: 'chrome',
		actionTimeout: 0,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],
};
