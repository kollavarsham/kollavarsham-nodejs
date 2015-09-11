/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var calendar = require('../lib/calendar');
var Celestial = require('../lib/celestial');
var celestial;
var math = require('../lib/math');

var settings = {
  latitude     : 23.2,
  longitude    : 75.8,
  outputformat : 'verbose'
};

function cmpDates(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

exports.calendar = {
  setUp                          : function (done) {
    celestial = new Celestial(settings);
    calendar.initialize(settings);
    done();
  },
  'nextDate'                     : function (test) {
    test.expect(9);
    test.ok(cmpDates(calendar.nextDate(new Date(2013, calendar.months.December, 31)), new Date(2014, calendar.months.January, 1)));
    test.ok(cmpDates(calendar.nextDate(new Date(2012, calendar.months.January, 31)), new Date(2012, calendar.months.February, 1)));
    test.ok(cmpDates(calendar.nextDate(new Date(2013, calendar.months.February, 28)), new Date(2013, calendar.months.March, 1)));
    test.ok(cmpDates(calendar.nextDate(new Date(2012, calendar.months.February, 28)), new Date(2012, calendar.months.February, 29)));
    test.ok(cmpDates(calendar.nextDate(new Date(1950, calendar.months.February, 1)), new Date(1950, calendar.months.February, 2)));
    test.ok(cmpDates(calendar.nextDate(new Date(1997, calendar.months.September, 30)), new Date(1997, calendar.months.October, 1)));
    test.ok(cmpDates(calendar.nextDate(new Date(1752, calendar.months.March, 24)), new Date(1752, calendar.months.March, 25)));
    test.ok(cmpDates(calendar.nextDate(new Date(1752, calendar.months.September, 2)), new Date(1752, calendar.months.September, 3)));
    test.ok(cmpDates(calendar.nextDate(new Date(1997, calendar.months.December, 30)), new Date(1997, calendar.months.December, 31)));
    test.done();
  },
  'gregorianDateToJulianDay'     : function (test) {
    test.expect(16);
    test.equal(calendar.gregorianDateToJulianDay(new Date(2014, calendar.months.February, 16)), 2456704.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(2013, calendar.months.December, 30)), 2456656.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(2013, calendar.months.December, 31)), 2456657.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(2012, calendar.months.January, 31)), 2455957.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(2013, calendar.months.February, 28)), 2456351.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(2012, calendar.months.February, 28)), 2455985.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(2001, calendar.months.January, 1)), 2451910.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(1950, calendar.months.February, 1)), 2433313.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(1997, calendar.months.September, 30)), 2450721.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(1752, calendar.months.March, 24)), 2361047.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(1752, calendar.months.September, 2)), 2361209.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(1997, calendar.months.December, 30)), 2450812.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(-1, calendar.months.January, 31)), 1720722.5);
    test.equal(calendar.gregorianDateToJulianDay(new Date(-4, calendar.months.October, 31)), 1719900.5);
    // Special case for setting dates from years 0 - 99 AD
    var dateFrom7AD = new Date(7, calendar.months.January, 1);
    dateFrom7AD.setFullYear(7);
    test.equal(calendar.gregorianDateToJulianDay(dateFrom7AD), 1723614.5);
    var dateFrom0AD = new Date(0, calendar.months.January, 1);
    dateFrom0AD.setFullYear(0);
    test.equal(calendar.gregorianDateToJulianDay(dateFrom0AD), 1721057.5);
    test.done();
  },
  'julianInEngland'              : function (test) {
    test.expect(7);
    test.equal(calendar.julianInEngland(2299158.5), false);
    test.equal(calendar.julianInEngland(2299159.5), false);
    test.equal(calendar.julianInEngland(2299160.5), true);
    test.equal(calendar.julianInEngland(2299161.5), true);
    test.equal(calendar.julianInEngland(2361220.5), true);
    test.equal(calendar.julianInEngland(2361221.5), false);
    test.equal(calendar.julianInEngland(2361222.5), false);
    test.done();
  },
  'julianInEnglandFromGregorian' : function (test) {
    test.expect(11);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(200, calendar.months.January, 31))), false);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1582, calendar.months.October, 12))), false);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1582, calendar.months.October, 13))), false);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1582, calendar.months.October, 14))), false);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1582, calendar.months.October, 15))), true);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1582, calendar.months.October, 16))), true);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1752, calendar.months.September, 11))), true);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1752, calendar.months.September, 12))), true);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1752, calendar.months.September, 13))), true);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1752, calendar.months.September, 14))), false);
    test.equal(calendar.julianInEngland(calendar.gregorianDateToJulianDay(new Date(1752, calendar.months.September, 15))), false);
    test.done();
  },
  'julianDayToJulianDate'        : function (test) {
    test.expect(8);
    test.equal(calendar.julianDayToJulianDate(2299158.5).toString(), '1582 10 02');
    test.equal(calendar.julianDayToJulianDate(2299159.5).toString(), '1582 10 03');
    test.equal(calendar.julianDayToJulianDate(2299160.5).toString(), '1582 10 04');
    test.equal(calendar.julianDayToJulianDate(2299161.5).toString(), '1582 10 05');
    test.equal(calendar.julianDayToJulianDate(2361220.5).toString(), '1752 09 01');
    test.equal(calendar.julianDayToJulianDate(2361221.5).toString(), '1752 09 02');
    test.equal(calendar.julianDayToJulianDate(2361222.5).toString(), '1752 09 03');
    test.equal(calendar.julianDayToJulianDate(1721457.5).toString(), '0001 02 03');
    test.done();
  },
  'julianDayToGregorianDate'     : function (test) {
    test.expect(14);
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2299158.5), new Date(1582, calendar.months.October, 13)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2299159.5), new Date(1582, calendar.months.October, 14)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2299160.5), new Date(1582, calendar.months.October, 15)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2299161.5), new Date(1582, calendar.months.October, 16)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2361220.5), new Date(1752, calendar.months.September, 13)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2361221.5), new Date(1752, calendar.months.September, 14)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2361222.5), new Date(1752, calendar.months.September, 15)));
    var dateFrom1AD = new Date(1, calendar.months.February, 2);
    dateFrom1AD.setFullYear(1);
    test.ok(cmpDates(calendar.julianDayToGregorianDate(1721457.5), dateFrom1AD));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2456656.5), new Date(2013, calendar.months.December, 30)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2456657.5), new Date(2013, calendar.months.December, 31)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2455957.5), new Date(2012, calendar.months.January, 31)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2456351.5), new Date(2013, calendar.months.February, 28)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2455985.5), new Date(2012, calendar.months.February, 28)));
    test.ok(cmpDates(calendar.julianDayToGregorianDate(2433313.5), new Date(1950, calendar.months.February, 1)));
    test.done();
  },
  'julianDayToModernDate'        : function (test) {
    test.expect(14);
    test.equal(calendar.julianDayToModernDate(2299158.5).toString(), '1582 10 02');
    test.equal(calendar.julianDayToModernDate(2299159.5).toString(), '1582 10 03');
    test.equal(calendar.julianDayToModernDate(2299160.5).toString(), '1582 10 04');
    test.equal(calendar.julianDayToModernDate(2299161.5).toString(), '1582 10 05');
    test.equal(calendar.julianDayToModernDate(1721457.5).toString(), '0001 02 03');
    test.ok(cmpDates(calendar.julianDayToModernDate(2361220.5), new Date(1752, calendar.months.September, 13)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2361221.5), new Date(1752, calendar.months.September, 14)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2361222.5), new Date(1752, calendar.months.September, 15)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2456656.5), new Date(2013, calendar.months.December, 30)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2456657.5), new Date(2013, calendar.months.December, 31)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2455957.5), new Date(2012, calendar.months.January, 31)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2456351.5), new Date(2013, calendar.months.February, 28)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2455985.5), new Date(2012, calendar.months.February, 28)));
    test.ok(cmpDates(calendar.julianDayToModernDate(2433313.5), new Date(1950, calendar.months.February, 1)));
    test.done();
  },
  'julianDayToAhargana'          : function (test) {
    test.expect(14);
    test.equal(calendar.julianDayToAhargana(2299158.5), 1710693);
    test.equal(calendar.julianDayToAhargana(2299159.5), 1710694);
    test.equal(calendar.julianDayToAhargana(2299160.5), 1710695);
    test.equal(calendar.julianDayToAhargana(2299161.5), 1710696);
    test.equal(calendar.julianDayToAhargana(2361220.5), 1772755);
    test.equal(calendar.julianDayToAhargana(2361221.5), 1772756);
    test.equal(calendar.julianDayToAhargana(2361222.5), 1772757);
    test.equal(calendar.julianDayToAhargana(1721457.5), 1132992);
    test.equal(calendar.julianDayToAhargana(2456656.5), 1868191);
    test.equal(calendar.julianDayToAhargana(2456657.5), 1868192);
    test.equal(calendar.julianDayToAhargana(2455957.5), 1867492);
    test.equal(calendar.julianDayToAhargana(2456351.5), 1867886);
    test.equal(calendar.julianDayToAhargana(2455985.5), 1867520);
    test.equal(calendar.julianDayToAhargana(2433313.5), 1844848);
    test.done();
  },
  'aharganaToJulianDay'          : function (test) {
    test.expect(14);
    test.equal(calendar.aharganaToJulianDay(1710693), 2299158.5);
    test.equal(calendar.aharganaToJulianDay(1710694), 2299159.5);
    test.equal(calendar.aharganaToJulianDay(1710695), 2299160.5);
    test.equal(calendar.aharganaToJulianDay(1710696), 2299161.5);
    test.equal(calendar.aharganaToJulianDay(1772755), 2361220.5);
    test.equal(calendar.aharganaToJulianDay(1772756), 2361221.5);
    test.equal(calendar.aharganaToJulianDay(1772757), 2361222.5);
    test.equal(calendar.aharganaToJulianDay(1132992), 1721457.5);
    test.equal(calendar.aharganaToJulianDay(1868191), 2456656.5);
    test.equal(calendar.aharganaToJulianDay(1868192), 2456657.5);
    test.equal(calendar.aharganaToJulianDay(1867492), 2455957.5);
    test.equal(calendar.aharganaToJulianDay(1867886), 2456351.5);
    test.equal(calendar.aharganaToJulianDay(1867520), 2455985.5);
    test.equal(calendar.aharganaToJulianDay(1844848), 2433313.5);
    test.done();
  },
  'julianDayToWeekday'           : function (test) {
    test.expect();
    test.equal(calendar.julianDayToWeekday(2299158.5), 'Wednesday');
    test.equal(calendar.julianDayToWeekday(2299159.5), 'Thursday');
    test.equal(calendar.julianDayToWeekday(2299160.5), 'Friday');
    test.equal(calendar.julianDayToWeekday(2299161.5), 'Saturday');
    test.equal(calendar.julianDayToWeekday(2361220.5), 'Wednesday');
    test.equal(calendar.julianDayToWeekday(2361221.5), 'Thursday');
    test.equal(calendar.julianDayToWeekday(2361222.5), 'Friday');
    test.equal(calendar.julianDayToWeekday(1721457.5), 'Friday');
    test.equal(calendar.julianDayToWeekday(2456656.5), 'Monday');
    test.equal(calendar.julianDayToWeekday(2456657.5), 'Tuesday');
    test.equal(calendar.julianDayToWeekday(2455957.5), 'Tuesday');
    test.equal(calendar.julianDayToWeekday(2456351.5), 'Thursday');
    test.equal(calendar.julianDayToWeekday(2455985.5), 'Tuesday');
    test.equal(calendar.julianDayToWeekday(2433313.5), 'Wednesday');
    test.done();
  },
  'getAdhimasa'                  : function (test) {
    test.expect(2);
    test.equal(calendar.getAdhimasa(116.77137869307474, 145.3418709668737), '');
    test.equal(calendar.getAdhimasa(120.49240077447713, 148.98071378678225), 'Adhika-');
    test.done();
  },
  'getMasaNum'                   : function (test) {
    test.expect(14);
    test.equal(calendar.getMasaNum(31.3101877453024, 190.002232417937), 1);
    test.equal(calendar.getMasaNum(42.2597957259723, 209.07961889886), 1);
    test.equal(calendar.getMasaNum(59.2349729472294, 183.469749507872), 1);
    test.equal(calendar.getMasaNum(62.5975972349908, 208.58681756282), 2);
    test.equal(calendar.getMasaNum(80.4818781723799, 180.203508055438), 2);
    test.equal(calendar.getMasaNum(121.1497130809087, 208.340416894636), 4);
    test.equal(calendar.getMasaNum(320.8687779979979, 195.735990965544), 10);
    test.equal(calendar.getMasaNum(131.3101877453024, 10.002232417937), 4);
    test.equal(calendar.getMasaNum(242.2597957259723, 9.07961889886), 8);
    test.equal(calendar.getMasaNum(359.2349729472294, 83.469749507872), 11);
    test.equal(calendar.getMasaNum(62.5975972349908, 108.58681756282), 2);
    test.equal(calendar.getMasaNum(280.4818781723799, 180.203508055438), 9);
    test.equal(calendar.getMasaNum(21.1497130809087, 108.340416894636), 0);
    test.equal(calendar.getMasaNum(20.8687779979979, 286.735990965544), 0);
    test.done();
  },
  'getSauraMasaMonthDay'         : function (test) {
    test.expect(29);
    test.equal(calendar.getSauraMasaMonthDay(2299158.5, 0).month, 7);
    test.equal(calendar.getSauraMasaMonthDay(2299159.5, 0).month, 7);
    test.equal(calendar.getSauraMasaMonthDay(2299160.5, 0).month, 7);
    test.equal(calendar.getSauraMasaMonthDay(2299161.5, 0).month, 7);
    test.equal(calendar.getSauraMasaMonthDay(2361220.5, 0).month, 6);
    test.equal(calendar.getSauraMasaMonthDay(2361221.5, 0).month, 6);
    test.equal(calendar.getSauraMasaMonthDay(2361222.5, 0).month, 6);
    test.equal(calendar.getSauraMasaMonthDay(1721457.5, 0).month, 11);
    test.equal(calendar.getSauraMasaMonthDay(2456656.5, 0).month, 9);
    test.equal(calendar.getSauraMasaMonthDay(2456657.5, 0).month, 9);
    test.equal(calendar.getSauraMasaMonthDay(2455957.5, 0).month, 10);
    test.equal(calendar.getSauraMasaMonthDay(2456351.5, 0).month, 11);
    test.equal(calendar.getSauraMasaMonthDay(2455985.5, 0).month, 11);
    test.equal(calendar.getSauraMasaMonthDay(2433313.5, 0).month, 10);
    test.equal(calendar.getSauraMasaMonthDay(2299158.5, 0).day, 6);
    test.equal(calendar.getSauraMasaMonthDay(2299159.5, 0).day, 7);
    test.equal(calendar.getSauraMasaMonthDay(2299160.5, 0).day, 8);
    test.equal(calendar.getSauraMasaMonthDay(2299161.5, 0).day, 9);
    test.equal(calendar.getSauraMasaMonthDay(2361220.5, 0).day, 4);
    test.equal(calendar.getSauraMasaMonthDay(2361221.5, 0).day, 5);
    test.equal(calendar.getSauraMasaMonthDay(2361222.5, 0).day, 6);
    test.equal(calendar.getSauraMasaMonthDay(1721457.5, 0).day, 27);
    test.equal(calendar.getSauraMasaMonthDay(2456656.5, 0).day, 19);
    test.equal(calendar.getSauraMasaMonthDay(2456657.5, 0).day, 20);
    test.equal(calendar.getSauraMasaMonthDay(2455957.5, 0).day, 21);
    test.equal(calendar.getSauraMasaMonthDay(2456351.5, 0).day, 20);
    test.equal(calendar.getSauraMasaMonthDay(2455985.5, 0).day, 19);
    test.equal(calendar.getSauraMasaMonthDay(2433313.5, 0).day, 23);
    test.equal(calendar.getSauraMasaMonthDay(2313.5, 0).day, 31);
    test.done();
  },
  'findSamkranti'                : function (test) {
    test.expect(5);
    test.ok(math.floatingPointEqual(calendar.findSamkranti(1868206, 1868207), 1868206.71761142));
    test.ok(math.floatingPointEqual(calendar.findSamkranti(1868236, 1868237), 1868236.15636098));
    test.ok(math.floatingPointEqual(calendar.findSamkranti(1868266, 1868267), 1868266.00000001));
    test.ok(math.floatingPointEqual(calendar.findSamkranti(1721431, 1721432), 1721431.9425787));
    test.ok(math.floatingPointEqual(calendar.findSamkranti(2299153, 2299154), 2299153.23922039));
    test.done();
  },
  'getMasaName'                  : function (test) {
    test.expect(12);
    test.equal(calendar.getMasaName(0), 'Caitra    ');
    test.equal(calendar.getMasaName(1), 'Vaisakha  ');
    test.equal(calendar.getMasaName(2), 'Jyaistha  ');
    test.equal(calendar.getMasaName(3), 'Asadha    ');
    test.equal(calendar.getMasaName(4), 'Sravana   ');
    test.equal(calendar.getMasaName(5), 'Bhadrapada');
    test.equal(calendar.getMasaName(6), 'Asvina    ');
    test.equal(calendar.getMasaName(7), 'Karttika  ');
    test.equal(calendar.getMasaName(8), 'Margasirsa');
    test.equal(calendar.getMasaName(9), 'Pausa     ');
    test.equal(calendar.getMasaName(10), 'Magha     ');
    test.equal(calendar.getMasaName(11), 'Phalguna  ');
    test.done();
  },
  'getSauraMasaName'             : function (test) {
    test.expect(12);
    test.equal(calendar.getSauraMasaName(0), 'Mesa      ');
    test.equal(calendar.getSauraMasaName(1), 'Vrsa      ');
    test.equal(calendar.getSauraMasaName(2), 'Mithuna   ');
    test.equal(calendar.getSauraMasaName(3), 'Karkata   ');
    test.equal(calendar.getSauraMasaName(4), 'Simha     ');
    test.equal(calendar.getSauraMasaName(5), 'Kanya     ');
    test.equal(calendar.getSauraMasaName(6), 'Tula      ');
    test.equal(calendar.getSauraMasaName(7), 'Vrscika   ');
    test.equal(calendar.getSauraMasaName(8), 'Dhanus    ');
    test.equal(calendar.getSauraMasaName(9), 'Makara    ');
    test.equal(calendar.getSauraMasaName(10), 'Kumbha    ');
    test.equal(calendar.getSauraMasaName(11), 'Mina      ');
    test.done();
  },
  'getMalayalaMasaName'          : function (test) {
    test.expect(12);
    test.equal(calendar.getMalayalaMasaName(0), 'Chingam   ');
    test.equal(calendar.getMalayalaMasaName(1), 'Kanni     ');
    test.equal(calendar.getMalayalaMasaName(2), 'Thulam    ');
    test.equal(calendar.getMalayalaMasaName(3), 'Vrischikam');
    test.equal(calendar.getMalayalaMasaName(4), 'Dhanu     ');
    test.equal(calendar.getMalayalaMasaName(5), 'Makaram   ');
    test.equal(calendar.getMalayalaMasaName(6), 'Kumbham   ');
    test.equal(calendar.getMalayalaMasaName(7), 'Meenam    ');
    test.equal(calendar.getMalayalaMasaName(8), 'Medam     ');
    test.equal(calendar.getMalayalaMasaName(9), 'Idavam    ');
    test.equal(calendar.getMalayalaMasaName(10), 'Mithunam  ');
    test.equal(calendar.getMalayalaMasaName(11), 'Karkitakam');
    test.done();
  },
  'getNaksatraName'              : function (test) {
    test.expect(14);
    test.equal(calendar.getNaksatraName(167.084587116821), 'Hasta');
    test.equal(calendar.getNaksatraName(179.618866280373), 'Citra');
    test.equal(calendar.getNaksatraName(191.953219840454), 'Svati');
    test.equal(calendar.getNaksatraName(204.131519861513), 'Visakha');
    test.equal(calendar.getNaksatraName(349.195739637822), 'Revati');
    test.equal(calendar.getNaksatraName(1.82309136307406), 'Asvini');
    test.equal(calendar.getNaksatraName(14.6945040053245), 'Bharani');
    test.equal(calendar.getNaksatraName(6.55724149356419), 'Asvini');
    test.equal(calendar.getNaksatraName(16.24829446685), 'Bharani');
    test.equal(calendar.getNaksatraName(29.8253740270552), 'Krttika');
    test.equal(calendar.getNaksatraName(156.709071062542), 'U-phalguni');
    test.equal(calendar.getNaksatraName(316.081404838166), 'Satabhisaj');
    test.equal(calendar.getNaksatraName(165.854323537076), 'Hasta');
    test.equal(calendar.getNaksatraName(236.806759936797), 'Jyestha');
    test.done();
  },
  'getMalayalaNaksatraName'      : function (test) {
    test.expect(14);
    test.equal(calendar.getMalayalaNaksatraName(167.084587116821), 'Atham');
    test.equal(calendar.getMalayalaNaksatraName(179.618866280373), 'Chithra');
    test.equal(calendar.getMalayalaNaksatraName(191.953219840454), 'Chothi');
    test.equal(calendar.getMalayalaNaksatraName(204.131519861513), 'Vishakham');
    test.equal(calendar.getMalayalaNaksatraName(349.195739637822), 'Revathi');
    test.equal(calendar.getMalayalaNaksatraName(1.82309136307406), 'Ashwathi');
    test.equal(calendar.getMalayalaNaksatraName(14.6945040053245), 'Bharani');
    test.equal(calendar.getMalayalaNaksatraName(6.55724149356419), 'Ashwathi');
    test.equal(calendar.getMalayalaNaksatraName(16.24829446685), 'Bharani');
    test.equal(calendar.getMalayalaNaksatraName(29.8253740270552), 'Karthika');
    test.equal(calendar.getMalayalaNaksatraName(156.709071062542), 'Uthram');
    test.equal(calendar.getMalayalaNaksatraName(316.081404838166), 'Chathayam');
    test.equal(calendar.getMalayalaNaksatraName(165.854323537076), 'Atham');
    test.equal(calendar.getMalayalaNaksatraName(236.806759936797), 'Thrikketta');
    test.done();
  },
  'aharganaToKali'               : function (test) {
    test.expect(14);
    test.equal(calendar.aharganaToKali(1710693), 4683);
    test.equal(calendar.aharganaToKali(1710694), 4683);
    test.equal(calendar.aharganaToKali(1710695), 4683);
    test.equal(calendar.aharganaToKali(1710696), 4683);
    test.equal(calendar.aharganaToKali(1772755), 4853);
    test.equal(calendar.aharganaToKali(1772756), 4853);
    test.equal(calendar.aharganaToKali(1772757), 4853);
    test.equal(calendar.aharganaToKali(1132992), 3101);
    test.equal(calendar.aharganaToKali(1868191), 5114);
    test.equal(calendar.aharganaToKali(1868192), 5114);
    test.equal(calendar.aharganaToKali(1867492), 5112);
    test.equal(calendar.aharganaToKali(1867886), 5113);
    test.equal(calendar.aharganaToKali(1867520), 5112);
    test.equal(calendar.aharganaToKali(1844848), 5050);
    test.done();
  },
  'kaliToSaka'                   : function (test) {
    test.expect(14);
    test.equal(calendar.kaliToSaka(4683), 1504);
    test.equal(calendar.kaliToSaka(4683), 1504);
    test.equal(calendar.kaliToSaka(4683), 1504);
    test.equal(calendar.kaliToSaka(4683), 1504);
    test.equal(calendar.kaliToSaka(4853), 1674);
    test.equal(calendar.kaliToSaka(4853), 1674);
    test.equal(calendar.kaliToSaka(4853), 1674);
    test.equal(calendar.kaliToSaka(3101), -78);
    test.equal(calendar.kaliToSaka(5114), 1935);
    test.equal(calendar.kaliToSaka(5114), 1935);
    test.equal(calendar.kaliToSaka(5112), 1933);
    test.equal(calendar.kaliToSaka(5113), 1934);
    test.equal(calendar.kaliToSaka(5112), 1933);
    test.equal(calendar.kaliToSaka(5050), 1871);
    test.done();
  }
};
