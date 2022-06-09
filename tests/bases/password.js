const base = require('@playwright/test');
const propOptions = { option: true };

module.exports.test = base.test.extend({
	tagName: ['vanilla-password', propOptions],
	instanceName: ['VanillaPassword', propOptions],
	filePath: ['./dist/password.min.js', propOptions],
});
