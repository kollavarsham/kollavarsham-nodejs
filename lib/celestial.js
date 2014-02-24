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
  planetNames                 : {
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
  YugaRotation                : {},
  PlanetRotation              : {},
  PlanetSighra                : {},
  PlanetMeanPosition          : {},
  PlanetTruePosition          : {},
  PlanetApogee                : {},
  PlanetCircumm               : {},
  PlanetCircums               : {},
  zero360                     : function (longitude) {
    var result = longitude - math.truncate(longitude / 360) * 360;
    return result < 0 ? 360 + result : result;
  },
  threeRelation               : function (left, center, right) {
    // var args = Array.prototype.slice.call(arguments);
    // var logLine = '>> ' + args.join('|');
    if (left < center && center < right) {
      // console.log(logLine);
      return 1;
    } else if (right < center && center < left) {
      // console.log(logLine);
      return -1;
    }
    // console.log(logLine + ' <<');
    return 0;
  },
  setPrimaryConstants         : function () {
    // TODO: Add Tests if/when feasible
    this.YugaRotation = extend({}, primaryYugaRotationConstants);
  },
  applyBija                   : function () {
    // TODO: Add Tests if/when feasible
    this.YugaRotation.star = this.YugaRotation.star + 28;
    this.YugaRotation.mercury = this.YugaRotation.mercury + 60;
    this.YugaRotation.venus = this.YugaRotation.venus - 12;
    this.YugaRotation.mars = this.YugaRotation.mars + 8;
    this.YugaRotation.saturn = this.YugaRotation.saturn + 4;
    this.YugaRotation.Candrocca = this.YugaRotation.Candrocca - 16;
    this.YugaRotation.Rahu = this.YugaRotation.Rahu - 12;
  },
  setSecondaryConstants       : function () {
    // TODO: Add Tests if/when feasible
    globals.YugaCivilDays = this.YugaRotation.star - this.YugaRotation.sun;
    globals.YugaSynodicMonth = this.YugaRotation.moon - this.YugaRotation.sun;
    globals.YugaAdhimasa = globals.YugaSynodicMonth - 12 * this.YugaRotation.sun;
    globals.YugaTithi = 30 * globals.YugaSynodicMonth;
    globals.YugaKsayadina = globals.YugaTithi - globals.YugaCivilDays;
  },
  setPlanetaryConstants       : function () {
    // TODO: Add Tests if/when feasible
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
  setAyanamsa                 : function (ahargana) {
    // TODO: Add Tests if/when feasible
    // Good reads:
    // https://en.wikipedia.org/wiki/Ayanamsa
    // http://pidaparthypanchangam.com/?m=201306&paged=2
    var ayanamsa = ( 54 * 4320000 / globals.YugaCivilDays / 3600 ) * ( ahargana - 1314930 );
    globals.ayanadeg = math.truncate(ayanamsa);
    globals.ayanamin = math.truncate(60 * math.fractional(ayanamsa));
  },
  getMeanLongitude            : function (ahargana, rotation) {
    // https://en.wikipedia.org/wiki/Mean_longitude
    // https://en.wikipedia.org/wiki/Ecliptic_coordinate_system#Spherical_coordinates
    return 360 * math.fractional(rotation * ahargana / globals.YugaCivilDays);
  },
  getTrueLongitude            : function (ahargana, meanSolarLongitude, planet) {
    var meanLong1, meanLong2, meanLong3;
    var argument;
    var anomaly1, anomaly2;
    var equation1, equation2, equation3, equation4, equation5;

    // first sighra correction
    if (planet === 'mercury' || planet === 'venus') {
      anomaly1 = this.getMeanLongitude(ahargana, this.PlanetSighra[planet]) - meanSolarLongitude;
    }
    else {
      anomaly1 = this.getMeanLongitude(ahargana, this.PlanetSighra[planet]) - this.PlanetMeanPosition[planet];
    }
    equation1 = this.getSighraEquation(anomaly1, planet);

    // first manda correction
    meanLong1 = this.PlanetMeanPosition[planet] + equation1 / 2;
    argument = meanLong1 - this.PlanetApogee[planet];
    equation2 = this.getMandaEquation(argument, planet);

    // second manda correction
    meanLong2 = meanLong1 - equation2 / 2;
    argument = meanLong2 - this.PlanetApogee[planet];
    equation3 = this.getMandaEquation(argument, planet);

    // second sighra correction
    meanLong3 = this.PlanetMeanPosition[planet] - equation3;
    anomaly2 = this.getMeanLongitude(ahargana, this.PlanetSighra[planet]) - meanLong3;
    equation4 = this.getSighraEquation(anomaly2, planet);

    equation5 = 0;

    // {$ifdef suryasiddhanta}
    // {$else}
    //    if (planet === 'mercury' || planet === 'venus') {
    //        argument = meanSolarLongitude - (77 + 17 / 60);
    //        equation5 = (13.5 / 360 * Math.sin(argument / math.radianInDegrees)) * math.radianInDegrees;
    //    }
    //    if (planet === 'venus') {
    //        equation5 = equation5 - (1 + 7 / 60);
    //    }
    // {$endif}

    return this.zero360(meanLong3 + equation4 + equation5);
  },
  declination                 : function (longitude) {
    // https://en.wikipedia.org/wiki/Declination
    return Math.asin(Math.sin(longitude / math.radianInDegrees) * Math.sin(24 / math.radianInDegrees)) *
        math.radianInDegrees;
  },
  getDaylightEquation         : function (year, latitude, ahargana) {
    // TODO: Add Tests if/when feasible
    // Good read - http://en.wikipedia.org/wiki/Equation_of_time#Calculating_the_equation_of_time
    var meanSolarLongitude = this.getMeanLongitude(ahargana, this.YugaRotation.sun);

    // Sayana Solar Longitude and Declination
    var sayanaMeanSolarLongitude = meanSolarLongitude + (54 / 3600) * (year - 499);
    var sayanaDeclination = this.declination(sayanaMeanSolarLongitude); // See Sewell, p.10

    // Equation of day light by Analemma (https://en.wikipedia.org/wiki/Analemma)
    var x = Math.tan(latitude / math.radianInDegrees) * Math.tan(sayanaDeclination / math.radianInDegrees);

    return 0.5 * Math.asin(x) / Math.PI;
  },
  setSunriseTime              : function (equationOfTime) {
    // TODO: Add Tests if/when feasible
    var sunriseTime = (0.25 - equationOfTime) * 24;
    globals.sriseh = math.truncate(sunriseTime);
    globals.srisem = math.truncate(60 * math.fractional(sunriseTime));
  },
  getMandaEquation            : function (argument, planet) {
    return Math.asin(this.PlanetCircumm[planet] / 360 * Math.sin(argument / math.radianInDegrees)) * math.radianInDegrees;
  },
  getSighraEquation           : function (anomaly, planet) {
    var bhuja, koti, karna;
    bhuja = this.PlanetCircums[planet] / 360 * Math.sin(anomaly / math.radianInDegrees) * math.radianInDegrees;
    koti = this.PlanetCircums[planet] / 360 * Math.cos(anomaly / math.radianInDegrees) * math.radianInDegrees;
    karna = Math.sqrt(math.square(math.radianInDegrees + koti) + math.square(bhuja));

    return Math.asin(bhuja / karna) * math.radianInDegrees;
  },
  getTithi                    : function (tllong, tslong) {
    var elong = tllong - tslong;
    elong = this.zero360(elong);

    return elong / 12;
  },
  setTithiSet                 : function (tithi) {
    // TODO: Add Tests if/when feasible
    globals.tithiDay = math.truncate(tithi) + 1;
    globals.ftithi = math.fractional(tithi);
  },
  setSuklaKrsna               : function () {
    // TODO: Add Tests if/when feasible
    if (15 < globals.tithiDay) {
      globals.tithiDay -= 15;
      globals.paksa = 'Krsnapaksa';
    } else {
      globals.paksa = 'Suklapaksa';
    }
    globals.suklaKrsna = globals.paksa;
  },
  getTrueLunarLongitude       : function (ahar) {
    var meanLunarLongitude = this.getMeanLongitude(ahar, this.YugaRotation.moon);
    var apogee = this.getMeanLongitude(ahar, this.YugaRotation.Candrocca) + 90;
    return this.zero360(meanLunarLongitude - this.getMandaEquation((meanLunarLongitude - apogee), 'moon'));
  },
  getTrueSolarLongitude       : function (ahar) {
    var meanSolarLongitude = this.getMeanLongitude(ahar, this.YugaRotation.sun);
    return this.zero360(meanSolarLongitude - this.getMandaEquation((meanSolarLongitude - this.PlanetApogee.sun), 'sun'));
  },
  getElong                    : function (ahar) {
    var elong = Math.abs(this.getTrueLunarLongitude(ahar) - this.getTrueSolarLongitude(ahar));
    if (180 < elong) {
      elong = 360 - elong;
    }
    return elong;
  },
  findConjunction             : function (leftX, leftY, rightX, rightY) {
    var width = (rightX - leftX) / 2;
    var centreX = (rightX + leftX) / 2;
    if (width < math.epsilon) {
      return this.getElong(centreX);
    } else {
      var centreY = this.getElong(centreX);
      var relation = this.threeRelation(leftY, centreY, rightY);
      if (relation < 0) {
        rightX += width;
        rightY = this.getElong(rightX);
        return this.findConjunction(centreX, centreY, rightX, rightY);
      } else if (0 < relation) {
        leftX -= width;
        leftY = this.getElong(leftX);
        return this.findConjunction(leftX, leftY, centreX, centreY);
      } else {
        leftX += width / 2;
        leftY = this.getElong(leftX);
        rightX -= width / 2;
        rightY = this.getElong(rightX);
        return this.findConjunction(leftX, leftY, rightX, rightY);
      }
    }
  },
  getConjunction              : function (ahar) {
    return this.findConjunction(ahar - 2, this.getElong(ahar - 2), ahar + 2, this.getElong(ahar + 2));
  },
  getLastConjunctionLongitude : function (ahar, tithi) {
    var newNew = globals.YugaCivilDays / (this.YugaRotation.moon - this.YugaRotation.sun);
    ahar -= tithi * (newNew / 30);

    if (Math.abs(ahar - globals.backLastConjunctionAhargana) < 1) {
      return globals.backLastConjunctionLongitude;
    } else if (Math.abs(ahar - globals.backNextConjunctionAhargana) < 1) {
      globals.backLastConjunctionAhargana = globals.backNextConjunctionAhargana;
      globals.backLastConjunctionLongitude = globals.backNextConjunctionLongitude;
      return globals.backNextConjunctionLongitude;
    } else {
      globals.backLastConjunctionAhargana = ahar;
      globals.backLastConjunctionLongitude = this.getConjunction(ahar);
      return globals.backLastConjunctionLongitude;
    }
  },
  getNextConjunctionLongitude : function (ahar, tithi) {
    var newNew = globals.YugaCivilDays / (this.YugaRotation.moon - this.YugaRotation.sun);
    ahar += (30 - tithi) * (newNew / 30);

    if (Math.abs(ahar - globals.backNextConjunctionAhargana) < 1) {
      return globals.backNextConjunctionLongitude;
    } else {
      globals.backNextConjunctionAhargana = ahar;
      globals.backNextConjunctionLongitude = this.getConjunction(ahar);
      return globals.backNextConjunctionLongitude;
    }
  }
};

module.exports = celestial;