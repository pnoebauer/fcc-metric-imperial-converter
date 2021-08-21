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
	test('read a fractional input with a decimal', function () {
		assert.typeOf(convertHandler.getNum('1.5/8l'), 'number');
	});
	test('return an error on a double-fraction', function () {
		assert.isNull(convertHandler.getNum('3/2/3km'));
	});
	test('default to a numerical input of 1 when no numerical input is provided', function () {
		assert.equal(convertHandler.getNum('km'), 1);
	});
});
