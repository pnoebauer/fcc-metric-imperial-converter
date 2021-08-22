// const chai = require('chai');
// let assert = chai.assert;
// const ConvertHandler = require('../controllers/convertHandler.js');

// let convertHandler = new ConvertHandler();

// suite('Unit Tests', () => {
// 	// convertHandler should correctly...
// 	test('read a whole number input', () => {
// 		assert.typeOf(convertHandler.getNum('4gal'), 'number');
// 	});
// 	test('read a decimal number input', () => {
// 		assert.typeOf(convertHandler.getNum('4.6gal'), 'number');
// 	});
// 	test('read a fractional input', () => {
// 		assert.typeOf(convertHandler.getNum('5/3km'), 'number');
// 	});
// 	test('read a fractional input with a decimal', () => {
// 		assert.typeOf(convertHandler.getNum('1.5/8l'), 'number');
// 	});
// 	test('return an error on a double-fraction', () => {
// 		assert.isNull(convertHandler.getNum('3/2/3km'));
// 	});
// 	test('default to a numerical input of 1 when no numerical input is provided', () => {
// 		assert.equal(convertHandler.getNum('km'), 1);
// 	});
// 	test('read each valid input unit', () => {
// 		assert.equal(convertHandler.getUnit('5km'), 'km', 'km read');
// 		assert.equal(convertHandler.getUnit('5mi'), 'mi', 'mi read');
// 		assert.equal(convertHandler.getUnit('5L'), 'L', 'L read');
// 		assert.equal(convertHandler.getUnit('5gal'), 'gal', 'gal read');
// 		assert.equal(convertHandler.getUnit('5kg'), 'kg', 'kg read');
// 		assert.equal(convertHandler.getUnit('5lbs'), 'lbs', 'lbs read');
// 	});
// 	test('return an error for an invalid input unit', () => {
// 		assert.isNull(convertHandler.getUnit('min'));
// 	});
// 	test('return the correct return unit for each valid input unit', () => {
// 		assert.equal(
// 			convertHandler.getReturnUnit(convertHandler.getUnit('5km')),
// 			'mi',
// 			'km read and returned mi'
// 		);
// 		assert.equal(
// 			convertHandler.getReturnUnit(convertHandler.getUnit('5mi')),
// 			'km',
// 			'mi read and returned km'
// 		);
// 		assert.equal(
// 			convertHandler.getReturnUnit(convertHandler.getUnit('5L')),
// 			'gal',
// 			'L read and returned gal'
// 		);
// 		assert.equal(
// 			convertHandler.getReturnUnit(convertHandler.getUnit('5gal')),
// 			'L',
// 			'gal read and returned L'
// 		);
// 		assert.equal(
// 			convertHandler.getReturnUnit(convertHandler.getUnit('5kg')),
// 			'lbs',
// 			'kg read and returned lbs'
// 		);
// 		assert.equal(
// 			convertHandler.getReturnUnit(convertHandler.getUnit('5lbs')),
// 			'kg',
// 			'lbs read and returned kg'
// 		);
// 	});

// 	test('return the spelled-out string unit for each valid input unit', () => {
// 		assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
// 		assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
// 		assert.equal(convertHandler.spellOutUnit('L'), 'liters');
// 		assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
// 		assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
// 		assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
// 	});

// 	test('correctly convert gal to L', () => {
// 		assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
// 	});
// 	test('correctly convert L to gal', () => {
// 		assert.equal(convertHandler.convert(1, 'L'), 0.26417);
// 	});
// 	test('correctly convert mi to km', () => {
// 		assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
// 	});
// 	test('correctly convert km to mi', () => {
// 		assert.equal(convertHandler.convert(1, 'km'), 0.62137);
// 	});
// 	test('correctly convert lbs to kg', () => {
// 		assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
// 	});
// 	test('correctly convert kg to lbs', () => {
// 		assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
// 	});
// });

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Function convertHandler.getNum(input)', function () {
		test('Whole number input', function (done) {
			var input = '32L';
			assert.equal(convertHandler.getNum(input), 32);
			done();
		});

		test('Decimal Input', function (done) {
			var input = '3.25mi';
			assert.equal(convertHandler.getNum(input), 3.25);
			done();
		});

		test('Fractional Input', function (done) {
			var input = '12/8mi';
			assert.equal(convertHandler.getNum(input), 1.5);
			done();
		});

		test('Fractional Input w/ Decimal', function (done) {
			var input = '27/5.4mi';
			assert.equal(convertHandler.getNum(input), 5);
			done();
		});

		test('Invalid Input (double fraction)', function (done) {
			var input = '3/7.2/4L';
			assert.isNull(convertHandler.getNum(input), 'invalid number');
			done();
		});

		test('No Numerical Input', function (done) {
			var input = 'kg';
			assert.equal(convertHandler.getNum(input), 1);
			assert.equal(convertHandler.getUnit(input), 'kg');
			done();
		});
	});

	suite('Function convertHandler.getUnit(input)', function () {
		test('For Each Valid Unit Inputs', function (done) {
			var input = [
				'gal',
				'L',
				'mi',
				'km',
				'lbs',
				'kg',
				// 'GAL',
				// 'l',
				// 'MI',
				// 'KM',
				// 'LBS',
				// 'KG',
			];
			input.forEach(function (ele) {
				assert.equal(convertHandler.getUnit(32 + ele), ele);
			});
			done();
		});

		test('Unknown Unit Input', function (done) {
			let input = '32g';
			assert.isNull(convertHandler.getUnit(input), 'invalid unit');
			done();
		});
	});

	suite('Function convertHandler.getReturnUnit(initUnit)', function () {
		test('For Each Valid Unit Inputs', function (done) {
			var input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
			var expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
			});
			done();
		});
	});

	suite('Function convertHandler.spellOutUnit(unit)', function () {
		test('For Each Valid Unit Inputs', function (done) {
			let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
			let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
			input.forEach(function (ele, i) {
				assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
			});
			done();
		});
	});

	suite('Function convertHandler.convert(num, unit)', function () {
		test('Gal to L', function (done) {
			var input = [5, 'gal'];
			var expected = 18.9271;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance

			done();
		});

		test('L to Gal', function (done) {
			var input = [5, 'L'];
			var expected = 1.32086;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('Mi to Km', function (done) {
			var input = [5, 'mi'];
			var expected = 8.04672;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('Km to Mi', function (done) {
			var input = [5, 'km'];
			var expected = 3.10686;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('Lbs to Kg', function (done) {
			var input = [5, 'lbs'];
			var expected = 2.26796;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});

		test('Kg to Lbs', function (done) {
			var input = [5, 'kg'];
			var expected = 11.0231;
			assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
			done();
		});
	});
});
