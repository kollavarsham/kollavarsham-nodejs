/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 @module JulianDate
 */

'use strict';

/**
 * Represents a Julian Date's year, month and day
 * @class JulianDate
 * @param year
 * @param month
 * @param day
 * @constructor
 */
var JulianDate = function (year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;
};

/**
 * Pads zeroes to print the date in a pretty format
 * @private
 * @param num
 * @param size
 * @returns {string}
 */
var pad = function (num, size) {
  var s = "000000000" + num;
  return s.substr(s.length - size);
};

/**
 * Converts the Julian Date to a nicely formatted string with year, month and date
 * @method toString
 * @for JulianDate
 * @returns {string}
 */
JulianDate.prototype.toString = function () {
  return pad(this.year, 4) + " " + pad(this.month, 2) + " " + pad(this.day, 2);
};

module.exports = JulianDate;
