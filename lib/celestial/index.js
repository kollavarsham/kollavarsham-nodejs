/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014-2015 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var math = require('../math');
var PlanetarySystem = require('./planetarySystem');

var celestial = {
  planetarySystem              : null,
  backLastConjunctionAhargana  : -1,
  backNextConjunctionAhargana  : -1,
  backLastConjunctionLongitude : -1,
  backNextConjunctionLongitude : -1,
  ayanadeg                     : true,
  ayanamin                     : true,
  threeRelation                : function (left, center, right) {
    if (left < center && center < right) {
      return 1;
    } else if (right < center && center < left) {
      return -1;
    }
    return 0;
  },
  setPrimaryConstants          : function (settings) {
    this.planetarySystem = new PlanetarySystem(settings.system);
  },
  setAyanamsa                  : function (ahargana) {
    // TODO: Add Tests if/when feasible
    // Good reads:
    // https://en.wikipedia.org/wiki/Ayanamsa
    // http://pidaparthypanchangam.com/?m=201306&paged=2
    var ayanamsa = ( 54 * 4320000 / this.planetarySystem.yuga.CivilDays / 3600 ) * ( ahargana - 1314930 );
    this.ayanadeg = math.truncate(ayanamsa);
    this.ayanamin = math.truncate(60 * math.fractional(ayanamsa));
  },
  getMeanLongitude             : function (ahargana, rotation) {
    // https://en.wikipedia.org/wiki/Mean_longitude
    // https://en.wikipedia.org/wiki/Ecliptic_coordinate_system#Spherical_coordinates
    return 360 * math.fractional(rotation * ahargana / this.planetarySystem.yuga.CivilDays);
  },
  getTrueLongitude             : function (ahargana, meanSolarLongitude, planet) {
    var meanLong1, meanLong2, meanLong3;
    var argument;
    var anomaly1, anomaly2;
    var equation1, equation2, equation3, equation4, equation5;

    // first sighra correction
    if (planet === 'mercury' || planet === 'venus') {
      anomaly1 = this.getMeanLongitude(ahargana, this.planetarySystem[planet].Sighra) - meanSolarLongitude;
    }
    else {
      anomaly1 = this.getMeanLongitude(ahargana, this.planetarySystem[planet].Sighra) - this.planetarySystem[planet].MeanPosition;
    }
    equation1 = this.getSighraEquation(anomaly1, planet);

    // first manda correction
    meanLong1 = this.planetarySystem[planet].MeanPosition + equation1 / 2;
    argument = meanLong1 - this.planetarySystem[planet].Apogee;
    equation2 = this.getMandaEquation(argument, planet);

    // second manda correction
    meanLong2 = meanLong1 - equation2 / 2;
    argument = meanLong2 - this.planetarySystem[planet].Apogee;
    equation3 = this.getMandaEquation(argument, planet);

    // second sighra correction
    meanLong3 = this.planetarySystem[planet].MeanPosition - equation3;
    anomaly2 = this.getMeanLongitude(ahargana, this.planetarySystem[planet].Sighra) - meanLong3;
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

    return math.zero360(meanLong3 + equation4 + equation5);
  },
  declination                  : function (longitude) {
    // https://en.wikipedia.org/wiki/Declination
    return Math.asin(Math.sin(longitude / math.radianInDegrees) * Math.sin(24 / math.radianInDegrees)) *
      math.radianInDegrees;
  },
  getDaylightEquation          : function (year, latitude, ahargana) {
    // TODO: Add Tests if/when feasible
    // Good read - http://en.wikipedia.org/wiki/Equation_of_time#Calculating_the_equation_of_time
    var meanSolarLongitude = this.getMeanLongitude(ahargana, this.planetarySystem.sun.YugaRotation);

    // Sayana Solar Longitude and Declination
    var sayanaMeanSolarLongitude = meanSolarLongitude + (54 / 3600) * (year - 499);
    var sayanaDeclination = this.declination(sayanaMeanSolarLongitude); // See Sewell, p.10

    // Equation of day light by Analemma (https://en.wikipedia.org/wiki/Analemma)
    var x = Math.tan(latitude / math.radianInDegrees) * Math.tan(sayanaDeclination / math.radianInDegrees);

    return 0.5 * Math.asin(x) / Math.PI;
  },
  getSunriseTime               : function (equationOfTime) {
    // TODO: Add Tests if/when feasible
    var sunriseTime = (0.25 - equationOfTime) * 24;
    var hour = math.truncate(sunriseTime);
    var minute = math.truncate(60 * math.fractional(sunriseTime));
    return {
      hour   : hour,
      minute : minute
    };
  },
  getMandaEquation             : function (argument, planet) {
    return Math.asin(this.planetarySystem[planet].MandaCircumference / 360 * Math.sin(argument / math.radianInDegrees)) * math.radianInDegrees;
  },
  getSighraEquation            : function (anomaly, planet) {
    var bhuja, koti, karna;
    bhuja = this.planetarySystem[planet].SighraCircumference / 360 * Math.sin(anomaly / math.radianInDegrees) * math.radianInDegrees;
    koti = this.planetarySystem[planet].SighraCircumference / 360 * Math.cos(anomaly / math.radianInDegrees) * math.radianInDegrees;
    karna = Math.sqrt(math.square(math.radianInDegrees + koti) + math.square(bhuja));

    return Math.asin(bhuja / karna) * math.radianInDegrees;
  },
  getTithi                     : function (tllong, tslong) {
    var elong = tllong - tslong;
    elong = math.zero360(elong);

    return elong / 12;
  },
  getTrueLunarLongitude        : function (ahargana) {
    var meanLunarLongitude = this.getMeanLongitude(ahargana, this.planetarySystem.moon.YugaRotation);
    var apogee = this.getMeanLongitude(ahargana, this.planetarySystem.candrocca.YugaRotation) + 90;
    return math.zero360(meanLunarLongitude - this.getMandaEquation((meanLunarLongitude - apogee), 'moon'));
  },
  getTrueSolarLongitude        : function (ahargana) {
    var meanSolarLongitude = this.getMeanLongitude(ahargana, this.planetarySystem.sun.YugaRotation);
    return math.zero360(meanSolarLongitude - this.getMandaEquation((meanSolarLongitude - this.planetarySystem.sun.Apogee), 'sun'));
  },
  getElong                     : function (ahargana) {
    var elong = Math.abs(this.getTrueLunarLongitude(ahargana) - this.getTrueSolarLongitude(ahargana));
    if (180 < elong) {
      elong = 360 - elong;
    }
    return elong;
  },
  findConjunction              : function (leftX, leftY, rightX, rightY) {
    var width = (rightX - leftX) / 2;
    var centreX = (rightX + leftX) / 2;
    if (width < math.epsilon) {
      return this.getTrueSolarLongitude(centreX);
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
  getConjunction               : function (ahargana) {
    return this.findConjunction(ahargana - 2, this.getElong(ahargana - 2), ahargana + 2, this.getElong(ahargana + 2));
  },
  getLastConjunctionLongitude  : function (ahargana, tithi) {
    var newNew = this.planetarySystem.yuga.CivilDays / (this.planetarySystem.moon.YugaRotation - this.planetarySystem.sun.YugaRotation);
    ahargana -= tithi * (newNew / 30);

    if (Math.abs(ahargana - this.backLastConjunctionAhargana) < 1) {
      return this.backLastConjunctionLongitude;
    } else if (Math.abs(ahargana - this.backNextConjunctionAhargana) < 1) {
      this.backLastConjunctionAhargana = this.backNextConjunctionAhargana;
      this.backLastConjunctionLongitude = this.backNextConjunctionLongitude;
      return this.backNextConjunctionLongitude;
    } else {
      this.backLastConjunctionAhargana = ahargana;
      this.backLastConjunctionLongitude = this.getConjunction(ahargana);
      return this.backLastConjunctionLongitude;
    }
  },
  getNextConjunctionLongitude  : function (ahargana, tithi) {
    var newNew = this.planetarySystem.yuga.CivilDays / (this.planetarySystem.moon.YugaRotation - this.planetarySystem.sun.YugaRotation);
    ahargana += (30 - tithi) * (newNew / 30);

    if (Math.abs(ahargana - this.backNextConjunctionAhargana) < 1) {
      return this.backNextConjunctionLongitude;
    } else {
      this.backNextConjunctionAhargana = ahargana;
      this.backNextConjunctionLongitude = this.getConjunction(ahargana);
      return this.backNextConjunctionLongitude;
    }
  }
};

module.exports = celestial;
