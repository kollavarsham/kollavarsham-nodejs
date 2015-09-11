/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Sun = function () {};

Sun.prototype = Object.create(new Planet());

Sun.prototype.constructor = Sun;

Sun.prototype.name = 'sun';

module.exports = Sun;
