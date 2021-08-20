const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	// convertHandler should correctly...
	test('read a whole number input', function () {
		assert.typeOf(convertHandler.getNum('4gal'), 'number');
	});
	test('read a decimal number input', function () {
		assert.typeOf(convertHandler.getNum('4.6gal'), 'number');
	});
	test('read a fractional input', function () {
		assert.typeOf(convertHandler.getNum('5/3km'), 'number');
	});
});
