/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 CLI app to convert Gregorian date to Kollavarsham (Malayalam Era) date and vice versa
 @module kollavarsham
 */

'use strict';

var extend = require('node.extend');
var globals = require('./globals');
var locations = require('./locations');

/**
 * @class Kollavarsham
 * @param options
 * @constructor
 */
var Kollavarsham = function (options) {

  /**
   * Default values for the settings
   * @property defaults
   * @private
   */
  var defaults = {
    //These are the defaults
    bija          : false,
    mode          : 0,
    latitude      : 23.2,
    longitude     : 75.8,
    output        : "verbose",
    gregorianDate : new Date()
  };

  /**
   * @property _settings
   * @type {*}
   * @private
   */
  this.settings = extend(defaults, options);

};

/**
 * Sets the mode of conversion - from Gregorian to Malayalam Era or vice versa. `0`and `1` (any non-zero value is considered as 1) are valid values
 *
 * @method setMode
 * @param mode {Number} A value of `0` will do Gregorian to Malayalam Era and a value of `1` (or any non-zero value) will do Malayalam Era date to Gregorian
 * @example
 * ```
 *var kollavarsham = require('kollavarsham');
 *kollavarsham.setMode(0);
 *kollavarsham.setInputDate(new Date(2014, 2, 14));
 *kollavarsham.convert();
 * ```
 */
Kollavarsham.prototype.setMode = function (mode) {
  this.settings.mode = mode;
};

/**
 * Sets or unsets the Bija factor
 * @method setBija
 * @param bija {Boolean}
 * @example
 * ```
 *var kollavarsham = require('kollavarsham');
 *kollavarsham.setMode(0);
 *kollavarsham.setBija(true);
 *kollavarsham.setInputDate(new Date(2014, 2, 14));
 *kollavarsham.convert();
 * ```
 */
Kollavarsham.prototype.setBija = function (bija) {
  this.settings.bija = bija;
};

/**
 * Sets the latitude for the location that will be used as the basis for the conversion
 * @method setLatitude
 * @param latitude
 * @example
 * ```
 * var kollavarsham = require('kollavarsham');
 * kollavarsham.setLatitude(8.5);
 * ```
 */
Kollavarsham.prototype.setLatitude = function (latitude) {
  this.settings.latitude = latitude;
};

Kollavarsham.prototype.setLongitude = function (longitude) {
  this.settings.longitude = longitude;
  globals.desantara = (longitude - locations.Ujjain.longitude) / 360;
};

Kollavarsham.prototype.setOutput = function (output) {
  this.settings.output = output;
};

Kollavarsham.prototype.displaySettings = function () {
  console.log("The settings for kollavarsham calculations are as follows:");
  console.log("Bija           : " + this.settings.bija);
  console.log("Mode           : " + this.settings.mode);
  console.log("Latitude       : " + this.settings.latitude);
  console.log("Longitude      : " + this.settings.longitude);
  console.log("Output         : " + this.settings.output);
  console.log("Gregorian Date : " + this.settings.gregorianDate);
};

/**
 * Sets the input Gregorian date for conversion
 * @method setInputDate
 * @param date
 */
Kollavarsham.prototype.setInputDate = function (date) {
  this.settings.gregorianDate = date;
};

module.exports = Kollavarsham;
