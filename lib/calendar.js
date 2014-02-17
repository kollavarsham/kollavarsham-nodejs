/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 * @module calendar
 */
'use strict';

var celestial = require('./celestial');
var globals = require('./globals');
var math = require('./math');
var JulianDate = require('./date').JulianDate;

/**
 * @class calendar
 * @static
 * @type {{weekdays: {0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string}, months: {January: number, February: number, March: number, April: number, May: number, June: number, July: number, August: number, September: number, October: number, November: number, December: number}, masaNames: {0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string}, sauraMasaNames: {0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string}, naksatras: {0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string, 12: string, 13: string, 14: string, 15: string, 16: string, 17: string, 18: string, 19: string, 20: string, 21: string, 22: string, 23: string, 24: string, 25: string, 26: string, 27: string}, nextDate: nextDate, gregorianDateToJulianDay: gregorianDateToJulianDay, julianInEngland: julianInEngland, julianDayToJulianDate: julianDayToJulianDate, julianDayToGregorianDate: julianDayToGregorianDate, julianDayToModernDate: julianDayToModernDate, julianDayToAhargana: julianDayToAhargana, aharganaToJulianDay: aharganaToJulianDay, aharganaToKali: aharganaToKali, kaliToSaka: kaliToSaka, julianDayToWeekday: julianDayToWeekday, getAdhimasa: getAdhimasa, getMasaNum: getMasaNum, getMasaName: getMasaName, findSamkranti: findSamkranti, setSamkranti: setSamkranti, isTodaySauraMasaFirst: isTodaySauraMasaFirst, getSauraMasaMonthDay: getSauraMasaMonthDay, getSauraMasaName: getSauraMasaName, getNaksatraName: getNaksatraName}}
 */
var calendar = {
  weekdays                 : {
    0 : 'Monday',
    1 : 'Tuesday',
    2 : 'Wednesday',
    3 : 'Thursday',
    4 : 'Friday',
    5 : 'Saturday',
    6 : 'Sunday'
  },
  months                   : {
    "January"   : 0,
    "February"  : 1,
    "March"     : 2,
    "April"     : 3,
    "May"       : 4,
    "June"      : 5,
    "July"      : 6,
    "August"    : 7,
    "September" : 8,
    "October"   : 9,
    "November"  : 10,
    "December"  : 11
  },
  masaNames                : {
    0  : 'Caitra    ',
    1  : 'Vaisakha  ',
    2  : 'Jyaistha  ',
    3  : 'Asadha    ',
    4  : 'Sravana   ',
    5  : 'Bhadrapada',
    6  : 'Asvina    ',
    7  : 'Karttika  ',
    8  : 'Margasirsa',
    9  : 'Pausa     ',
    10 : 'Magha     ',
    11 : 'Phalguna  '
  },
  sauraMasaNames           : {
    0  : 'Mesa   ',
    1  : 'Vrsa   ',
    2  : 'Mithuna',
    3  : 'Karkata',
    4  : 'Simha  ',
    5  : 'Kanya  ',
    6  : 'Tula   ',
    7  : 'Vrscika',
    8  : 'Dhanus ',
    9  : 'Makara ',
    10 : 'Kumbha ',
    11 : 'Mina   '
  },
  malayalaMasaNames        : {
    0  : 'Chingam   ',
    1  : 'Kanni     ',
    2  : 'Thulam    ',
    3  : 'Vrischikam',
    4  : 'Dhanu     ',
    5  : 'Makaram   ',
    6  : 'Kumbham   ',
    7  : 'Meenam    ',
    8  : 'Medam     ',
    9  : 'Idavam    ',
    10 : 'Mithunam  ',
    11 : 'Karkatakam'
  },
  naksatras                : {
    0  : 'Asvini',
    1  : 'Bharani',
    2  : 'Krttika',
    3  : 'Rohini',
    4  : 'Mrgasira',
    5  : 'Ardra',
    6  : 'Punarvasu',
    7  : 'Pusya',
    8  : 'Aslesa',
    9  : 'Magha',
    10 : 'P-phalguni',
    11 : 'U-phalguni',
    12 : 'Hasta',
    13 : 'Citra',
    14 : 'Svati',
    15 : 'Visakha',
    16 : 'Anuradha',
    17 : 'Jyestha',
    18 : 'Mula',
    19 : 'P-asadha',
    20 : 'U-asadha',
    21 : 'Sravana',
    22 : 'Dhanistha',
    23 : 'Satabhisaj',
    24 : 'P-bhadrapada',
    25 : 'U-bhadrapada',
    26 : 'Revati',
    27 : 'Asvini'
  },
  malayalaNaksatras        : {
    0  : 'Ashwathi',
    1  : 'Bharani',
    2  : 'Karthika',
    3  : 'Rohini',
    4  : 'Makiryam',
    5  : 'Thiruvathira',
    6  : 'Punartham',
    7  : 'Pooyam',
    8  : 'Aayilyam',
    9  : 'Makam',
    10 : 'Pooram',
    11 : 'Uthram',
    12 : 'Atham',
    13 : 'Chithra',
    14 : 'Chothi',
    15 : 'Vishakham',
    16 : 'Anizham',
    17 : 'Thrikketta',
    18 : 'Moolam',
    19 : 'Pooradam',
    20 : 'Uthradam',
    21 : 'Thiruvonam',
    22 : 'Avittam',
    23 : 'Chathayam',
    24 : 'Poororuttathi',
    25 : 'Uthrattathi',
    26 : 'Revathi',
    27 : 'Ashwathi'
  },
  nextDate                 : function (date) {
    date.setUTCDate(date.getUTCDate() + 1);
    return date;
  },
  gregorianDateToJulianDay : function (date) {
    //  TODO:
    // Annotate all the magic numbers below !
    // There is some explanation here - http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html

    var year = date.getUTCFullYear(),
        month = date.getUTCMonth() + 1,
        day = date.getUTCDate();

    if (month < 3) {
      year -= 1;
      month += 12;
    }

    var julianDay = math.truncate(365.25 * year) + math.truncate(30.59 * (month - 2)) + day + 1721086.5;

    if (year < 0) {
      julianDay -= 1;
      if (year % 4 === 0 && 3 <= month) {
        julianDay += 1;
      }
    }

    if (2299160 < julianDay) {
      julianDay += (math.truncate(year / 400) - math.truncate(year / 100) + 2);
    }

    return julianDay;
  },
  julianInEngland          : function (julianDay) {
    // Gregorian calendar was first introduced in most of Europe in 1582,
    // but it wasn't adopted in England (and so in US and Canada) until 1752
    //
    // - http://www.timeanddate.com/calendar/julian-gregorian-switch.html
    //
    // This function returns true between
    //      October 14th, 1582 and September 14th, 1752, both dates exclusive
    return 2299160 < julianDay && julianDay <= 2361221;
  },
  julianDayToJulianDate    : function (julianDay) {
    var j, k, l, n, i, J, I, year, month, day;

    j = math.truncate(julianDay) + 1402;
    k = math.truncate((j - 1) / 1461);
    l = j - 1461 * k;
    n = math.truncate((l - 1) / 365) - math.truncate(l / 1461);
    i = l - 365 * n + 30;
    J = math.truncate(80 * i / 2447);
    I = math.truncate(J / 11);

    day = i - math.truncate(2447 * J / 80);
    month = J + 2 - 12 * I;
    year = 4 * k + n + I - 4716;

    return new JulianDate(year, month, day);
  },
  julianDayToGregorianDate : function (julianDay) {
    var a, b, c, e, f, g, h, year, month, day;

    a = julianDay + 68569;
    b = math.truncate(a / 36524.25);
    c = a - math.truncate(36524.25 * b + 0.75);
    e = math.truncate((c + 1) / 365.2425);
    f = c - math.truncate(365.25 * e) + 31;
    g = math.truncate(f / 30.59);
    h = math.truncate(g / 11);

    day = math.truncate(f - math.truncate(30.59 * g) + (julianDay - math.truncate(julianDay)));
    month = math.truncate(g - 12 * h + 2);
    year = math.truncate(100 * (b - 49) + e + h);

    var result = new Date(year, month - 1, day);
    if (year > 0 && year <= 99) {
      result.setFullYear(year);
    }
    return  result;
  },
  julianDayToModernDate    : function (julianDay) {
    return julianDay < 2299239 ? this.julianDayToJulianDate(julianDay) : this.julianDayToGregorianDate(julianDay);
  },
  julianDayToAhargana      : function (julianDay) {
    return julianDay - 588465.50;
  },
  aharganaToJulianDay      : function (ahargana) {
    return 588465.50 + ahargana;
  },
  aharganaToKali           : function (ahargana) {
    return math.truncate(ahargana * celestial.YugaRotation.sun / globals.YugaCivilDays);
  },
  kaliToSaka               : function (yearKali) {
    return yearKali - 3179;
  },
  julianDayToWeekday       : function (julianDay) {
    return this.weekdays[math.truncate(julianDay + 0.5) % 7];
  },
  getAdhimasa              : function (clong, nclong) {
    return math.floatingPointEqual(math.truncate(clong / 30), math.truncate(nclong / 30), false) ? 'Adhika-' : '';
  },
  getMasaNum               : function (tslong, clong) {
    var masaNum = math.truncate(tslong / 30) % 12;
    if (masaNum === math.truncate(clong / 30) % 12) {
      masaNum += 1;
    }
    masaNum = (masaNum + 12) % 12;
    return masaNum;
  },
  getMasaName              : function (masaNum) {
    return this.masaNames[masaNum];
  },
  findSamkranti            : function (leftAhargana, rightAhargana) {
    /* The below block seems to be redundant   */
    /* --- START REDUNDANT ------------------- */
    var leftTslong = celestial.getTslong(leftAhargana);
    var rightTslong = celestial.getTslong(rightAhargana);

    leftTslong -= math.truncate(leftTslong / 30) * 30;
    rightTslong -= math.truncate(rightTslong / 30) * 30;
    /* --- END   REDUNDANT ------------------- */

    var width = (rightAhargana - leftAhargana) / 2;
    var centreAhargana = (rightAhargana + leftAhargana) / 2;

    if (width < math.epsilon) {
      return centreAhargana;
    } else {
      var centreTslong = celestial.getTslong(centreAhargana);
      centreTslong -= math.truncate(centreTslong / 30) * 30;
      if (centreTslong < 5) {
        return this.findSamkranti(leftAhargana, centreAhargana);
      } else {
        return this.findSamkranti(centreAhargana, rightAhargana);
      }
    }
  },
  setSamkranti             : function (ahargana) {
    globals.samkranti = this.findSamkranti(ahargana, ahargana + 1) + globals.desantara;
    var samkrantiModernDate = this.julianDayToModernDate(this.aharganaToJulianDay(globals.samkranti));
    if (JulianDate.prototype.isPrototypeOf(samkrantiModernDate)) {
      globals.samkranti_year = samkrantiModernDate.year;
      globals.samkranti_month = samkrantiModernDate.month;
      globals.samkranti_day = samkrantiModernDate.day;
    } else {
      globals.samkranti_year = samkrantiModernDate.getFullYear();
      globals.samkranti_month = samkrantiModernDate.getMonth() + 1;
      globals.samkranti_day = samkrantiModernDate.getDate();
    }
    var fractionalDay = math.fractional(globals.samkranti) * 24;
    globals.samkranti_hour = math.truncate(fractionalDay);
    globals.samkranti_min = math.truncate(60 * math.fractional(fractionalDay));
  },
  isTodaySauraMasaFirst    : function (ahargana) {
    /*
    //    Definition of the first day
    //    samkranti is between today's 0:00 and 24:00
    //    ==
    //    at 0:00 before 30x, at 24:00 after 30x
    */
    var tslongToday = celestial.getTslong(ahargana - globals.desantara);
    var tslongTomorrow = celestial.getTslong(ahargana - globals.desantara + 1);

    tslongToday -= math.truncate(tslongToday / 30) * 30;
    tslongTomorrow -= math.truncate(tslongTomorrow / 30) * 30;

    if (25 < tslongToday && tslongTomorrow < 5) {
      this.setSamkranti(ahargana);
      return true;
    }

    return false;
  },
  getSauraMasaMonthDay     : function (ahargana) {
    // If today is the first day then 1
    // Otherwise yesterday's + 1
    var month, day;
    ahargana = math.truncate(ahargana);
    if (this.isTodaySauraMasaFirst(ahargana)) {
      day = 1;
      var tsLongTomorrow = celestial.getTslong(ahargana + 1);
      month = math.truncate(tsLongTomorrow / 30) % 12;
      month = (month + 12) % 12;
    } else {
      var sauraMasaMonthDay = this.getSauraMasaMonthDay(ahargana - 1);
      month = sauraMasaMonthDay.month;
      day = sauraMasaMonthDay.day + 1;
    }
    return {month : month, day : day};
  },
  getSauraMasaName         : function (number) {
    return this.sauraMasaNames[number];
  },
  getMalayalaMasaName      : function (number) {
    return this.malayalaMasaNames[number];
  },
  getNaksatraName          : function (tllong) {
    return this.naksatras[math.truncate(tllong * 27 / 360)];
  },
  getMalayalaNaksatraName  : function (tllong) {
    return this.malayalaNaksatras[math.truncate(tllong * 27 / 360)];
  }
};

module.exports = calendar;
