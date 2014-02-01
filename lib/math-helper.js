'use strict';

var mathHelper = {
  isNumber         : function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  isInt            : function (n) {
    return this.isNumber(n) && n % 1 === 0;
  },
  truncateDecimals : function (num, digits) {
    // Thanks Nick Knowlson! - http://stackoverflow.com/a/9232092/218882
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        result = numS.substr(0, 1 + decPos + digits);
    var resultAsNumber = parseFloat(result);
    return  isNaN(resultAsNumber) ? 0 : resultAsNumber;
  },
  truncate         : function (n) {
    return this.truncateDecimals(n, 0);
  },
  floor            : function (n) {
    var result = Math.floor(n);
    return isNaN(result) ? 0 : result;
  },
  fractional       : function (n) {
    var result = n % 1;
    return isNaN(result) ? 0 : result;
  },
  round            : function (n) {
    return this.isNumber(n) ? this.floor(parseFloat(n) + 0.5) : 0;
  },
  square           : function (n) {
    return this.isNumber(n) ? Math.pow(parseFloat(n), 2) : 0;
  }
};

module.exports = mathHelper;