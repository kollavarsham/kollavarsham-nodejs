/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Moon = function () {};

Moon.prototype = Object.create(new Planet());

Moon.prototype.constructor = Moon;

Moon.prototype.name = 'moon';

module.exports = Moon;
