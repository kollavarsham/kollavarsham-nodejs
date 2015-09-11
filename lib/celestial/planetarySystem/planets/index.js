/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

// Planet (Base)

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

// Star

var Star = function () {
};
Star.prototype = Object.create(new Planet());
Star.prototype.constructor = Star;
Star.prototype.name = 'star';

// Sun

var Sun = function () {
};
Sun.prototype = Object.create(new Planet());
Sun.prototype.constructor = Sun;
Sun.prototype.name = 'sun';

// Moon

var Moon = function () {
};
Moon.prototype = Object.create(new Planet());
Moon.prototype.constructor = Moon;
Moon.prototype.name = 'moon';

// Mercury

var Mercury = function () {
};
Mercury.prototype = Object.create(new Planet());
Mercury.prototype.constructor = Mercury;
Mercury.prototype.name = 'mercury';

// Venus

var Venus = function () {
};
Venus.prototype = Object.create(new Planet());
Venus.prototype.constructor = Venus;
Venus.prototype.name = 'venus';

// Mars

var Mars = function () {
};
Mars.prototype = Object.create(new Planet());
Mars.prototype.constructor = Mars;
Mars.prototype.name = 'mars';

// Jupiter

var Jupiter = function () {
};
Jupiter.prototype = Object.create(new Planet());
Jupiter.prototype.constructor = Jupiter;
Jupiter.prototype.name = 'jupiter';

// Saturn

var Saturn = function () {
};
Saturn.prototype = Object.create(new Planet());
Saturn.prototype.constructor = Saturn;
Saturn.prototype.name = 'saturn';

// Candrocca

var Candrocca = function () {
};
Candrocca.prototype = Object.create(new Planet());
Candrocca.prototype.constructor = Candrocca;
Candrocca.prototype.name = 'candrocca';

// Rahu

var Rahu = function () {
};
Rahu.prototype = Object.create(new Planet());
Rahu.prototype.constructor = Rahu;
Rahu.prototype.name = 'rahu';

module.exports = {
  Planet    : Planet,
  Star      : Star,
  Sun       : Sun,
  Moon      : Moon,
  Mercury   : Mercury,
  Venus     : Venus,
  Mars      : Mars,
  Jupiter   : Jupiter,
  Saturn    : Saturn,
  Candrocca : Candrocca,
  Rahu      : Rahu
};
