'use strict';

var celestial = require('../lib/celestial.js');

exports.celestial = {
  setUp           : function (done) {
    done();
  },
  'threeRelation' : function (test) {
    test.expect(4);
    test.equal(celestial.threeRelation(-1, 1, 3), 1);
    test.equal(celestial.threeRelation(1, -1, -3), -1);
    test.equal(celestial.threeRelation(1, 1, 1), 0);
    test.equal(celestial.threeRelation(1, 5, -3), 0); //invalid scenario
    test.done();
  }
};
