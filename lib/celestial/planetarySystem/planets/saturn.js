/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Saturn = function () {};

Saturn.prototype = Object.create(new Planet());

Saturn.prototype.constructor = Saturn;

Saturn.prototype.name = 'saturn';

module.exports = Saturn;
