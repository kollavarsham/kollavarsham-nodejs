/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var Planet = function () {
};

Planet.prototype.name = null;

Planet.prototype.YugaRotation = 0;  // sidereal rotations

Planet.prototype.Rotation = 0;

Planet.prototype.Sighra = 0;

Planet.prototype.MeanPosition = 0;

Planet.prototype.TruePosition = 0;

Planet.prototype.Apogee = 0;

Planet.prototype.MandaCircumference = 0;

Planet.prototype.SighraCircumference = 0;

module.exports = Planet;
