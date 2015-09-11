/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Jupiter = function () {};

Jupiter.prototype = Object.create(new Planet());

Jupiter.prototype.constructor = Jupiter;

Jupiter.prototype.name = 'jupiter';

module.exports = Jupiter;
