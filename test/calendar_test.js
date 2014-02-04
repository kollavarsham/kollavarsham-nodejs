'use strict';

var cal = require('../lib/calendar.js');

function cmpDates(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
}

exports.calendar = {
  setUp                      : function (done) {
    done();
  },
  'nextDate'                 : function (test) {
    test.expect(9);
    test.ok(cmpDates(cal.nextDate(new Date(2013, cal.months.DECEMBER, 31)), new Date(2014, cal.months.JANUARY, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(2012, cal.months.JANUARY, 31)), new Date(2012, cal.months.FEBRUARY, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(2013, cal.months.FEBRUARY, 28)), new Date(2013, cal.months.MARCH, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(2012, cal.months.FEBRUARY, 28)), new Date(2012, cal.months.FEBRUARY, 29)));
    test.ok(cmpDates(cal.nextDate(new Date(1950, cal.months.FEBRUARY, 1)), new Date(1950, cal.months.FEBRUARY, 2)));
    test.ok(cmpDates(cal.nextDate(new Date(1997, cal.months.SEPTEMBER, 30)), new Date(1997, cal.months.OCTOBER, 1)));
    test.ok(cmpDates(cal.nextDate(new Date(1752, cal.months.MARCH, 24)), new Date(1752, cal.months.MARCH, 25)));
    test.ok(cmpDates(cal.nextDate(new Date(1752, cal.months.SEPTEMBER, 2)), new Date(1752, cal.months.SEPTEMBER, 3)));
    test.ok(cmpDates(cal.nextDate(new Date(1997, cal.months.DECEMBER, 30)), new Date(1997, cal.months.DECEMBER, 31)));
    test.done();
  },
  'gregorianDateToJulianDay' : function (test) {
    test.expect(14);
    test.equal(cal.gregorianDateToJulianDay(new Date(2013, cal.months.DECEMBER, 30)), 2456656.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2013, cal.months.DECEMBER, 31)), 2456657.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2012, cal.months.JANUARY, 31)), 2455957.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2013, cal.months.FEBRUARY, 28)), 2456351.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2012, cal.months.FEBRUARY, 28)), 2455985.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(2001, cal.months.JANUARY, 1)), 2451910.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1950, cal.months.FEBRUARY, 1)), 2433313.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1997, cal.months.SEPTEMBER, 30)), 2450721.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1752, cal.months.MARCH, 24)), 2361047.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1752, cal.months.SEPTEMBER, 2)), 2361209.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(1997, cal.months.DECEMBER, 30)), 2450812.5);
    test.equal(cal.gregorianDateToJulianDay(new Date(-1, cal.months.JANUARY, 31)), 1720722.5);
    // Special case for setting dates from years 0 - 99 AD
    var dateFrom7AD = new Date(7, cal.months.JANUARY, 1);
    dateFrom7AD.setFullYear(7);
    test.equal(cal.gregorianDateToJulianDay(dateFrom7AD), 1723614.5);
    var dateFrom0AD = new Date(0, cal.months.JANUARY, 1);
    dateFrom0AD.setFullYear(0);
    test.equal(cal.gregorianDateToJulianDay(dateFrom0AD), 1721057.5);
    test.done();
  }
};
