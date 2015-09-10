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

var KollavarshamDate = require('../lib/date').KollavarshamDate;

exports.kollavarshamDate = {
  setUp : function (done) {
    // setup here
    done();
  },
  'empty constructor' : function (test) {
    var date = new KollavarshamDate();
    test.expect(4);
    test.equal(date.day, 1);
    test.equal(date.month, 1);
    test.equal(date.year, 1);
    test.equal(date.toString(), '0001 01 01');
    test.done();
  }
};
