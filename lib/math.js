/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var math = {
  epsilon            : 1e-8,
  radianInDegrees    : 180 / Math.PI,
  floatingPointEqual : function (n1, n2, isTest) {
    var areEqual = Math.abs(n1 - n2) < math.epsilon;
    if (isTest === undefined) {
      isTest = true;
    }
    if (!areEqual && isTest) {
      console.log('\nDEBUG: math.floatingPointEqual failed for %d and %d', n1, n2);
    }
    return areEqual;
  },
  isNumber           : function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isInt              : function (n) {
    return this.isNumber(n) && n % 1 === 0;
  },
  truncateDecimals   : function (num, digits) {
    // Thanks Nick Knowlson! - http://stackoverflow.com/a/9232092/218882
    //     (The original from that answer has a bug though, where an integer was getting rounded to "".
    //      Caught it while getting calendar.gregorianDateToJulianDay to work. 2 hours... Phew!)
    var numS = num.toString(),
      decPos = numS.indexOf('.'),
      result = decPos === -1 ? num : numS.substr(0, 1 + decPos + digits);
    var resultAsNumber = parseFloat(result);
    return isNaN(resultAsNumber) ? 0 : resultAsNumber;
  },
  truncate           : function (n) {
    return this.truncateDecimals(n, 0);
  },
  floor              : function (n) {
    var result = Math.floor(n);
    return isNaN(result) ? 0 : result;
  },
  fractional         : function (n) {
    var result = n % 1;
    return isNaN(result) ? 0 : result;
  },
  round              : function (n) {
    return this.isNumber(n) ? this.floor(parseFloat(n) + 0.5) : 0;
  },
  square             : function (n) {
    return this.isNumber(n) ? Math.pow(parseFloat(n), 2) : 0;
  }
};

module.exports = math;
