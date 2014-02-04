'use strict';

var math = require('./math');

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
  }
};

module.exports = calendar;