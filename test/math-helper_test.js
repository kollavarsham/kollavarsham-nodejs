'use strict';

var mathHelper = require('../lib/math-helper.js');

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

exports.kollavarshamHelper = {
  setUp              : function (done) {
    // setup here
    done();
  },
  'isNumber'         : function (test) {
    test.expect(8);
    // tests here
    test.equal(mathHelper.isNumber(0), true);
    test.equal(mathHelper.isNumber(0.1), true);
    test.equal(mathHelper.isNumber(-0.1), true);
    test.equal(mathHelper.isNumber('-0.1'), true);
    test.equal(mathHelper.isNumber('23'), true);
    test.equal(mathHelper.isNumber(23.235927349), true);
    test.equal(mathHelper.isNumber('abchd'), false);
    test.equal(mathHelper.isNumber('A quick brown fox'), false);
    test.done();
  },
  'isInt'            : function (test) {
    test.expect(8);
    // tests here
    test.equal(mathHelper.isInt(0), true);
    test.equal(mathHelper.isInt(0.1), false);
    test.equal(mathHelper.isInt(-0.1), false);
    test.equal(mathHelper.isInt('-42'), true);
    test.equal(mathHelper.isInt('23'), true);
    test.equal(mathHelper.isInt(23.235927349), false);
    test.equal(mathHelper.isInt('abchd'), false);
    test.equal(mathHelper.isInt('A quick brown fox'), false);
    test.done();
  },
  'truncateDecimals' : function (test) {
    test.expect(8);
    // tests here
    test.equal(mathHelper.truncateDecimals(0, 0), 0);
    test.equal(mathHelper.truncateDecimals(0, 2), 0);
    test.equal(mathHelper.truncateDecimals(0.2345, 2), 0.23);
    test.equal(mathHelper.truncateDecimals(0.2385, 2), 0.23);
    test.equal(mathHelper.truncateDecimals(0.23999, 2), 0.23);
    test.equal(mathHelper.truncateDecimals(-456.23999, 2), -456.23);
    test.equal(mathHelper.truncateDecimals(456.999, 0), 456);
    test.equal(mathHelper.truncateDecimals('456.999', 0), 456);
    test.done();
  },
  'truncate'         : function (test) {
    test.expect(8);
    // tests here
    test.equal(mathHelper.truncate(0.2345), 0);
    test.equal(mathHelper.truncate(0.2385), 0);
    test.equal(mathHelper.truncate(0.23999), 0);
    test.equal(mathHelper.truncate(-456.23999), -456);
    test.equal(mathHelper.truncate(456.999), 456);
    test.equal(mathHelper.truncate('456.999'), 456);
    test.equal(mathHelper.truncate('A quick brown fox'), 0);
    test.equal(mathHelper.truncate('-123456.350'), -123456);
    test.done();
  },
  'floor'            : function (test) {
    test.expect(10);
    // tests here
    test.equal(mathHelper.floor(0.2345), 0);
    test.equal(mathHelper.floor(-0.2385), -1);
    test.equal(mathHelper.floor(0.23999), 0);
    test.equal(mathHelper.floor(-456.23999), -457);
    test.equal(mathHelper.floor(456.999), 456);
    test.equal(mathHelper.floor('456.999'), 456);
    test.equal(mathHelper.floor('A quick brown fox'), 0);
    test.equal(mathHelper.floor('-123456.350'), -123457);
    test.equal(mathHelper.floor(42.999), 42);
    test.equal(mathHelper.floor(42.00001), 42);
    test.done();
  }
};
