'use strict';

var cal = require('../lib/calendar.js');

function cmpDates(date1, date2) {
  console.log(date1.toLocaleDateString());
  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
}

exports.calendar = {
  setUp      : function (done) {
    done();
  },
  'nextDate' : function (test) {
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
  }
};
