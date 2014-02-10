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
    // TODO: Add Tests if/when feasible
    celestial.setPrimaryConstants();
    if (this.settings.bija) {
      celestial.applyBija();
    }
    celestial.setSecondaryConstants();
    celestial.setPlanetaryConstants();
  },
  calculations      : function () {
    // TODO: Add Tests if/when feasible
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
    celestial.setTithiSet(globals.tithi);
    celestial.setSuklaKrsna();

    // last conjunction
    globals.clong = celestial.getClong(globals.ahar, globals.tithi);

    // next conjunction
    globals.nclong = celestial.getNclong(globals.ahar, globals.tithi);

    globals.adhimasa = calendar.getAdhimasa(globals.clong, globals.nclong);
    globals.masa_num = calendar.getMasaNum(globals.tslong, globals.clong);
    globals.masa = calendar.getMasaName(globals.masa_num);

    var sauraMasaMonthDay = calendar.getSauraMasaMonthDay(globals.ahar);
    globals.saura_masa_num = sauraMasaMonthDay.month;
    globals.saura_masa_day = sauraMasaMonthDay.day;
    //TODO: The below is still remaining
    /*
        $saura_masa = &get_saura_masa_name($saura_masa_num);               #20001231
        $naksatra   = &get_naksatra_name($tllong);

        #{kali and Saka era}
        $YearKali    = &Ahargana_to_Kali( $ahar + ( 4 - $masa_num ) * 30 );
        $YearSaka    = &Kali_to_Saka($YearKali);
        $YearVikrama = $YearSaka + 135;
     */
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
