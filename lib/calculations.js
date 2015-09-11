/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Celestial = require('./celestial');
var celestial;
var calendar = require('./calendar');
var JulianDate = require('./date').JulianDate;
var KollavarshamDate = require('./date').KollavarshamDate;
var locations = require('./locations');
var math = require('./math');

var _setConstants = function (settings) {

  // TODO: Add Tests if/when feasible
  celestial = new Celestial(settings);

  // TODO: Refactor calendar into a class and create an instance instead of the below line
  calendar.initialize(settings);
};

var calculations = {
  calendarData        : {
    YearKali           : true,
    YearSaka           : true,
    YearVikrama        : true,
    masaNum            : true,
    masa               : true,
    sauraMasa          : true,
    malayalaMasa       : true, // HP
    mlMalayalaMasa     : true, // HP
    malayalaMasaNum    : true, // HP
    adhimasa           : true,
    paksa              : true,
    tithiDay           : true,
    ftithi             : true,
    naksatra           : true,
    malayalaNaksatra   : true, // HP
    mlMalayalaNaksatra : true, // HP
    sunriseTime        : {
      hour   : true,
      minute : true
    }
  },
  setPaksa            : function () {
    // TODO: Add Tests if/when feasible
    if (15 < this.calendarData.tithiDay) {
      this.calendarData.tithiDay -= 15;
      this.calendarData.paksa = 'Krsnapaksa';
    } else {
      this.calendarData.paksa = 'Suklapaksa';
    }
  },
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
    this.calendarData.sunriseTime = celestial.getSunriseTime(equationOfTime);

    // Lunar apogee and node at sunrise
    celestial.planetarySystem.planets.candrocca.MeanPosition = celestial.getMeanLongitude(ahargana, celestial.planetarySystem.planets.candrocca.YugaRotation) + 90;
    celestial.planetarySystem.planets.candrocca.MeanPosition = math.zero360(celestial.planetarySystem.planets.candrocca.MeanPosition);

    celestial.planetarySystem.planets.rahu.MeanPosition = celestial.getMeanLongitude(ahargana, celestial.planetarySystem.planets.rahu.YugaRotation) + 180;
    celestial.planetarySystem.planets.rahu.MeanPosition = math.zero360(celestial.planetarySystem.planets.rahu.MeanPosition);

    // mean and true sun at sunrise
    var meanSolarLongitude = celestial.getMeanLongitude(ahargana, celestial.planetarySystem.planets.sun.YugaRotation);
    celestial.planetarySystem.planets.sun.MeanPosition = meanSolarLongitude;
    var trueSolarLongitude = math.zero360(meanSolarLongitude -
      celestial.getMandaEquation((meanSolarLongitude - celestial.planetarySystem.planets.sun.Apogee), 'sun'));
    celestial.planetarySystem.planets.sun.TruePosition = trueSolarLongitude;

    // mean and true moon at sunrise
    var meanLunarLongitude = celestial.getMeanLongitude(ahargana, celestial.planetarySystem.planets.moon.YugaRotation);
    celestial.planetarySystem.planets.moon.MeanPosition = meanLunarLongitude;
    celestial.planetarySystem.planets.moon.Apogee = celestial.planetarySystem.planets.candrocca.MeanPosition;
    var trueLunarLongitude = math.zero360(meanLunarLongitude -
      celestial.getMandaEquation((meanLunarLongitude - celestial.planetarySystem.planets.moon.Apogee), 'moon'));
    celestial.planetarySystem.planets.moon.TruePosition = trueLunarLongitude;

    // finding tithi and longitude of conjunction
    var tithi = celestial.getTithi(trueLunarLongitude, trueSolarLongitude);
    this.calendarData.tithiDay = math.truncate(tithi) + 1;
    this.calendarData.ftithi = math.fractional(tithi);

    this.setPaksa();

    // last conjunction
    var lastConjunctionLongitude = celestial.getLastConjunctionLongitude(ahargana, tithi);

    // next conjunction
    var nextConjunctionLongitude = celestial.getNextConjunctionLongitude(ahargana, tithi);

    this.calendarData.adhimasa = calendar.getAdhimasa(lastConjunctionLongitude, nextConjunctionLongitude);
    this.calendarData.masaNum = calendar.getMasaNum(trueSolarLongitude, lastConjunctionLongitude);
    // TODO: Move the below function to within KollavarshamDate class
    this.calendarData.masa = calendar.getMasaName(this.calendarData.masaNum);

    var sauraMasaMonthDay = calendar.getSauraMasaMonthDay(ahargana, desantara);
    var sauraMasaNum = sauraMasaMonthDay.month;
    var sauraMasaDay = sauraMasaMonthDay.day;
    // TODO: Move the below function to within KollavarshamDate class
    this.calendarData.sauraMasa = calendar.getSauraMasaName(sauraMasaNum);

    this.calendarData.malayalaMasaNum = (sauraMasaNum - 4 + 12 ) % 12;
    // TODO: Move the below function to within KollavarshamDate class
    this.calendarData.malayalaMasa = calendar.getMalayalaMasaName(this.calendarData.malayalaMasaNum);
    this.calendarData.mlMalayalaMasa = calendar.getMlMalayalaMasaName(this.calendarData.malayalaMasaNum);

    this.calendarData.naksatra = calendar.getNaksatraName(trueLunarLongitude);
    this.calendarData.malayalaNaksatra = calendar.getMalayalaNaksatraName(trueLunarLongitude);
    this.calendarData.mlMalayalaNaksatra = calendar.getMlMalayalaNaksatraName(trueLunarLongitude);

    // kali and Saka era
    this.calendarData.YearKali = calendar.aharganaToKali(ahargana + ( 4 - this.calendarData.masaNum ) * 30);
    this.calendarData.YearSaka = calendar.kaliToSaka(this.calendarData.YearKali);
    this.calendarData.YearVikrama = this.calendarData.YearSaka + 135;
    // Sewell p.45 - https://archive.org/stream/indiancalendarwi00sewerich#page/45/mode/1up
    var malayalamYear = this.calendarData.YearSaka - 747 +
      math.truncate((this.calendarData.masaNum - this.calendarData.malayalaMasaNum + 12) / 12);

    // The below was a separate method named calculations.planetary (ported from planetary_calculations in perl)
    var planets = ['mercury', 'venus', 'mars', 'jupiter', 'saturn'];
    for (var i = 0; i < planets.length; i++) {
      celestial.planetarySystem.planets[planets[i]].MeanPosition = celestial.getMeanLongitude(ahargana, celestial.planetarySystem.planets[planets[i]].Rotation);
      celestial.planetarySystem.planets[planets[i]].TruePosition = celestial.getTrueLongitude(ahargana, meanSolarLongitude, planets[i]);
    }

    var kollavarshamDate = new KollavarshamDate(malayalamYear, sauraMasaNum, sauraMasaDay);
    kollavarshamDate.gregorianDate = gregorianDate;
    kollavarshamDate.julianDay = julianDay;
    kollavarshamDate.weekdayName = calendar.julianDayToWeekday(julianDay);
    kollavarshamDate.mlWeekdayName = calendar.julianDayToMlWeekday(julianDay);
    kollavarshamDate.ahargana = aharganaRounded;
    kollavarshamDate.calendarData = this.calendarData;

    return kollavarshamDate;
  },
  toGregorian         : function (settings) {
    // TODO: Implement this to convert a Kollavarsham date to Gregorian after figuring out the samkranti discrepancies
    // between Saka year and Malayalam year

    /* This is how it works in Perl - Set these below variables before calling this   */
    /*     this.calendarData.YearSaka, this.calendarData.masaNum, globals.paksa, globals.tithiDay )       */
    /* We are not doing this as we aren't trying to convert Saka or Vikrama year date */
    console.log('Settings: ' + JSON.stringify(settings));
    throw new Error('Not implemented');
  },
  toGregorianFromSaka : function (settings, hinduDate) {
    // TODO: Add Tests if/when feasible

    // This is implemented specifically for the pancanga-nodejs cli (https://github.com/kollavarsham/pancanga-nodejs)
    // Could be removed when toGregorian has been implemented based on this

    this.calendarData.YearSaka = hinduDate.yearSaka;
    this.calendarData.masaNum = hinduDate.masaNum;
    this.calendarData.paksa = hinduDate.paksa;
    this.calendarData.tithiDay = hinduDate.tithiDay;

    _setConstants(settings);
    this.calendarData.masa = calendar.getMasaName(this.calendarData.masaNum);
    if (this.calendarData.paksa === 'Krsnapaksa') {
      this.calendarData.tithiDay += 15;
    }
    this.calendarData.YearKali = calendar.sakaToKali(this.calendarData.YearSaka);
    var ahargana = calendar.kaliToAhargana(this.calendarData.YearKali, this.calendarData.masaNum, this.calendarData.tithiDay);
    this.setPaksa();
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
    kollavarshamDate.gregorianDate = modernDate;
    kollavarshamDate.julianDay = julianDay;
    kollavarshamDate.weekdayName = weekdayName;
    kollavarshamDate.ahargana = ahargana;

    return kollavarshamDate;
  }
};

module.exports = calculations;
