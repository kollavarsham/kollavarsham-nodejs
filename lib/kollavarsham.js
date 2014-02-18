/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 * The main module that exposes all of the public API in the library
 * @module kollavarsham
 */
'use strict';

var calculations = require('./calculations');
var extend = require('node.extend');
var globals = require('./globals');
var KollavarshamDate = require('./date').KollavarshamDate;
var locations = require('./locations');

/**
 * The Kollavarsham class implements all the public APIs of the library.
 *
 * Create a new instance of this class, passing in the relevant options and call methods on this instance.
 *
 * @class Kollavarsham
 * @param {Object} [options] A set of key value pairs to configure the Kollavarsham instance. All settings are optional.
 *  @param {Boolean} [options.bija=false] Set this to true to use the Bija correction
 *  @param {Number} [options.latitude=23.2] Sets the latitude for the location for the conversions
 *  @param {Number} [options.longitude=75.8] Sets the longitude for the location for the conversions
 *  @param {String} [options.outputformat='verbose'] Set to 'list' or 'verbose' for the output
 * @constructor
 * @example
 * ```
 *     var Kollavarsham = require('kollavarsham');
 *
 *     var options = {
 *       bija: true,
 *       latitude: 10,
 *       longitude: 76.2,
 *       outputFormat: 'verbose'
 *     };
 *
 *     var kollavarsham = new Kollavarsham(options);
 *
 *     var todayInMalayalamEra = kollavarsham.fromGregorianDate(new Date());
 *
 *     var today = kollavarsham.toGregorianDate(todayInMalayalamEra);
 *```
 */
var Kollavarsham = function (options) {

  var defaults = {
    //These are the defaults
    bija         : false,
    mode         : 0,
    latitude     : 23.2,
    longitude    : 75.8,
    outputformat : 'verbose'
  };

  /**
   * Holds the settings state of the Kollavarsham instance. To access a snapshot use the {{#crossLink "Kollavarsham/getSettings:method"}}{{/crossLink}} method
   * @property _settings
   * @type {Object}
   * @private
   */
  this._settings = extend(defaults, options);

  // TODO: Ideally this below call should be triggered every time _settings.longitude ic changed...
  // Or in other words, globals.desantara is a calculated property dependant on this._settings.longitude
  locations.setDesantara(this._settings.longitude);
};

/**
 * Gets a snapshot of the current settings
 * @method getSettings
 * @returns {Object} The current snapshot of the settings/configuration
 */
Kollavarsham.prototype.getSettings = function () {
  return this._settings;
};

/**
 * Sets the mode of conversion - from Gregorian to Malayalam Era or vice versa. `0`and `1` (any non-zero value is considered as 1) are valid values
 *
 * @method setMode
 * @param mode {Number} A value of `0` will do Gregorian to Malayalam Era and a value of `1` (or any non-zero value) will do Malayalam Era date to Gregorian
 * @example
 * ```
 *    var Kollavarsham = require('Kollavarsham');
 *    var kollavarsham = new Kolavarsham({});
 *    kollavarsham.setMode(0);
 *    kollavarsham.setInputDate(new Date(2014, 2, 14));
 *    kollavarsham.convert();
 * ```
 */
Kollavarsham.prototype.setMode = function (mode) {
  this._settings.mode = mode;
};

/**
 * Sets or unsets the Bija factor
 *
 * @method setBija
 * @param bija {Boolean}
 * @example
 * ```
 *    var Kollavarsham = require('Kollavarsham');
 *    var kollavarsham = new Kolavarsham({});
 *    kollavarsham.setMode(0);
 *    kollavarsham.setBija(true);
 *    kollavarsham.setInputDate(new Date(2014, 2, 14));
 *    kollavarsham.convert();
 * ```
 */
Kollavarsham.prototype.setBija = function (bija) {
  this._settings.bija = bija;
};

/**
 * Sets the latitude for the location that will be used as the basis for the conversion
 * @method setLatitude
 * @param latitude
 * @example
 * ```
 *    var Kollavarsham = require('Kollavarsham');
 *    var kollavarsham = new Kolavarsham({});
 *    kollavarsham.setLatitude(8.5);
 * ```
 */
Kollavarsham.prototype.setLatitude = function (latitude) {
  this._settings.latitude = latitude;
};

/**
 * Sets the longitude for the location that will be used as the basis of the conversion
 * @method setLongitude
 * @param longitude
 * @example
 * ```
 *    var Kollavarsham = require('Kollavarsham');
 *    var kollavarsham = new Kolavarsham({});
 *    kollavarsham.setLongitude(77.0);
 *```
 */
Kollavarsham.prototype.setLongitude = function (longitude) {
  this._settings.longitude = longitude;
  locations.setDesantara(this._settings.longitude);
};

//TODO: This below function is more of a CLI concern
/**
 * Sets the output to be as 'list' or 'verbose'
 * @method setOutput
 * @param output {String} Valid values are 'verbose' (default) and 'list'
 */
Kollavarsham.prototype.setOutput = function (output) {
  this._settings.output = output;
};

//TODO: Rather than a method to set the date to be converted, can the dates come in as parameters
// to specific methods with single responsibility?
/**
 * Sets the input Gregorian date for conversion
 * @method setInputDate
 * @param date
 */
Kollavarsham.prototype.setInputDate = function (date) {
  this._settings.gregorianDate = date;
};

/**
 * Converts a Gregorian date to the equivalent Kollavarsham date, respecting the current configuration
 *
 * @method fromGregorianDate
 * @param date {Date} The Gregorian date to be converted to Kollavarsham
 * @returns {KollavarshamDate} Converted date
 */
Kollavarsham.prototype.fromGregorianDate = function (date) {
// Rather than doing how it is done in perl by first setting year, month and day, let's create a new gregorianDate global - HP
//  globals.year = date.getFullYear();
//  globals.month = date.getMonth() + 1; //globals.month should be 1 to 12 and not 0 to 11
//  globals.day = date.getDate();
  globals.gregorianDate = date;
  // We still need the year for a couple of other places, so saving that separately
  globals.year = date.getFullYear();

  calculations.main(this._settings);
  calculations.planetary();

  var kollavarshamDate = new KollavarshamDate(globals.YearKali, globals.sauraMasaNum, globals.sauraMasaDay);
  kollavarshamDate.globals = globals;

  return kollavarshamDate;
};

/**
 * Converts a Kollavarsham date to its equivalent Gregorian date, respecting the current configuration
 *
 * @method toGregorianDate
 * @param date {KollavarshamDate} The Kollavarsham date to be converted to Gregorian
 * @returns {Date} Converted date
 */
Kollavarsham.prototype.toGregorianDate = function (date) {
  //TODO: Implement this function
  console.log('When the API is implemented, will convert %s', date);
};

/**
 * Exports the {{#crossLink "KollavarshamDate"}}{{/crossLink}} class for referencing via `require`. This is the class
 * that is returned when converting {{#crossLink "Kollavarsham/fromGregorianDate:method"}}{{/crossLink}} and is passed in
 * to {{#crossLink "Kollavarsham/toGregorianDate:method"}}{{/crossLink}}. See example below.
 * @property kollavarshamDate
 * @type {KollavarshamDate}
 * @static
 * @example
 * ```
 * var Kollavarsham = require('kollavarsham');
 * var KollavarshamDate = require('kollavarsham').kollavarshamDate;
 *
 * var myKollavarshamDate = new KollavarshamDate(1189, 7, 13); // Create a new Malayalam Date representation
 * var myDateInGregorian = (new Kollavarsham({'bija': true})).toGregorianDate(myKollavarshamDate);
 * ```
 */
Kollavarsham.kollavarshamDate = KollavarshamDate;

module.exports = Kollavarsham;
