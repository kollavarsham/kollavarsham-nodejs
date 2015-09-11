/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Rahu = function () {};

Rahu.prototype = Object.create(new Planet());

Rahu.prototype.constructor = Rahu;

Rahu.prototype.name = 'Rahu';

module.exports = Rahu;
