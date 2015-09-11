/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Mercury = function () {};

Mercury.prototype = Object.create(new Planet());

Mercury.prototype.constructor = Mercury;

Mercury.prototype.name = 'mercury';

module.exports = Mercury;
