/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var extend = require('node.extend');

var globals = require('./globals');
var math = require('./math');

var primaryYugaRotationConstants = {
  'star'      : 1582237800,
  'sun'       : 4320000,
  'moon'      : 57753336,
  'mercury'   : 17937000,
  'venus'     : 7022388,
  'mars'      : 2296824,
  'jupiter'   : 364220,
  'saturn'    : 146564,
  'Candrocca' : 488219,
  'Rahu'      : -232226
};

var celestial = {
  planetNames           : {
    'star'      : 'Star        ',
    'sun'       : 'Sun         ',
    'moon'      : 'Moon        ',
    'mercury'   : 'Mercury     ',
    'venus'     : 'Venus       ',
    'mars'      : 'Mars        ',
    'jupiter'   : 'Jupiter     ',
    'saturn'    : 'Saturn      ',
    'Candrocca' : 'Candrocca   ',
    'Rahu'      : 'Rahu        '
  },
  YugaRotation          : {},
  PlanetRotation        : {},
  PlanetSighra          : {},
  PlanetMeanPosition    : {},
  PlanetTruePosition    : {},
  PlanetApogee          : {},
  PlanetCircumm         : {},
  PlanetCircums         : {},
  zero360               : function (longitude) {
    var result = longitude - math.truncate(longitude / 360) * 360;
    return result < 0 ? 360 + result : result;
  },
  threeRelation         : function (left, center, right) {
    if (left < center && center < right) {
      return 1;
    } else if (right < center && center < left) {
      return -1;
    }
    return 0;
  },
  setPrimaryConstants   : function () {
    // TODO: Add Tests if feasible
    this.YugaRotation = extend({}, primaryYugaRotationConstants);
  },
  applyBija             : function () {
    // TODO: Add Tests if feasible
    this.YugaRotation.star = this.YugaRotation.star + 28;
    this.YugaRotation.sun = this.YugaRotation.sun;  // reduntant line - kept for consistency
    this.YugaRotation.moon = this.YugaRotation.moon;  // reduntant line - kept for consistency
    this.YugaRotation.mercury = this.YugaRotation.mercury + 60;
    this.YugaRotation.venus = this.YugaRotation.venus - 12;
    this.YugaRotation.mars = this.YugaRotation.mars + 8;
    this.YugaRotation.jupiter = this.YugaRotation.jupiter;  // reduntant line - kept for consistency
    this.YugaRotation.saturn = this.YugaRotation.saturn + 4;
    this.YugaRotation.Candrocca = this.YugaRotation.Candrocca - 16;
    this.YugaRotation.Rahu = this.YugaRotation.Rahu - 12;
  },
  setSecondaryConstants : function () {
    // TODO: Add Tests if feasible
    globals.YugaCivilDays = this.YugaRotation.star - this.YugaRotation.sun;
    globals.YugaSynodicMonth = this.YugaRotation.moon - this.YugaRotation.sun;
    globals.YugaAdhimasa = globals.YugaSynodicMonth - 12 * this.YugaRotation.sun;
    globals.YugaTithi = 30 * globals.YugaSynodicMonth;
    globals.YugaKsayadina = globals.YugaTithi - globals.YugaCivilDays;
  },
  setPlanetaryConstants : function () {
    // TODO: Add Tests if feasible
    // star
    this.PlanetRotation.star = 0;
    this.PlanetSighra.star = 0;
    this.PlanetApogee.star = 0;
    this.PlanetCircumm.star = 0;
    this.PlanetCircums.star = 0;

    // sun
    this.PlanetRotation.sun = this.YugaRotation.sun;
    this.PlanetSighra.sun = this.YugaRotation.sun;
    this.PlanetApogee.sun = 77 + 17 / 60;
    this.PlanetCircumm.sun = 13 + 50 / 60;
    this.PlanetCircums.sun = 0;

    // moon
    this.PlanetRotation.moon = this.YugaRotation.moon;
    this.PlanetSighra.moon = 0;
    this.PlanetApogee.moon = 0;
    this.PlanetCircumm.moon = 31 + 50 / 60;
    this.PlanetCircums.moon = 0;

    // mercury
    this.PlanetRotation.mercury = this.YugaRotation.sun;
    this.PlanetSighra.mercury = this.YugaRotation.mercury;
    this.PlanetApogee.mercury = 220 + 27 / 60;
    this.PlanetCircumm.mercury = 29;
    this.PlanetCircums.mercury = 131.5;

    // venus
    this.PlanetRotation.venus = this.YugaRotation.sun;
    this.PlanetSighra.venus = this.YugaRotation.venus;
    this.PlanetApogee.venus = 79 + 50 / 60;
    this.PlanetCircumm.venus = 11.5;
    this.PlanetCircums.venus = 261;

    // mars
    this.PlanetRotation.mars = this.YugaRotation.mars;
    this.PlanetSighra.mars = this.YugaRotation.sun;
    this.PlanetApogee.mars = 130 + 2 / 60;
    this.PlanetCircumm.mars = 73.5;
    this.PlanetCircums.mars = 233.5;

    // jupiter
    this.PlanetRotation.jupiter = this.YugaRotation.jupiter;
    this.PlanetSighra.jupiter = this.YugaRotation.sun;
    this.PlanetApogee.jupiter = 171 + 18 / 60;
    this.PlanetCircumm.jupiter = 32.5;
    this.PlanetCircums.jupiter = 71;

    // saturn
    this.PlanetRotation.saturn = this.YugaRotation.saturn;
    this.PlanetSighra.saturn = this.YugaRotation.sun;
    this.PlanetApogee.saturn = 236 + 37 / 60;
    this.PlanetCircumm.saturn = 48.5;
    this.PlanetCircums.saturn = 39.5;

    // Candrocca
    this.PlanetRotation.Candrocca = this.YugaRotation.Candrocca;
    this.PlanetSighra.Candrocca = 0;
    this.PlanetApogee.Candrocca = 0;
    this.PlanetCircumm.Candrocca = 0;
    this.PlanetCircums.Candrocca = 0;

    // Rahu
    this.PlanetRotation.Rahu = this.YugaRotation.Rahu;
    this.PlanetSighra.Rahu = 0;
    this.PlanetApogee.Rahu = 0;
    this.PlanetCircumm.Rahu = 0;
    this.PlanetCircums.Rahu = 0;
  },
  setAyanamsa           : function (ahargana) {
    // TODO: Add Tests if feasible
    // Good reads:
    // https://en.wikipedia.org/wiki/Ayanamsa
    // http://pidaparthypanchangam.com/?m=201306&paged=2
    var ayanamsa = ( 54 * 4320000 / globals.YugaCivilDays / 3600 ) * ( ahargana - 1314930 );
    globals.ayanadeg = math.truncate(ayanamsa);
    globals.ayanamin = 60 * math.fractional(ayanamsa);
  },
  getMeanLongitude      : function (ahargana, rotation) {
    return 360 * math.fractional(rotation * ahargana / globals.YugaCivilDays);
  },
  declination           : function (longitude) {
    // https://en.wikipedia.org/wiki/Declination
    return Math.asin(Math.sin(longitude / math.radianInDegrees) * Math.sin(24 / math.radianInDegrees)) *
        math.radianInDegrees;
  },
  getDaylightEquation   : function (year, latitude) {
    var meanSolarLongitude = this.getMeanLongitude(globals.ahar, this.YugaRotation.sun);

    // Sayana Solar Longitude and Declination
    var sayanaMeanSolarLongitude = meanSolarLongitude + (54 / 3600) * (globals.year - 499);
    var sayanaDeclination = this.declination(sayanaMeanSolarLongitude); // See Sewell, p.10

    // Equation of day light by Analemma (https://en.wikipedia.org/wiki/Analemma)
    var x = Math.tan(latitude / math.radianInDegrees) * Math.tan(sayanaDeclination / math.radianInDegrees);

    return 0.5 * Math.asin(x) / Math.PI;
  },
  setSunriseTime        : function (eqTime) {
    var sunriseTime = (0.25 - eqTime) * 24;
    globals.sriseh = math.truncate(sunriseTime);
    globals.srisem = math.truncate(60 * math.fractional(sunriseTime));
  },
  getMandaEquation      : function (argument, planet) {
    return Math.asin(this.PlanetCircumm[planet] / 360 * Math.sin(argument / math.radianInDegrees)) * math.radianInDegrees;
  }
};

module.exports = celestial;