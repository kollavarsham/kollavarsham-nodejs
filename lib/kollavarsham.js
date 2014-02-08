/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 Floyd Pink
 * Licensed under the MIT license.
 */

'use strict';

var globals = require('./globals');
var calendar = require('./calendar');
var celestial = require('./celestial');
var locations = require('./locations');
var math = require('./math');

var kollavarsham = {
  settings          : {
    //These are the defaults
    bija      : false,
    mode      : 0,
    latitude  : 23.2,
    longitude : 75.8,
    output    : "verbose"
  },
  'setMode'         : function (mode) {
    this.settings.mode = mode;
  },
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
  'displaySettings' : function () {
    console.log("The settings for kollavarsham calculations are as follows:");
    console.log("Bija      : " + this.settings.bija);
    console.log("Mode      : " + this.settings.mode);
    console.log("Latitude  : " + this.settings.latitude);
    console.log("Longitude : " + this.settings.longitude);
    console.log("Output    : " + this.settings.output);
  },
  setConstants      : function () {
    // TODO: Add Tests if feasible
    celestial.setPrimaryConstants();
    if (this.settings.bija) {
      celestial.applyBija();
    }
    celestial.setSecondaryConstants();
    celestial.setPlanetaryConstants();
  },
  calculations      : function () {
    // TODO: Add Tests if feasible
    this.setConstants();
    globals.JulianDay = calendar.gregorianDateToJulianDay(new Date(globals.year, globals.month - 1, globals.day));
    globals.ahar = calendar.julianDayToAhargana(globals.JulianDay);
    globals.JulianDay = math.truncate(globals.JulianDay + 0.5);
    globals.ahargana = math.truncate(globals.ahar + 0.5);
    globals.weekday_name = calendar.julianDayToWeekday(globals.JulianDay);
    celestial.setAyanamsa(globals.ahargana);

    // at 6 o'clock
    globals.ahar += 0.25;

    // desantara
    globals.ahar -= globals.desantara;

    // time of sunrise at local latitude
    globals.eqtime = celestial.getDaylightEquation(globals.year, this.settings.latitude);
    globals.ahar = globals.ahar - globals.eqtime;
    // TODO: continue from below...
    //( $sriseh, $srisem ) = &get_sun_rise_time($eqtime);
  }
};

module.exports = kollavarsham;
