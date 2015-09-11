/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = require('./planet');

var Candrocca = function () {};

Candrocca.prototype = Object.create(new Planet());

Candrocca.prototype.constructor = Candrocca;

Candrocca.prototype.name = 'candrocca';

module.exports = Candrocca;
