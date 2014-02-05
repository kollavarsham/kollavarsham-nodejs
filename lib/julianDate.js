'use strict';

var JulianDate = function (year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;
};

var pad = function (num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
};

JulianDate.prototype.toString = function () {
  return pad(this.year, 4) + " " + pad(this.month, 2) + " " + pad(this.day, 2);
};

module.exports = JulianDate;
