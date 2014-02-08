/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var celestial = require('../lib/celestial.js');

exports.celestial = {
  setUp           : function (done) {
    done();
  },
  'zero360' : function (test) {
    test.expect(5);
    test.equal(celestial.zero360(75.2), 75.2);
    test.equal(celestial.zero360(-75.2), 284.8);
    test.equal(celestial.zero360(370), 10);
    test.equal(celestial.zero360(0), 0);
    test.equal(celestial.zero360(0.234), 0.234);
    test.done();
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
