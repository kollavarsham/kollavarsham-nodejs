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
var JulianDate = require('./date').JulianDate;
var KollavarshamDate = require('./date').KollavarshamDate;
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
  fromGregorian : function (settings, gregorianDate) {
    // TODO: Add Tests if/when feasible
    _setConstants(settings);
    // This is how it is done in Perl - we use the new gregorianDate global
    //julianDay = calendar.gregorianDateToJulianDay(new Date(globals.year, globals.month - 1, globals.day));
    var julianDay = calendar.gregorianDateToJulianDay(gregorianDate);
    var ahar = calendar.julianDayToAhargana(julianDay);
    julianDay = math.truncate(julianDay + 0.5);
    var ahargana = math.truncate(ahar + 0.5);

    // TODO: weekdayName below is not being used right now
    var weekdayName = calendar.julianDayToWeekday(julianDay);
    console.log('TODO: Do we need this weekday name: %s?', weekdayName);

    celestial.setAyanamsa(ahargana);

    // at 6 o'clock
    ahar += 0.25;

    // desantara
    ahar -= globals.desantara;

    // time of sunrise at local latitude
    var equationOfTime = celestial.getDaylightEquation(gregorianDate.getFullYear(), settings.latitude, ahar);
    ahar -= equationOfTime;
    celestial.setSunriseTime(equationOfTime);

    // Lunar apogee and node at sunrise
    celestial.PlanetMeanPosition.Candrocca = celestial.getMeanLongitude(ahar, celestial.YugaRotation.Candrocca) + 90;
    celestial.PlanetMeanPosition.Candrocca = celestial.zero360(celestial.PlanetMeanPosition.Candrocca);

    celestial.PlanetMeanPosition.Rahu = celestial.getMeanLongitude(ahar, celestial.YugaRotation.Rahu) + 180;
    celestial.PlanetMeanPosition.Rahu = celestial.zero360(celestial.PlanetMeanPosition.Rahu);

    // mean and true sun at sunrise
    globals.mslong = celestial.getMeanLongitude(ahar, celestial.YugaRotation.sun);
    celestial.PlanetMeanPosition.sun = globals.mslong;
    globals.tslong = celestial.zero360(globals.mslong -
        celestial.getMandaEquation((globals.mslong - celestial.PlanetApogee.sun), 'sun'));
    celestial.PlanetMeanPosition.sun = globals.tslong;

    // mean and true moon at sunrise
    globals.mllong = celestial.getMeanLongitude(ahar, celestial.YugaRotation.moon);
    celestial.YugaRotation.moon = globals.mllong;
    celestial.PlanetApogee.moon = celestial.PlanetMeanPosition.Candrocca;
    globals.tllong = celestial.zero360(globals.mllong -
        celestial.getMandaEquation(( globals.mllong - celestial.PlanetApogee.moon), 'moon'));
    celestial.PlanetTruePosition.moon = globals.tllong;

    // finding tithi and longitude of conjunction
    var tithi = celestial.getTithi(globals.tllong, globals.tslong);
    celestial.setTithiSet(tithi);
    celestial.setSuklaKrsna();

    // last conjunction
    globals.clong = celestial.getClong(ahar, tithi);

    // next conjunction
    globals.nclong = celestial.getNclong(ahar, tithi);

    globals.adhimasa = calendar.getAdhimasa(globals.clong, globals.nclong);
    globals.masaNum = calendar.getMasaNum(globals.tslong, globals.clong);
    // TODO: Move the below function to within KollavarshamDate class
    globals.masa = calendar.getMasaName(globals.masaNum);

    var sauraMasaMonthDay = calendar.getSauraMasaMonthDay(ahar);
    var sauraMasaNum = sauraMasaMonthDay.month;
    var sauraMasaDay = sauraMasaMonthDay.day;
    // TODO: Move the below function to within KollavarshamDate class
    globals.sauraMasa = calendar.getSauraMasaName(sauraMasaNum);

    globals.malayalaMasaNum = (sauraMasaNum - 4 + 12 ) % 12;
    // TODO: Move the below function to within KollavarshamDate class
    globals.malayalaMasa = calendar.getMalayalaMasaName(globals.malayalaMasaNum);

    globals.naksatra = calendar.getNaksatraName(globals.tllong);
    globals.malayalaNaksatra = calendar.getMalayalaNaksatraName(globals.tllong);

    // kali and Saka era
    globals.YearKali = calendar.aharganaToKali(ahar + ( 4 - globals.masaNum ) * 30);
    globals.YearSaka = calendar.kaliToSaka(globals.YearKali);
    globals.YearVikrama = globals.YearSaka + 135;
    // Sewell p.45 - https://archive.org/stream/indiancalendarwi00sewerich#page/45/mode/1up
    var malayalamYear = globals.YearSaka - 747 +
        math.truncate((sauraMasaNum - globals.malayalaMasaNum + 12) / 12);
    //globals.MEYear = globals.;

    // The below was a separate method named calculations.planetary (ported from planetary_calculations in perl)
    var planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    for (var i = 0; i < planets.length; i++) {
      celestial.PlanetMeanPosition[planets[i]] = celestial.getMeanLongitude(ahar, celestial.PlanetRotation[planets[i]]);
      celestial.PlanetTruePosition[planets[i]] = celestial.getTrueLongitude(ahar, globals.mslong, planets[i]);
    }

    var kollavarshamDate = new KollavarshamDate(malayalamYear, sauraMasaNum, sauraMasaDay);
    kollavarshamDate.globals = globals;
    kollavarshamDate.gregorianDate = gregorianDate;
    kollavarshamDate.julianDay = julianDay;

    return  kollavarshamDate;
  },
  toGregorian   : function (settings) {
    // TODO: Add Tests if/when feasible

    /* This is how it works in Perl - Set these below variables before calling this   */
    /*     globals.YearSaka, globals.masaNum, globals.paksa, globals.tithiDay )       */
    /* We are not doing this as we aren't trying to convert Saka or Vikrama year date */

    _setConstants(settings);
    globals.masa = calendar.getMasaName(globals.masaNum);
    if (globals.paksa === 'Krsnapaksa') {
      globals.tithiDay += 15;
    }
    globals.YearKali = calendar.sakaToKali(globals.YearSaka);
    var ahar = calendar.kaliToAhargana(globals.YearKali, globals.masaNum, globals.tithiDay);
    celestial.setSuklaKrsna();
    var julianDay = calendar.aharganaToJulianDay(ahar);
    julianDay += 0.5;

    var modernDate = this.julianDayToModernDate(julianDay);
    if (JulianDate.prototype.isPrototypeOf(modernDate)) {
      console.log('kollavarsham::toGregorianDate: *** Returning an instance of JulianDate class ***');
    }

    // TODO: weekdayName below is not being used right now
    var weekdayName = calendar.julianDayToWeekday(julianDay);
    console.log('TODO: Do we need this weekday name: %s?', weekdayName);
  }
};

module.exports = calculations;