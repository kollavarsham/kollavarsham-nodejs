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
var locations = require('./locations');
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
  fromGregorian       : function (settings, gregorianDate) {
    // TODO: Add Tests if/when feasible
    _setConstants(settings);
    var julianDay = calendar.gregorianDateToJulianDay(gregorianDate);
    var ahargana = calendar.julianDayToAhargana(julianDay);
    julianDay = math.truncate(julianDay + 0.5);
    var aharganaRounded = math.truncate(ahargana + 0.5);

    // Definition of desantara
    //      http://books.google.com/books?id=kt9DIY1g9HYC&pg=PA683&lpg=PA683&dq=desantara&source=bl&ots=NLd1wFKFfN&sig=jCfG95R-6eiSff3L73DCodijo1I&hl=en&sa=X&ei=uKgHU__uKOr7yAGm0YGoBQ&ved=0CF8Q6AEwCDgK#v=onepage&q=desantara&f=false
    var desantara = (settings.longitude - locations.Ujjain.longitude) / 360;

    celestial.setAyanamsa(ahargana);

    // at 6 o'clock
    ahargana += 0.25;

    // desantara
    ahargana -= desantara;

    // time of sunrise at local latitude
    var equationOfTime = celestial.getDaylightEquation(gregorianDate.getFullYear(), settings.latitude, ahargana);
    ahargana -= equationOfTime;
    celestial.setSunriseTime(equationOfTime);

    // Lunar apogee and node at sunrise
    celestial.PlanetMeanPosition.Candrocca = celestial.getMeanLongitude(ahargana, celestial.YugaRotation.Candrocca) + 90;
    celestial.PlanetMeanPosition.Candrocca = celestial.zero360(celestial.PlanetMeanPosition.Candrocca);

    celestial.PlanetMeanPosition.Rahu = celestial.getMeanLongitude(ahargana, celestial.YugaRotation.Rahu) + 180;
    celestial.PlanetMeanPosition.Rahu = celestial.zero360(celestial.PlanetMeanPosition.Rahu);

    // mean and true sun at sunrise
    var meanSolarLongitude = celestial.getMeanLongitude(ahargana, celestial.YugaRotation.sun);
    celestial.PlanetMeanPosition.sun = meanSolarLongitude;
    var trueSolarLongitude = celestial.zero360(meanSolarLongitude -
        celestial.getMandaEquation((meanSolarLongitude - celestial.PlanetApogee.sun), 'sun'));
    celestial.PlanetTruePosition.sun = trueSolarLongitude;

    // mean and true moon at sunrise
    var meanLunarLongitude = celestial.getMeanLongitude(ahargana, celestial.YugaRotation.moon);
    celestial.PlanetMeanPosition.moon = meanLunarLongitude;
    celestial.PlanetApogee.moon = celestial.PlanetMeanPosition.Candrocca;
    var trueLunarLongitude = celestial.zero360(meanLunarLongitude -
        celestial.getMandaEquation((meanLunarLongitude - celestial.PlanetApogee.moon), 'moon'));
    celestial.PlanetTruePosition.moon = trueLunarLongitude;

    // finding tithi and longitude of conjunction
    var tithi = celestial.getTithi(trueLunarLongitude, trueSolarLongitude);
    celestial.setTithiSet(tithi);
    celestial.setSuklaKrsna();

    // last conjunction
    var lastConjunctionLongitude = celestial.getLastConjunctionLongitude(ahargana, tithi);

    // next conjunction
    var nextConjunctionLongitude = celestial.getNextConjunctionLongitude(ahargana, tithi);

    globals.adhimasa = calendar.getAdhimasa(lastConjunctionLongitude, nextConjunctionLongitude);
    globals.masaNum = calendar.getMasaNum(trueSolarLongitude, lastConjunctionLongitude);
    // TODO: Move the below function to within KollavarshamDate class
    globals.masa = calendar.getMasaName(globals.masaNum);

    var sauraMasaMonthDay = calendar.getSauraMasaMonthDay(ahargana, desantara);
    var sauraMasaNum = sauraMasaMonthDay.month;
    var sauraMasaDay = sauraMasaMonthDay.day;
    // TODO: Move the below function to within KollavarshamDate class
    globals.sauraMasa = calendar.getSauraMasaName(sauraMasaNum);

    globals.malayalaMasaNum = (sauraMasaNum - 4 + 12 ) % 12;
    // TODO: Move the below function to within KollavarshamDate class
    globals.malayalaMasa = calendar.getMalayalaMasaName(globals.malayalaMasaNum);

    globals.naksatra = calendar.getNaksatraName(trueLunarLongitude);
    globals.malayalaNaksatra = calendar.getMalayalaNaksatraName(trueLunarLongitude);

    // kali and Saka era
    globals.YearKali = calendar.aharganaToKali(ahargana + ( 4 - globals.masaNum ) * 30);
    globals.YearSaka = calendar.kaliToSaka(globals.YearKali);
    globals.YearVikrama = globals.YearSaka + 135;
    // Sewell p.45 - https://archive.org/stream/indiancalendarwi00sewerich#page/45/mode/1up
    var malayalamYear = globals.YearSaka - 747 +
        math.truncate((sauraMasaNum - globals.malayalaMasaNum + 12) / 12);
    //globals.MEYear = globals.;

    // The below was a separate method named calculations.planetary (ported from planetary_calculations in perl)
    var planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    for (var i = 0; i < planets.length; i++) {
      celestial.PlanetMeanPosition[planets[i]] = celestial.getMeanLongitude(ahargana, celestial.PlanetRotation[planets[i]]);
      celestial.PlanetTruePosition[planets[i]] = celestial.getTrueLongitude(ahargana, meanSolarLongitude, planets[i]);
    }

    var kollavarshamDate = new KollavarshamDate(malayalamYear, sauraMasaNum, sauraMasaDay);
    kollavarshamDate.globals = globals;
    kollavarshamDate.gregorianDate = gregorianDate;
    kollavarshamDate.julianDay = julianDay;
    kollavarshamDate.weekdayName = calendar.julianDayToWeekday(julianDay);
    kollavarshamDate.ahargana = aharganaRounded;

    return  kollavarshamDate;
  },
  toGregorian         : function (settings) {
    // TODO: Implement this to convert a Kollavarsham date to Gregorian after figuring out the sankranti discrepancies
    // between Saka year and Malayalam year

    /* This is how it works in Perl - Set these below variables before calling this   */
    /*     globals.YearSaka, globals.masaNum, globals.paksa, globals.tithiDay )       */
    /* We are not doing this as we aren't trying to convert Saka or Vikrama year date */
    console.log('Settings: ' + settings);
  },
  toGregorianFromSaka : function (settings, hinduDate) {
    // TODO: Add Tests if/when feasible

    // This is implemented specifically for the pancanga-nodejs cli (https://github.com/kollavarsham/pancanga-nodejs)
    // Could be removed when toGregorian has been implemented based on this

    globals.YearSaka = hinduDate.yearSaka;
    globals.masaNum = hinduDate.masaNum;
    globals.paksa = hinduDate.paksa;
    globals.tithiDay = hinduDate.tithiDay;

    _setConstants(settings);
    globals.masa = calendar.getMasaName(globals.masaNum);
    if (globals.paksa === 'Krsnapaksa') {
      globals.tithiDay += 15;
    }
    globals.YearKali = calendar.sakaToKali(globals.YearSaka);
    var ahargana = calendar.kaliToAhargana(globals.YearKali, globals.masaNum, globals.tithiDay);
    celestial.setSuklaKrsna();
    var julianDay = calendar.aharganaToJulianDay(ahargana);
    julianDay += 0.5;

    var modernDate = calendar.julianDayToModernDate(julianDay);
    if (JulianDate.prototype.isPrototypeOf(modernDate)) {
      console.log('kollavarsham::toGregorianDate: *** Returning an instance of JulianDate class ***');
    }

    var weekdayName = calendar.julianDayToWeekday(julianDay);

    // TODO: Not happy that the empty constructor will make this with MalayalamYear => 1, MalayalamMonth => 1, and MalayalamDate => 1
    // TODO: Think this through before implementing toGregorian above
    var kollavarshamDate = new KollavarshamDate();
    kollavarshamDate.globals = globals;
    kollavarshamDate.gregorianDate = modernDate;
    kollavarshamDate.julianDay = julianDay;
    kollavarshamDate.weekdayName = weekdayName;
    kollavarshamDate.ahargana = ahargana;

    return kollavarshamDate;
  }
};

module.exports = calculations;