/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var JulianDate = require('../lib/date.js').JulianDate;

var julianDate = new JulianDate(2013, 12, 31); // Not perhaps a valid Julian Date

exports.geolocation = {
  setUp         : function (done) {
    // setup here
    done();
  },
  'constructor' : function (test) {
    test.expect(3);
    test.equal(julianDate.year, 2013);
    test.equal(julianDate.month, 12);
    test.equal(julianDate.day, 31);
    test.done();
  },
  'toString'    : function (test) {
    test.expect(2);
    test.equal(julianDate.toString(), '2013 12 31');
    test.equal(new JulianDate(1, 1, 1).toString(), '0001 01 01');
    test.done();
  }
};
