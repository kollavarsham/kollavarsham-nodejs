/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 Floyd Pink
 * Licensed under the MIT license.
 */

'use strict';

var kollavarsham = {
  settings  : {
    //These are the defaults
    bija      : false,
    mode      : 0,
    latitude  : 23.2,
    longitude : 75.8,
    output    : "verbose"
  },
  'setMode' : function (mode) {
    this.settings.mode = mode;
    console.log("mode now is " + this.settings.mode);
  },
  'setBija' : function (bija) {
    this.settings.bija = bija;
    console.log("bija now is " + this.settings.bija);
  },
  'setLatitude' : function (latitude){
    this.settings.latitude = latitude;
    console.log("latitude now is " + this.settings.latitude);
  },
  'setLongitude' : function (longitude){
    this.settings.longitude = longitude;
    console.log("longitude now is " + this.settings.longitude);
  }
};

module.exports = kollavarsham;