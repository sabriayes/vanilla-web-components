const { GlobalRegistrator } = require('@happy-dom/global-registrator');
const { expect } = require('chai');
GlobalRegistrator.register();

const VanillaInput = require('components/input/input');

describe('<vanilla-input>', function () {
	describe('When define to window', function () {
		it('should be defined', function () {
			expect(VanillaInput).to.be.an('function');
		});
	});
});
