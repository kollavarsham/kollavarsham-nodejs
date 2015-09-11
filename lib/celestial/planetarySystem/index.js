/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

var Star = require('./planets/star');
var Sun = require('./planets/sun');
var Moon = require('./planets/moon');
var Mercury = require('./planets/mercury');
var Venus = require('./planets/venus');
var Mars = require('./planets/mars');
var Jupiter = require('./planets/jupiter');
var Saturn = require('./planets/saturn');
var Candrocca = require('./planets/candrocca');
var Rahu = require('./planets/rahu');

var Yuga = require('./yuga');

var star = new Star();
var sun = new Sun();
var moon = new Moon();
var mercury = new Mercury();
var venus = new Venus();
var mars = new Mars();
var jupiter = new Jupiter();
var saturn = new Saturn();
var candrocca = new Candrocca();     // Moon Apogee
var rahu = new Rahu();               // Moon Node

var PlanetarySystem = function (system) {
  this.system = system === 'InPancasiddhantika' ? system : 'SuryaSiddhanta';

  this.initializeYugaRotations();

  this.initializeYuga();

  this.initializePlanetaryConstants();
};

PlanetarySystem.prototype.star = star;
PlanetarySystem.prototype.sun = sun;
PlanetarySystem.prototype.moon = moon;
PlanetarySystem.prototype.mercury = mercury;
PlanetarySystem.prototype.venus = venus;
PlanetarySystem.prototype.mars = mars;
PlanetarySystem.prototype.jupiter = jupiter;
PlanetarySystem.prototype.saturn = saturn;
PlanetarySystem.prototype.candrocca = candrocca;
PlanetarySystem.prototype.rahu = rahu;

PlanetarySystem.prototype.yuga = new Yuga();

PlanetarySystem.prototype.system = 'SuryaSiddhanta';

var planetsList = [star, sun, moon, mercury, venus, mars, jupiter, saturn, candrocca, rahu];

PlanetarySystem.prototype.planets = _.indexBy(planetsList, 'name');

PlanetarySystem.prototype.initializeYugaRotations = function () {
  // common values across the systems
  this.sun.YugaRotation = 4320000;
  this.moon.YugaRotation = 57753336;
  this.jupiter.YugaRotation = 364220;

  var isSuryaSiddhantaSystem = this.system === 'SuryaSiddhanta';

  // # Saura, HIL, p.15 && # Latadeva/Ardharatrika, HIL, p.15
  this.star.YugaRotation = isSuryaSiddhantaSystem ? 1582237800 : 1582237828;
  this.mercury.YugaRotation = isSuryaSiddhantaSystem ? 17937000 : 17937060;
  this.venus.YugaRotation = isSuryaSiddhantaSystem ? 7022388 : 7022376;
  this.mars.YugaRotation = isSuryaSiddhantaSystem ? 2296824 : 2296832;
  this.saturn.YugaRotation = isSuryaSiddhantaSystem ? 146564 : 146568;
  this.candrocca.YugaRotation = isSuryaSiddhantaSystem ? 488219 : 488203;
  this.rahu.YugaRotation = isSuryaSiddhantaSystem ? -232226 : -232238;

};

PlanetarySystem.prototype.initializeYuga = function () {
  this.yuga.CivilDays = this.star.YugaRotation - this.sun.YugaRotation;
  this.yuga.SynodicMonth = this.moon.YugaRotation - this.sun.YugaRotation;

  this.yuga.Adhimasa = this.yuga.SynodicMonth - 12 * this.sun.YugaRotation;

  this.yuga.Tithi = 30 * this.yuga.SynodicMonth;
  this.yuga.Ksayadina = this.yuga.Tithi - this.yuga.CivilDays;
};

PlanetarySystem.prototype.initializePlanetaryConstants = function () {
  // star
  this.star.Rotation = 0;
  this.star.Sighra = 0;
  this.star.Apogee = 0;
  this.star.MandaCircumference = 0;
  this.star.SighraCircumference = 0;

  // sun
  this.sun.Rotation = this.sun.YugaRotation;
  this.sun.Sighra = this.sun.YugaRotation;
  this.sun.Apogee = 77 + 17 / 60;
  this.sun.MandaCircumference = 13 + 50 / 60;
  this.sun.SighraCircumference = 0;

  // moon
  this.moon.Rotation = this.moon.YugaRotation;
  this.moon.Sighra = 0;
  this.moon.Apogee = 0;
  this.moon.MandaCircumference = 31 + 50 / 60;
  this.moon.SighraCircumference = 0;

  // mercury
  this.mercury.Rotation = this.sun.YugaRotation;
  this.mercury.Sighra = this.mercury.YugaRotation;
  this.mercury.Apogee = 220 + 27 / 60;
  this.mercury.MandaCircumference = 29;
  this.mercury.SighraCircumference = 131.5;

  // venus
  this.venus.Rotation = this.sun.YugaRotation;
  this.venus.Sighra = this.venus.YugaRotation;
  this.venus.Apogee = 79 + 50 / 60;
  this.venus.MandaCircumference = 11.5;
  this.venus.SighraCircumference = 261;

  // mars
  this.mars.Rotation = this.mars.YugaRotation;
  this.mars.Sighra = this.sun.YugaRotation;
  this.mars.Apogee = 130 + 2 / 60;
  this.mars.MandaCircumference = 73.5;
  this.mars.SighraCircumference = 233.5;

  // jupiter
  this.jupiter.Rotation = this.jupiter.YugaRotation;
  this.jupiter.Sighra = this.sun.YugaRotation;
  this.jupiter.Apogee = 171 + 18 / 60;
  this.jupiter.MandaCircumference = 32.5;
  this.jupiter.SighraCircumference = 71;

  // saturn
  this.saturn.Rotation = this.saturn.YugaRotation;
  this.saturn.Sighra = this.sun.YugaRotation;
  this.saturn.Apogee = 236 + 37 / 60;
  this.saturn.MandaCircumference = 48.5;
  this.saturn.SighraCircumference = 39.5;

  // Candrocca
  this.candrocca.Rotation = this.candrocca.YugaRotation;
  this.candrocca.Sighra = 0;
  this.candrocca.Apogee = 0;
  this.candrocca.MandaCircumference = 0;
  this.candrocca.SighraCircumference = 0;

  // Rahu
  this.rahu.Rotation = this.rahu.YugaRotation;
  this.rahu.Sighra = 0;
  this.rahu.Apogee = 0;
  this.rahu.MandaCircumference = 0;
  this.rahu.SighraCircumference = 0;
};

module.exports = PlanetarySystem;
