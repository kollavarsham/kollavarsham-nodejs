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
 * @type {{settings: {bija: boolean, mode: number, latitude: number, longitude: number, output: string, gregorianDate: Date}, setMode: 'setMode', setBija: 'setBija', setLatitude: 'setLatitude', setLongitude: 'setLongitude', setOutput: 'setOutput', displaySettings: 'displaySettings', setGregorianDate: 'setGregorianDate'}}
 */
var kollavarsham = {
  settings           : {
    //These are the defaults
    bija          : false,
    mode          : 0,
    latitude      : 23.2,
    longitude     : 75.8,
    output        : "verbose",
    gregorianDate : new Date()
  },
  'setMode'          : function (mode) {
    this.settings.mode = mode;
  },
  'setBija'          : function (bija) {
    this.settings.bija = bija;
  },
  'setLatitude'      : function (latitude) {
    this.settings.latitude = latitude;
  },
  'setLongitude'     : function (longitude) {
    this.settings.longitude = longitude;
    globals.desantara = (longitude - locations.Ujjain.longitude) / 360;
  },
  'setOutput'        : function (output) {
    this.settings.output = output;
  },
  'displaySettings'  : function () {
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
   * @method setGregorianDate
   * @param date
   */
  "setGregorianDate" : function (date) {
    this.settings.gregorianDate = date;
  }
};

module.exports = kollavarsham;
