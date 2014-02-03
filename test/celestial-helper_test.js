'use strict';

var celestialHelper = require('../lib/celestial-helper.js');

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
  setUp           : function (done) {
    // setup here
    done();
  },
  'threeRelation' : function (test) {
    test.expect(4);
    test.equal(celestialHelper.threeRelation(-1, 1, 3), 1);
    test.equal(celestialHelper.threeRelation(1, -1, -3), -1);
    test.equal(celestialHelper.threeRelation(1, 1, 1), 0);
    test.equal(celestialHelper.threeRelation(1, 5, -3), 0); //invalid scenario
    test.done();
  }
};
