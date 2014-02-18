/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 * This is the module that gets exported when `require('kollavarsham')` is invoked by any other
 * apps including this as a library. It exposes all the public classes and API in Kollavarsham
 * @module main
 */

'use strict';

module.exports.KollavarshamDate = require('./date').KollavarshamDate;

module.exports.JulianDate = require('./date').JulianDate;

module.exports.Kollavarsham = require('./kollavarsham');
