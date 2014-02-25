/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var celestial = require('./celestial');
var globals = require('./globals');
var math = require('./math');
var JulianDate = require('./date').JulianDate;

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
    'January'   : 0,
    'February'  : 1,
    'March'     : 2,
    'April'     : 3,
    'May'       : 4,
    'June'      : 5,
    'July'      : 6,
    'August'    : 7,
    'September' : 8,
    'October'   : 9,
    'November'  : 10,
    'December'  : 11
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
    0  : 'Mesa      ',
    1  : 'Vrsa      ',
    2  : 'Mithuna   ',
    3  : 'Karkata   ',
    4  : 'Simha     ',
    5  : 'Kanya     ',
    6  : 'Tula      ',
    7  : 'Vrscika   ',
    8  : 'Dhanus    ',
    9  : 'Makara    ',
    10 : 'Kumbha    ',
    11 : 'Mina      '
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
    11 : 'Karkitakam'
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
    // TODO: This looks like a concern of the calling library - But could be exposed as a static utility function  (0 usages other than tests)
    date.setUTCDate(date.getUTCDate() + 1);
    return date;
  },
  gregorianDateToJulianDay : function (date) {
    //  TODO:
    // Annotate all the magic numbers below !
    // There is some explanation here - http://quasar.as.utexas.edu/BillInfo/JulianDatesG.html

    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

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
    // TODO: This might be exposed as a static utility function (0 usages other than tests)
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
    // Will return JulianDate object for any date before 1st January 1583 AD and Date objects for later dates
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
  kaliToAhargana           : function (yearKali, masaNum, tithiDay) {
    var sauraMasas = yearKali * 12 + masaNum; // expired saura masas

    var adhiMasas = math.truncate(sauraMasas * globals.YugaAdhimasa / ( 12 * celestial.YugaRotation.sun ));  // expired adhimasas

    var candaMasas = sauraMasas + adhiMasas;  // expired candra masas

    var tithis = 30 * candaMasas + tithiDay - 1; // expired tithis

    var avamas = math.truncate(tithis * globals.YugaKsayadina / globals.YugaTithi); // expired avamas

    return tithis - avamas;
  },
  kaliToSaka               : function (yearKali) {
    return yearKali - 3179;
  },
  sakaToKali               : function (yearSaka) {
    return yearSaka + 3179;
  },
  julianDayToWeekday       : function (julianDay) {
    return this.weekdays[math.truncate(julianDay + 0.5) % 7];
  },
  getAdhimasa              : function (lastConjunctionLongitude, nextConjunctionLongitude) {
    var n1 = math.truncate(lastConjunctionLongitude / 30);
    var n2 = math.truncate(nextConjunctionLongitude / 30);
    return math.floatingPointEqual(n1, n2, false) ? 'Adhika-' : '';
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
    var leftTrueSolarLongitude = celestial.getTrueSolarLongitude(leftAhargana);
    var rightTrueSolarLongitude = celestial.getTrueSolarLongitude(rightAhargana);

    leftTrueSolarLongitude -= math.truncate(leftTrueSolarLongitude / 30) * 30;
    rightTrueSolarLongitude -= math.truncate(rightTrueSolarLongitude / 30) * 30;
    /* --- END   REDUNDANT ------------------- */

    var width = (rightAhargana - leftAhargana) / 2;
    var centreAhargana = (rightAhargana + leftAhargana) / 2;

    if (width < math.epsilon) {
      return centreAhargana;
    } else {
      var centreTslong = celestial.getTrueSolarLongitude(centreAhargana);
      centreTslong -= math.truncate(centreTslong / 30) * 30;
      if (centreTslong < 5) {
        return this.findSamkranti(leftAhargana, centreAhargana);
      } else {
        return this.findSamkranti(centreAhargana, rightAhargana);
      }
    }
  },
  setSamkranti             : function (ahargana, desantara) {
    globals.samkranti = this.findSamkranti(ahargana, ahargana + 1) + desantara;
    var samkrantiModernDate = this.julianDayToModernDate(this.aharganaToJulianDay(globals.samkranti));
    if (JulianDate.prototype.isPrototypeOf(samkrantiModernDate)) {
      globals.samkrantiYear = samkrantiModernDate.year;
      globals.samkrantiMonth = samkrantiModernDate.month;
      globals.samkrantiDay = samkrantiModernDate.day;
    } else {
      globals.samkrantiYear = samkrantiModernDate.getFullYear();
      globals.samkrantiMonth = samkrantiModernDate.getMonth() + 1;
      globals.samkrantiDay = samkrantiModernDate.getDate();
    }
    var fractionalDay = math.fractional(globals.samkranti) * 24;
    globals.samkrantiHour = math.truncate(fractionalDay);
    globals.samkrantiMin = math.truncate(60 * math.fractional(fractionalDay));
  },
  isTodaySauraMasaFirst    : function (ahargana, desantara) {
    /*
    //    Definition of the first day
    //    samkranti is between today's 0:00 and 24:00
    //    ==
    //    at 0:00 before 30x, at 24:00 after 30x
    */
    var trueSolarLongitudeToday = celestial.getTrueSolarLongitude(ahargana - desantara);
    var trueSolarLongitudeTomorrow = celestial.getTrueSolarLongitude(ahargana - desantara + 1);

    trueSolarLongitudeToday -= math.truncate(trueSolarLongitudeToday / 30) * 30;
    trueSolarLongitudeTomorrow -= math.truncate(trueSolarLongitudeTomorrow / 30) * 30;

    if (25 < trueSolarLongitudeToday && trueSolarLongitudeTomorrow < 5) {
      this.setSamkranti(ahargana, desantara);
      return true;
    }

    return false;
  },
  getSauraMasaMonthDay     : function (ahargana, desantara) {
    // If today is the first day then 1
    // Otherwise yesterday's + 1
    var month, day;
    ahargana = math.truncate(ahargana);
    if (this.isTodaySauraMasaFirst(ahargana, desantara)) {
      day = 1;
      var tsLongTomorrow = celestial.getTrueSolarLongitude(ahargana + 1);
      month = math.truncate(tsLongTomorrow / 30) % 12;
      month = (month + 12) % 12;
    } else {
      var sauraMasaMonthDay = this.getSauraMasaMonthDay(ahargana - 1, desantara);
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
