/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 * Defines the KollavarshamDate and JulianDate classes
 * @module date
 */

'use strict';

/**
 * Pads zeroes to print the date in a pretty format
 * @private
 * @param num
 * @param size
 * @returns {string}
 */
var pad = function (num, size) {
  var s = '000000000' + num;
  return s.substr(s.length - size);
};

/****************** Julian Date (private) ***************************/

/**
 * Represents a Julian Date's year, month and day
 * @class JulianDate
 * @param year {Number} Julian year
 * @param month {Number} Julian month
 * @param day {Number} Julian day
 * @constructor
 */
var JulianDate = function (year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;
};

/**
 * Converts the Julian Date to a nicely formatted string with year, month and date
 * @method toString
 * @for JulianDate
 * @return {string}
 */
JulianDate.prototype.toString = function () {
  return pad(this.year, 4) + ' ' + pad(this.month, 2) + ' ' + pad(this.day, 2);
};

module.exports.JulianDate = JulianDate;

/****************** Kollavarsham Date *******************************/

/**
 * @class KollavarshamDate
 * @param [year=1] {Number} The Kollavarsham year
 * @param [month=1] {Number} The Kollavarsham month
 * @param [day=1] {Number} The Kollavarsham day
 * @constructor
 */
var KollavarshamDate = function (year, month, day) {

  this.year = year || 1;
  this.month = month || 1;
  this.day = day || 1;

  this.globals = null;
  this.gregorianDate = null;
  this.julianDay = null;
  this.weekdayName = null;
};

/**
 * Converts the Kollavarsham Date to a nicely formatted string with year, month and date
 * @method toString
 * @for KollavarshamDate
 * @return {string}
 */
KollavarshamDate.prototype.toString = function () {
  return pad(this.year, 4) + ' ' + pad(this.month, 2) + ' ' + pad(this.day, 2);
};

module.exports.KollavarshamDate = KollavarshamDate;