'use strict';

var geolocation = require('../lib/geolocation.js');

exports.geolocation = {
  setUp     : function (done) {
    // setup here
    done();
  },
  'zero360' : function (test) {
    test.expect(5);
    test.equal(geolocation.zero360(75.2), 75.2);
    test.equal(geolocation.zero360(-75.2), 284.8);
    test.equal(geolocation.zero360(370), 10);
    test.equal(geolocation.zero360(0), 0);
    test.equal(geolocation.zero360(0.234), 0.234);
    test.done();
  }
};
