const base = require('@playwright/test');
const propOptions = { option: true };

module.exports.test = base.test.extend({
	tagName: ['vanilla-input', propOptions],
	instanceName: ['VanillaInput', propOptions],
	filePath: ['./dist/input.min.js', propOptions],
});
