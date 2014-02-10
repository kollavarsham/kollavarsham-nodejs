/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var math = require('../lib/math.js');

exports.math = {
  setUp              : function (done) {
    done();
  },
  'isNumber'         : function (test) {
    test.expect(8);
    test.equal(math.isNumber(0), true);
    test.equal(math.isNumber(0.1), true);
    test.equal(math.isNumber(-0.1), true);
    test.equal(math.isNumber('-0.1'), true);
    test.equal(math.isNumber('23'), true);
    test.equal(math.isNumber(23.235927349), true);
    test.equal(math.isNumber('abchd'), false);
    test.equal(math.isNumber('A quick brown fox'), false);
    test.done();
  },
  'isInt'            : function (test) {
    test.expect(8);
    test.equal(math.isInt(0), true);
    test.equal(math.isInt(0.1), false);
    test.equal(math.isInt(-0.1), false);
    test.equal(math.isInt('-42'), true);
    test.equal(math.isInt('23'), true);
    test.equal(math.isInt(23.235927349), false);
    test.equal(math.isInt('abchd'), false);
    test.equal(math.isInt('A quick brown fox'), false);
    test.done();
  },
  'truncateDecimals' : function (test) {
    test.expect(8);
    test.equal(math.truncateDecimals(0, 0), 0);
    test.equal(math.truncateDecimals(0, 2), 0);
    test.equal(math.truncateDecimals(0.2345, 2), 0.23);
    test.equal(math.truncateDecimals(0.2385, 2), 0.23);
    test.equal(math.truncateDecimals(0.23999, 2), 0.23);
    test.equal(math.truncateDecimals(-456.23999, 2), -456.23);
    test.equal(math.truncateDecimals(456.999, 0), 456);
    test.equal(math.truncateDecimals('456.999', 0), 456);
    test.done();
  },
  'truncate'         : function (test) {
    test.expect(9);
    test.equal(math.truncate(0.2345), 0);
    test.equal(math.truncate(0.2385), 0);
    test.equal(math.truncate(0.23999), 0);
    test.equal(math.truncate(-456.23999), -456);
    test.equal(math.truncate(456.999), 456);
    test.equal(math.truncate('456.999'), 456);
    test.equal(math.truncate('A quick brown fox'), 0);
    test.equal(math.truncate('-123456.350'), -123456);
    test.equal(math.truncate('-123456'), -123456);
    test.done();
  },
  'floor'            : function (test) {
    test.expect(10);
    test.equal(math.floor(0.2345), 0);
    test.equal(math.floor(-0.2385), -1);
    test.equal(math.floor(0.23999), 0);
    test.equal(math.floor(-456.23999), -457);
    test.equal(math.floor(456.999), 456);
    test.equal(math.floor('456.999'), 456);
    test.equal(math.floor('A quick brown fox'), 0);
    test.equal(math.floor('-123456.350'), -123457);
    test.equal(math.floor(42.999), 42);
    test.equal(math.floor(42.00001), 42);
    test.done();
  },
  'fractional'       : function (test) {
    test.expect(10);
    test.ok(math.floatingPointEqual(math.fractional(0.2345), 0.2345));
    test.ok(math.floatingPointEqual(math.fractional(-0.2385), -0.2385));
    test.ok(math.floatingPointEqual(math.fractional(0.23999), 0.23999));
    test.ok(math.floatingPointEqual(math.fractional(-456.23999), -0.23999));
    test.ok(math.floatingPointEqual(math.fractional(456.999), 0.999));
    test.ok(math.floatingPointEqual(math.fractional('456.999'), 0.999));
    test.ok(math.floatingPointEqual(math.fractional('A quick brown fox'), 0));
    test.ok(math.floatingPointEqual(math.fractional('-123456.350'), -0.350));
    test.ok(math.floatingPointEqual(math.fractional(42.999), 0.999));
    test.ok(math.floatingPointEqual(math.fractional(42.00001), 0.00001));
    test.done();
  },
  'round'            : function (test) {
    test.expect(11);
    test.equal(math.round(0.2345), 0);
    test.equal(math.round(-0.2385), 0);
    test.equal(math.round(0.23999), 0);
    test.equal(math.round(-456.23999), -456);
    test.equal(math.round(456.999), 457);
    test.equal(math.round('456.999'), 457);
    test.equal(math.round('A quick brown fox'), 0);
    test.equal(math.round('-123456.350'), -123456);
    test.equal(math.round(42.999), 43);
    test.equal(math.round(-42.999), -43);
    test.equal(math.round(42.00001), 42);
    test.done();
  },
  'square'           : function (test) {
    test.expect(11);
    test.ok(math.floatingPointEqual(math.square(0.2345), 0.05499025));
    test.ok(math.floatingPointEqual(math.square(-0.2385), 0.05688225));
    test.ok(math.floatingPointEqual(math.square(0.23999), 0.0575952001));
    test.ok(math.floatingPointEqual(math.square(-456.23999), 208154.9284752001));
    test.ok(math.floatingPointEqual(math.square(456.999), 208848.086001));
    test.ok(math.floatingPointEqual(math.square('456.999'), 208848.086001));
    test.ok(math.floatingPointEqual(math.square('A quick brown fox'), 0));
    test.ok(math.floatingPointEqual(math.square(42.999), 1848.914001));
    test.ok(math.floatingPointEqual(math.square(42.00001), 1764.0008400001));
    test.ok(math.floatingPointEqual(math.square(5), 25));
    test.ok(math.floatingPointEqual(math.square(9), 81));
    test.done();
  }
};
