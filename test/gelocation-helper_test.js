'use strict';

var geolocationHelper = require('../lib/geolocation-helper.js');

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

exports.geolocationHelper = {
  setUp: function(done) {
    // setup here
    done();
  },
  'zero360': function(test){
    test.expect(5);
    test.equal(geolocationHelper.zero360(75.2), 75.2);
    test.equal(geolocationHelper.zero360(-75.2), 284.8);
    test.equal(geolocationHelper.zero360(370), 10);
    test.equal(geolocationHelper.zero360(0), 0);
    test.equal(geolocationHelper.zero360(0.234), 0.234);
    test.done();
  }
};
