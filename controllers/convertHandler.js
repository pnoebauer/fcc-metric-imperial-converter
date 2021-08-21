function ConvertHandler() {
	const galToL = 3.78541;
	const lbsToKg = 0.453592;
	const miToKm = 1.60934;

	const conversionMap = {
		km: {returnUnit: 'mi', convNumber: 1 / miToKm},
		mi: {returnUnit: 'km', convNumber: miToKm},
		L: {returnUnit: 'gal', convNumber: 1 / galToL},
		gal: {returnUnit: 'L', convNumber: galToL},
		kg: {returnUnit: 'lbs', convNumber: 1 / lbsToKg},
		lbs: {returnUnit: 'kg', convNumber: lbsToKg},
	};

	const spellingMap = {
		km: 'kilometers',
		mi: 'miles',
		L: 'liters',
		gal: 'gallons',
		kg: 'kilograms',
		lbs: 'pounds',
	};

	// from query string => 3.1(initNum)
	this.getNum = function (input) {
		// const result = Number(input.match(/[0-9]+/g)[0]);
		// const result = Number(input.match(/[0-9]+/)[0]);

		// const unit = this.getUnit(input);
		// const correctedUnit = unit === 'L' ? 'l' : unit;
		// const result = eval(input.split(correctedUnit)[0]) || 1;

		// if (input.includes('//')) {
		// 	return null;
		// }
		//count / occurences; max 1 allowed (1/2/3 or 1//2 would error out)
		if ((input.match(/\//g) || []).length > 1) {
			return null;
		}

		const unitStart = input.match(/[a-zA-Z]/).index;

		if (unitStart === 0) {
			return 1;
		}
		const num = input.slice(0, unitStart);
		const result = eval(num);

		// if(!result) {
		//   return 'invalid number';
		// }

		return result;
	};

	// from query string => 'mi'(initUnit)
	this.getUnit = function (input) {
		// const result = input.match(/[^0-9]+/g)[0];
		// const result = input.match(/[^0-9]+/)[0];

		const unitStart = input.match(/[a-zA-Z]/).index;
		const unit = input.slice(unitStart);

		const validUnit = unit.match(/\km\b|\mi\b|\L\b|\gal\b|\kg\b|\lbs\b/i);

		if (!validUnit) {
			return null;
		}

		const result = unit === 'l' ? 'L' : unit;

		// if(!result) {
		//   return 'invalid unit';
		// }

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
		const roundedResult = parseFloat(result.toFixed(5));

		return roundedResult;
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
