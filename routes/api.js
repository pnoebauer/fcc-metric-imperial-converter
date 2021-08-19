'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
	let convertHandler = new ConvertHandler();

	// /api/convert?input=4gal
	// { initNum: 3.1, initUnit: 'mi', returnNum: 4.98895, returnUnit: 'km', string: '3.1 miles converts to 4.98895 kilometers' }
	// const x = convertHandler.convert(3.1, 'mi');

	// console.log(convertHandler);

	app.route('/api/convert/').get((req, res) => {
		const {input} = req.query;
		// console.log(req.query, input);

		const initNum = convertHandler.getNum(input);
		const initUnit = convertHandler.getUnit(input);
		const returnUnit = convertHandler.getReturnUnit(initUnit);
		const returnNum = convertHandler.convert(initNum, initUnit);
		const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

		// console.log(initNum, initUnit, returnUnit, returnNum);
		console.log(string);

		return res.json({initNum, initUnit, returnNum, returnUnit, string});
	});
};
