/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var calculations = require('../lib/calculations');

exports.calculations = {
  'toGregorian' : function (test) {
    test.throws(function () {
      calculations.toGregorian({});
    }, Error, 'Not implemented');
    test.done();
  }
};
