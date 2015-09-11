/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Star = function () {};

Star.prototype = Object.create(new Planet());

Star.prototype.constructor = Star;

Star.prototype.name = 'star';

module.exports = Star;
