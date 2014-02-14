/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 CLI app to convert Gregorian date to Kollavarsham date and vice versa
 @module kollavrsham
 */

'use strict';

var globals = require('./globals');
var locations = require('./locations');

/**
 * @class kollavarsham
 * @static
 */
var kollavarsham = {
  /**
   * Default values for the settings
   * @property settings
   */
  settings          : {
    //These are the defaults
    bija          : false,
    mode          : 0,
    latitude      : 23.2,
    longitude     : 75.8,
    output        : "verbose",
    gregorianDate : new Date()
  },
  /**
   * Sets the mode of conversion - from Gregorian to Malayalam Era or vice versa. 0 and 1 (any non-zero value is considered as 1) are valid values
   *
   * @method setMode
   * @param mode {Number} A value of 0 will do Gregorian to Malayalam Era and a value of 1 (or any non-zero value) will do Malayalam Era date to Gregorian
   * @example
   *    var kollavarsham = require('kollavarsham');
   *    kollavarsham.setMode(0);
   *    kollavarsham.setInputDate(new Date(2014, 2, 14));
   *    kollvarsham.convert();
   */
  'setMode'         : function (mode) {
    this.settings.mode = mode;
  },
  /**
   * Sets or unsets the Bija factor
   * @method setBija
   * @param bija {Boolean}
   * @example
   *    var kollavarsham = require('kollavarsham');
   *    kollavarsham.setMode(0);
   *    kollavarsham.setBija(true);
   *    kollavarsham.setInputDate(new Date(2014, 2, 14));
   *    kollvarsham.convert();
   */
  'setBija'         : function (bija) {
    this.settings.bija = bija;
  },
  'setLatitude'     : function (latitude) {
    this.settings.latitude = latitude;
  },
  'setLongitude'    : function (longitude) {
    this.settings.longitude = longitude;
    globals.desantara = (longitude - locations.Ujjain.longitude) / 360;
  },
  'setOutput'       : function (output) {
    this.settings.output = output;
  },
  'displaySettings' : function () {
    console.log("The settings for kollavarsham calculations are as follows:");
    console.log("Bija      : " + this.settings.bija);
    console.log("Mode      : " + this.settings.mode);
    console.log("Latitude  : " + this.settings.latitude);
    console.log("Longitude : " + this.settings.longitude);
    console.log("Output    : " + this.settings.output);
    console.log("Gregorian Date: " + this.settings.gregorianDate);
  },
  /**
   * Sets the input Gregorian date for conversion
   * @method setInputDate
   * @param date
   */
  "setInputDate"    : function (date) {
    this.settings.gregorianDate = date;
  }
};

module.exports = kollavarsham;
