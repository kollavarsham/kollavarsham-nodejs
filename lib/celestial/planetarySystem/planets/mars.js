/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Mars = function () {};

Mars.prototype = Object.create(new Planet());

Mars.prototype.constructor = Mars;

Mars.prototype.name = 'mars';

module.exports = Mars;
