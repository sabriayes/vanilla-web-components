const { devices } = require('@playwright/test');

const SECONDS_5 = 5000; // x 1000 miliseconds
const SECONDS_30 = 30 * 1000; // x 1000 miliseconds

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
