/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 Calculations involved in the to and fro conversions of Kollavarsham to Gregorian dates and vice versa
 @module calculations
 */

'use strict';

var calendar = require('./calendar');
var celestial = require('./celestial');
var globals = require('./globals');
var math = require('./math');

var calculations = {
  setConstants      : function (settings) {
    // TODO: Add Tests if/when feasible
    celestial.setPrimaryConstants();
    if (settings.bija) {
      celestial.applyBija();
    }
    celestial.setSecondaryConstants();
    celestial.setPlanetaryConstants();
  },
  main : function (settings) {
    // TODO: Add Tests if/when feasible
    this.setConstants(settings);
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
    globals.eqtime = celestial.getDaylightEquation(globals.year, settings.latitude);
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
    globals.saura_masa = calendar.getSauraMasaName(globals.saura_masa_num);
    globals.naksatra = calendar.getNaksatraName(globals.tllong);

    // kali and Saka era
    globals.YearKali = calendar.aharganaToKali(globals.ahar + ( 4 - globals.masa_num ) * 30);
    globals.YearSaka = calendar.kaliToSaka(globals.YearKali);
    globals.YearVikrama = globals.YearSaka + 135;
  },
  planetary:function(){
    var planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    for (var i = 0; i < planets.length; i++){
      celestial.PlanetMeanPosition[planets[i]] = celestial.getMeanLongitude(globals.ahar, celestial.PlanetRotation[planets[i]]);
      celestial.PlanetTruePosition[planets[i]] = celestial.getTrueLongitude(globals.ahar, globals.mslong, planets[i]);
    }
  }
};

module.exports = calculations;