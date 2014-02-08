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
  },
  'setBija' : function (bija) {
    this.settings.bija = bija;
  },
  'setLatitude' : function (latitude){
    this.settings.latitude = latitude;
  },
  'setLongitude' : function (longitude){
    this.settings.longitude = longitude;
  },
  'displaySettings' : function (){
     console.log("The settings for kollavarsham calculations are as follows:");
     console.log("Bija      : " + this.settings.bija);
     console.log("Mode      : " + this.settings.mode);
     console.log("Latitude  : " + this.settings.latitude);
     console.log("Longitude : " + this.settings.longitude);
     console.log("Output    : " + this.settings.output);
  }
};

module.exports = kollavarsham;
