'use strict';

var math = require('./math');
var JulianDate = require('./julianDate');

var calendar = {
  months                   : {
    'JANUARY'   : 0,
    'FEBRUARY'  : 1,
    'MARCH'     : 2,
    'APRIL'     : 3,
    'MAY'       : 4,
    'JUNE'      : 5,
    'JULY'      : 6,
    'AUGUST'    : 7,
    'SEPTEMBER' : 8,
    'OCTOBER'   : 9,
    'NOVEMBER'  : 10,
    'DECEMBER'  : 11
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
  }
};

module.exports = calendar;
