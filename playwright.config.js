const SECONDS_30 = 30 * 1000;

module.exports = {
	webServer: {
		command: 'npm run start:test',
		url: 'http://localhost:3003/',
		reuseExistingServer: false,
		timeout: SECONDS_30,
	},
	use: {
		baseURL: 'http://localhost:3003/',
	},
};
