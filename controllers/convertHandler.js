function ConvertHandler() {
	const galToL = 3.78541;
	const lbsToKg = 0.453592;
	const miToKm = 1.60934;

	const conversionMap = {
		km: {returnUnit: 'mi', convNumber: 1 / miToKm},
		mi: {returnUnit: 'km', convNumber: miToKm},
		l: {returnUnit: 'gal', convNumber: 1 / galToL},
		gal: {returnUnit: 'l', convNumber: galToL},
		kg: {returnUnit: 'lbs', convNumber: 1 / lbsToKg},
		lbs: {returnUnit: 'kg', convNumber: lbsToKg},
	};

	const spellingMap = {
		km: 'kilometers',
		mi: 'miles',
		l: 'liters',
		gal: 'gallons',
		kg: 'kilograms',
		lbs: 'pounds',
	};

	// from query string => 3.1(initNum)
	this.getNum = function (input) {
		// const result = Number(input.match(/[0-9]+/g)[0]);
		const result = Number(input.match(/[0-9]+/)[0]);

		return result;
	};

	// from query string => 'mi'(initUnit)
	this.getUnit = function (input) {
		// const result = input.match(/[^0-9]+/g)[0];
		const result = input.match(/[^0-9]+/)[0];

		return result;
	};

	// 'km' (from 'mi')
	this.getReturnUnit = function (initUnit) {
		const result = conversionMap[initUnit].returnUnit;

		return result;
	};

	this.spellOutUnit = function (unit) {
		const result = spellingMap[unit];

		return result;
	};

	// e.g. 3.1(initNum) 'mi'(initUnit) => returnNum
	this.convert = function (initNum, initUnit) {
		const result = conversionMap[initUnit].convNumber * initNum;

		return result;
	};

	// '3.1 miles converts to 4.98895 kilometers'
	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		const result = `${initNum} ${this.spellOutUnit(
			initUnit
		)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

		return result;
	};
}

module.exports = ConvertHandler;
