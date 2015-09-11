/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Venus = function () {};

Venus.prototype = Object.create(new Planet());

Venus.prototype.constructor = Venus;

Venus.prototype.name = 'Venus';

module.exports = Venus;
