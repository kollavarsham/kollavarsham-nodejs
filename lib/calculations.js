/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var calendar = require('./calendar');
var celestial = require('./celestial');
var globals = require('./globals');
var math = require('./math');

var _setConstants = function (settings) {
  // TODO: Add Tests if/when feasible
  celestial.setPrimaryConstants();
  if (settings.bija) {
    celestial.applyBija();
  }
  celestial.setSecondaryConstants();
  celestial.setPlanetaryConstants();
};

var calculations = {
  main      : function (settings) {
    // TODO: Add Tests if/when feasible
    _setConstants(settings);
    // This is how it is done in Perl - we use the new gregorianDate global
    //globals.JulianDay = calendar.gregorianDateToJulianDay(new Date(globals.year, globals.month - 1, globals.day));
    globals.JulianDay = calendar.gregorianDateToJulianDay(globals.gregorianDate);
    globals.ahar = calendar.julianDayToAhargana(globals.JulianDay);
    globals.JulianDay = math.truncate(globals.JulianDay + 0.5);
    globals.ahargana = math.truncate(globals.ahar + 0.5);
    globals.weekdayName = calendar.julianDayToWeekday(globals.JulianDay);
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
    globals.masaNum = calendar.getMasaNum(globals.tslong, globals.clong);
    globals.masa = calendar.getMasaName(globals.masaNum);

    var sauraMasaMonthDay = calendar.getSauraMasaMonthDay(globals.ahar);
    globals.sauraMasaNum = sauraMasaMonthDay.month;
    globals.sauraMasaDay = sauraMasaMonthDay.day;
    globals.sauraMasa = calendar.getSauraMasaName(globals.sauraMasaNum);

    globals.malayalaMasaNum = (globals.sauraMasaNum - 4 + 12 ) % 12;
    globals.malayalaMasa = calendar.getMalayalaMasaName(globals.malayalaMasaNum);

    globals.naksatra = calendar.getNaksatraName(globals.tllong);
    globals.malayalaNaksatra = calendar.getMalayalaNaksatraName(globals.tllong);

    // kali and Saka era
    globals.YearKali = calendar.aharganaToKali(globals.ahar + ( 4 - globals.masaNum ) * 30);
    globals.YearSaka = calendar.kaliToSaka(globals.YearKali);
    globals.YearVikrama = globals.YearSaka + 135;
    globals.MalayalamYear = globals.YearSaka - 747 +
        math.truncate((globals.sauraMasaNum - globals.malayalaMasaNum + 12) / 12);
    //globals.MEYear = globals.;
  },
  planetary : function () {
    var planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    for (var i = 0; i < planets.length; i++) {
      celestial.PlanetMeanPosition[planets[i]] = celestial.getMeanLongitude(globals.ahar, celestial.PlanetRotation[planets[i]]);
      celestial.PlanetTruePosition[planets[i]] = celestial.getTrueLongitude(globals.ahar, globals.mslong, planets[i]);
    }
  }
};

module.exports = calculations;