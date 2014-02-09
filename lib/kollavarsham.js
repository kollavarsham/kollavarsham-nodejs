/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
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
    bija          : false,
    mode          : 0,
    latitude      : 23.2,
    longitude     : 75.8,
    output        : "verbose",
    gregorianDate : new Date()
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
    globals.ahar -= globals.eqtime;
    celestial.setSunriseTime(globals.eqtime);

    // Lunar apogee and node at sunrise
    celestial.PlanetMeanPosition.Candrocca = celestial.getMeanLongitude(globals.ahar, celestial.YugaRotation.Candrocca) + 90;
    celestial.PlanetMeanPosition.Candrocca = celestial.zero360(celestial.PlanetMeanPosition.Candrocca);

    celestial.PlanetMeanPosition.Rahu = celestial.getMeanLongitude(globals.ahar, celestial.YugaRotation.Rahu) + 180;
    celestial.PlanetMeanPosition.Rahu = celestial.zero360(celestial.PlanetMeanPosition.Rahu);

    // mean and true sun at sunrise
    globals.mslong = celestial.getMeanLongitude(globals.ahar, celestial.YugaRotation.sun);
    celestial.PlanetMeanPosition.sun = globals.mslong;
    globals.tslong = celestial.zero360(globals.mslong -
        celestial.getMandaEquation((globals.mslong - celestial.PlanetApogee.sun), 'sun'));
    celestial.PlanetMeanPosition.sun = globals.tslong;

    // mean and true moon at sunrise
    globals.mllong = celestial.getMeanLongitude(globals.ahar, celestial.YugaRotation.moon);
    celestial.YugaRotation.moon = globals.mllong;
    celestial.PlanetApogee.moon = celestial.PlanetMeanPosition.Candrocca;
    globals.tllong = celestial.zero360(globals.mllong -
        celestial.getMandaEquation(( globals.mllong - celestial.PlanetApogee.moon), 'moon'));
    celestial.PlanetTruePosition.moon = globals.tllong;

    // finding tithi and longitude of conjunction
    globals.tithi = celestial.getTithi(globals.tllong, globals.tslong);
    //( $tithi_day, $ftithi ) = &get_tithi_set($tithi);
    //( $tithi_day, $sukla_krsna, $paksa ) = &set_sukla_krsna($tithi_day);
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
  'setInputDate'    : function (date) {
    this.settings.gregorianDate = date;
  }
};

module.exports = kollavarsham;
