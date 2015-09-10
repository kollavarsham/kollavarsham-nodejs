/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

// var kollavarsham = require('../lib/Kollavarsham.js');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var Kollavarsham = require('../lib/kollavarsham');
var KollavarshamDate = Kollavarsham.kollavarshamDate;

exports.kollavarshamDate = {
  setUp                       : function (done) {
    // setup here
    done();
  },
  'empty constructor'         : function (test) {
    var date = new KollavarshamDate();
    test.expect(4);
    test.equal(date.day, 1);
    test.equal(date.month, 1);
    test.equal(date.year, 1);
    test.equal(date.toString(), '0001 01 01');
    test.done();
  },
  'end to end integration 01' : function (test) {
    var kollavarsham = new Kollavarsham();
    var date = new Date(1979, 4, 22);
    var malayalamDate = kollavarsham.fromGregorianDate(date);
    test.expect(25);
    test.equal(malayalamDate.year, 1154);
    test.equal(malayalamDate.month, 1);
    test.equal(malayalamDate.day, 8);
    test.equal(malayalamDate.calendarData.paksa, 'Krsnapaksa');
    test.equal(malayalamDate.calendarData.YearKali, 5080);
    test.equal(malayalamDate.calendarData.YearSaka, 1901);
    test.equal(malayalamDate.calendarData.YearVikrama, 2036);
    test.equal(malayalamDate.calendarData.masaNum, 1);
    test.equal(malayalamDate.calendarData.sauraMasa, 'Vrsa      ');
    test.equal(malayalamDate.calendarData.malayalaMasa, 'Idavam    ');
    test.equal(malayalamDate.calendarData.mlMalayalaMasa, 'ഇടവം');
    test.equal(malayalamDate.calendarData.malayalaMasaNum, 9);
    test.equal(malayalamDate.calendarData.tithiDay, 11);
    test.equal(malayalamDate.calendarData.ftithi, 0.79252347902327);
    test.equal(malayalamDate.calendarData.sunriseTime.hour, 5);
    test.equal(malayalamDate.calendarData.sunriseTime.minute, 24);
    test.equal(malayalamDate.calendarData.adhimasa, '');
    test.equal(malayalamDate.calendarData.masa, 'Vaisakha  ');
    test.equal(malayalamDate.calendarData.naksatra, 'U-bhadrapada');
    test.equal(malayalamDate.calendarData.malayalaNaksatra, 'Uthrattathi');
    test.equal(malayalamDate.calendarData.mlMalayalaNaksatra, 'ഉത്രട്ടാതി');
    test.equal(malayalamDate.julianDay, 2444016);
    test.equal(malayalamDate.weekdayName, 'Tuesday');
    test.equal(malayalamDate.mlWeekdayName, 'ചൊവ്വ');
    test.equal(malayalamDate.ahargana, 1855550);
    test.done();
  },
  'end to end integration 02' : function (test) {
    var kollavarsham = new Kollavarsham();
    var date = new Date(1983, 8, 7);
    var malayalamDate = kollavarsham.fromGregorianDate(date);
    test.expect(25);
    test.equal(malayalamDate.year, 1159);
    test.equal(malayalamDate.month, 4);
    test.equal(malayalamDate.day, 22);
    test.equal(malayalamDate.calendarData.paksa, 'Krsnapaksa');
    test.equal(malayalamDate.calendarData.YearKali, 5084);
    test.equal(malayalamDate.calendarData.YearSaka, 1905);
    test.equal(malayalamDate.calendarData.YearVikrama, 2040);
    test.equal(malayalamDate.calendarData.masaNum, 4);
    test.equal(malayalamDate.calendarData.sauraMasa, 'Simha     ');
    test.equal(malayalamDate.calendarData.malayalaMasa, 'Chingam   ');
    test.equal(malayalamDate.calendarData.mlMalayalaMasa, 'ചിങ്ങം');
    test.equal(malayalamDate.calendarData.malayalaMasaNum, 0);
    test.equal(malayalamDate.calendarData.tithiDay, 15);
    test.equal(malayalamDate.calendarData.ftithi, 0.9017860253741361);
    test.equal(malayalamDate.calendarData.sunriseTime.hour, 5);
    test.equal(malayalamDate.calendarData.sunriseTime.minute, 48);
    test.equal(malayalamDate.calendarData.adhimasa, '');
    test.equal(malayalamDate.calendarData.masa, 'Sravana   ');
    test.equal(malayalamDate.calendarData.naksatra, 'P-phalguni');
    test.equal(malayalamDate.calendarData.malayalaNaksatra, 'Pooram');
    test.equal(malayalamDate.calendarData.mlMalayalaNaksatra, 'പൂരം');
    test.equal(malayalamDate.julianDay, 2445585);
    test.equal(malayalamDate.weekdayName, 'Wednesday');
    test.equal(malayalamDate.mlWeekdayName, 'ബുധൻ');
    test.equal(malayalamDate.ahargana, 1857119);
    test.done();
  },
  'default settings'          : function (test) {
    var kollavarsham = new Kollavarsham();
    var settings = kollavarsham.getSettings();
    test.expect(4);
    test.equal(settings.system, 'SuryaSiddhanta');
    test.equal(settings.latitude, 23.2);
    test.equal(settings.longitude, 75.8);
    test.equal(settings.outputformat, 'verbose');
    test.done();
  },
  'setSystem'                 : function (test) {
    var kollavarsham = new Kollavarsham();
    kollavarsham.setSystem('DUMMY SYSTEM');
    test.expect(1);
    test.equal(kollavarsham.getSettings().system, 'DUMMY SYSTEM');
    test.done();
  },
  'setLatitude'               : function (test) {
    var kollavarsham = new Kollavarsham();
    kollavarsham.setLatitude('DUMMY Latitude');
    test.expect(1);
    test.equal(kollavarsham.getSettings().latitude, 'DUMMY Latitude');
    test.done();
  },
  'setLongitude'              : function (test) {
    var kollavarsham = new Kollavarsham();
    kollavarsham.setLongitude('DUMMY Longitude');
    test.expect(1);
    test.equal(kollavarsham.getSettings().longitude, 'DUMMY Longitude');
    test.done();
  },
  'setOutput'                 : function (test) {
    var kollavarsham = new Kollavarsham();
    kollavarsham.setOutput('DUMMY OUTPUT');
    test.expect(1);
    test.equal(kollavarsham.getSettings().output, 'DUMMY OUTPUT');
    test.done();
  },
  'toGregorianDate'           : function (test) {
    var kollavarsham = new Kollavarsham();
    test.throws(function () {
      kollavarsham.toGregorianDate('DUMMY KOLLAVARSHAM DATE');
    }, Error, 'When the API is implemented, will convert DUMMY KOLLAVARSHAM DATE');
    test.done();
  },
  'toGregorianDateFromSaka'   : function (test) {
    var kollavarsham = new Kollavarsham();
    var hinduDate = {
      yearSaka : 1937,
      masaNum  : 4,
      paksa    : 'Krsnapaksa',
      tithiDay : 12
    };
    var date = kollavarsham.toGregorianDateFromSaka(hinduDate);
    test.expect(6);
    test.equal(date.gregorianDate.getFullYear(), 2015);
    test.equal(date.gregorianDate.getMonth(), 8);
    test.equal(date.gregorianDate.getDate(), 10);
    test.equal(date.julianDay, 2457276);
    test.equal(date.weekdayName, 'Thursday');
    test.equal(date.ahargana, 1868810);
    test.done();
  }
};
