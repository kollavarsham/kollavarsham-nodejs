/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
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
    // console.log(malayalamDate);
    /*
     { year: 1154,
     month: 1,
     day: 8,
     globals:
     { YugaCivilDays: 1577917828,
     YugaSynodicMonth: 53433336,
     YugaAdhimasa: 1593336,
     YugaTithi: 1603000080,
     YugaKsayadina: 25082252,
     lagna: true,
     backLastConjunctionAhargana: 1855524.836054698,
     backNextConjunctionAhargana: 1855554.3666426442,
     backLastConjunctionLongitude: 12.154594875383122,
     backNextConjunctionLongitude: 40.4946857611469,
     paksa: 'Krsnapaksa',
     YearKali: 5080,
     YearSaka: 1901,
     YearVikrama: 2036,
     masaNum: 1,
     sauraMasa: 'Vrsa      ',
     malayalaMasa: 'Idavam    ',
     mlMalayalaMasa: 'ഇടവം',
     malayalaMasaNum: 9,
     tithiDay: 11,
     ftithi: 0.79252347902327,
     sriseh: 5,
     srisem: 24,
     adhimasa: '',
     masa: 'Vaisakha  ',
     naksatra: 'U-bhadrapada',
     malayalaNaksatra: 'Uthrattathi',
     mlMalayalaNaksatra: 'ഉത്രട്ടാതി',
     samkranti: 1855543.2364859954,
     samkrantiYear: 1979,
     samkrantiMonth: 5,
     samkrantiDay: 15,
     samkrantiHour: 5,
     samkrantiMin: 40,
     ayanadeg: 22,
     ayanamin: 12 },
     gregorianDate: Tue May 22 1979 00:00:00 GMT-0400 (Eastern Daylight Time),
     julianDay: 2444016,
     weekdayName: 'Tuesday',
     mlWeekdayName: 'ചൊവ്വ',
     ahargana: 1855550 }
     */
    test.expect(41);
    test.equal(malayalamDate.year, 1154);
    test.equal(malayalamDate.month, 1);
    test.equal(malayalamDate.day, 8);
    test.equal(malayalamDate.globals.YugaCivilDays, 1577917828);
    test.equal(malayalamDate.globals.YugaSynodicMonth, 53433336);
    test.equal(malayalamDate.globals.YugaTithi, 1603000080);
    test.equal(malayalamDate.globals.YugaKsayadina, 25082252);
    test.equal(malayalamDate.globals.backLastConjunctionAhargana, 1855524.836054698);
    test.equal(malayalamDate.globals.backNextConjunctionAhargana, 1855554.3666426442);
    test.equal(malayalamDate.globals.backLastConjunctionLongitude, 12.154594875383122);
    test.equal(malayalamDate.globals.backNextConjunctionLongitude, 40.4946857611469);
    test.equal(malayalamDate.globals.paksa, 'Krsnapaksa');
    test.equal(malayalamDate.globals.YearKali, 5080);
    test.equal(malayalamDate.globals.YearSaka, 1901);
    test.equal(malayalamDate.globals.YearVikrama, 2036);
    test.equal(malayalamDate.globals.masaNum, 1);
    test.equal(malayalamDate.globals.sauraMasa, 'Vrsa      ');
    test.equal(malayalamDate.globals.malayalaMasa, 'Idavam    ');
    test.equal(malayalamDate.globals.mlMalayalaMasa, 'ഇടവം');
    test.equal(malayalamDate.globals.malayalaMasaNum, 9);
    test.equal(malayalamDate.globals.tithiDay, 11);
    test.equal(malayalamDate.globals.ftithi, 0.79252347902327);
    test.equal(malayalamDate.globals.sriseh, 5);
    test.equal(malayalamDate.globals.srisem, 24);
    test.equal(malayalamDate.globals.adhimasa, '');
    test.equal(malayalamDate.globals.masa, 'Vaisakha  ');
    test.equal(malayalamDate.globals.naksatra, 'U-bhadrapada');
    test.equal(malayalamDate.globals.malayalaNaksatra, 'Uthrattathi');
    test.equal(malayalamDate.globals.mlMalayalaNaksatra, 'ഉത്രട്ടാതി');
    test.equal(malayalamDate.globals.samkranti, 1855543.2364859954);
    test.equal(malayalamDate.globals.samkrantiYear, 1979);
    test.equal(malayalamDate.globals.samkrantiMonth, 5);
    test.equal(malayalamDate.globals.samkrantiDay, 15);
    test.equal(malayalamDate.globals.samkrantiHour, 5);
    test.equal(malayalamDate.globals.samkrantiMin, 40);
    test.equal(malayalamDate.globals.ayanadeg, 22);
    test.equal(malayalamDate.globals.ayanamin, 12);
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
    console.log(malayalamDate);
    /*
     { year: 1159,
     month: 4,
     day: 22,
     globals:
     { YugaCivilDays: 1577917828,
     YugaSynodicMonth: 53433336,
     YugaAdhimasa: 1593336,
     YugaTithi: 1603000080,
     YugaKsayadina: 25082252,
     lagna: true,
     backLastConjunctionAhargana: 1857089.8083534464,
     backNextConjunctionAhargana: 1857119.3389413925,
     backLastConjunctionLongitude: 111.57505966952066,
     backNextConjunctionLongitude: 139.7554072258478,
     paksa: 'Krsnapaksa',
     YearKali: 5084,
     YearSaka: 1905,
     YearVikrama: 2040,
     masaNum: 4,
     sauraMasa: 'Simha     ',
     malayalaMasa: 'Chingam   ',
     mlMalayalaMasa: 'ചിങ്ങം',
     malayalaMasaNum: 0,
     tithiDay: 15,
     ftithi: 0.9017860253741361,
     sriseh: 5,
     srisem: 48,
     adhimasa: '',
     masa: 'Sravana   ',
     naksatra: 'P-phalguni',
     malayalaNaksatra: 'Pooram',
     mlMalayalaNaksatra: 'പൂരം',
     samkranti: 1857098.8298748955,
     samkrantiYear: 1983,
     samkrantiMonth: 8,
     samkrantiDay: 17,
     samkrantiHour: 19,
     samkrantiMin: 55,
     ayanadeg: 22,
     ayanamin: 15 },
     gregorianDate: Wed Sep 07 1983 00:00:00 GMT-0400 (Eastern Daylight Time),
     julianDay: 2445585,
     weekdayName: 'Wednesday',
     mlWeekdayName: 'ബുധൻ',
     ahargana: 1857119 }
     */
    test.expect(41);
    test.equal(malayalamDate.year, 1159);
    test.equal(malayalamDate.month, 4);
    test.equal(malayalamDate.day, 22);
    test.equal(malayalamDate.globals.YugaCivilDays, 1577917828);
    test.equal(malayalamDate.globals.YugaSynodicMonth, 53433336);
    test.equal(malayalamDate.globals.YugaTithi, 1603000080);
    test.equal(malayalamDate.globals.YugaKsayadina, 25082252);
    test.equal(malayalamDate.globals.backLastConjunctionAhargana, 1857089.8083534464);
    test.equal(malayalamDate.globals.backNextConjunctionAhargana, 1857119.3389413925);
    test.equal(malayalamDate.globals.backLastConjunctionLongitude, 111.57505966952066);
    test.equal(malayalamDate.globals.backNextConjunctionLongitude, 139.7554072258478);
    test.equal(malayalamDate.globals.paksa, 'Krsnapaksa');
    test.equal(malayalamDate.globals.YearKali, 5084);
    test.equal(malayalamDate.globals.YearSaka, 1905);
    test.equal(malayalamDate.globals.YearVikrama, 2040);
    test.equal(malayalamDate.globals.masaNum, 4);
    test.equal(malayalamDate.globals.sauraMasa, 'Simha     ');
    test.equal(malayalamDate.globals.malayalaMasa, 'Chingam   ');
    test.equal(malayalamDate.globals.mlMalayalaMasa, 'ചിങ്ങം');
    test.equal(malayalamDate.globals.malayalaMasaNum, 0);
    test.equal(malayalamDate.globals.tithiDay, 15);
    test.equal(malayalamDate.globals.ftithi, 0.9017860253741361);
    test.equal(malayalamDate.globals.sriseh, 5);
    test.equal(malayalamDate.globals.srisem, 48);
    test.equal(malayalamDate.globals.adhimasa, '');
    test.equal(malayalamDate.globals.masa, 'Sravana   ');
    test.equal(malayalamDate.globals.naksatra, 'P-phalguni');
    test.equal(malayalamDate.globals.malayalaNaksatra, 'Pooram');
    test.equal(malayalamDate.globals.mlMalayalaNaksatra, 'പൂരം');
    test.equal(malayalamDate.globals.samkranti, 1857098.8298748955);
    test.equal(malayalamDate.globals.samkrantiYear, 1983);
    test.equal(malayalamDate.globals.samkrantiMonth, 8);
    test.equal(malayalamDate.globals.samkrantiDay, 17);
    test.equal(malayalamDate.globals.samkrantiHour, 19);
    test.equal(malayalamDate.globals.samkrantiMin, 55);
    test.equal(malayalamDate.globals.ayanadeg, 22);
    test.equal(malayalamDate.globals.ayanamin, 15);
    test.equal(malayalamDate.julianDay, 2445585);
    test.equal(malayalamDate.weekdayName, 'Wednesday');
    test.equal(malayalamDate.mlWeekdayName, 'ബുധൻ');
    test.equal(malayalamDate.ahargana, 1857119);
    test.done();
  }
};
