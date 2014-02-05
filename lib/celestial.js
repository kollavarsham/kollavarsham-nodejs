'use strict';

var celestial = {
  planetNames        : {
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
  YugaRotation       : {
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
  },
  PlanetRotation     : {
    'star'      : null,
    'sun'       : null,
    'moon'      : null,
    'mercury'   : null,
    'venus'     : null,
    'mars'      : null,
    'jupiter'   : null,
    'saturn'    : null,
    'Candrocca' : null,
    'Rahu'      : null
  },
  PlanetSighra       : {
    'star'      : null,
    'sun'       : null,
    'moon'      : null,
    'mercury'   : null,
    'venus'     : null,
    'mars'      : null,
    'jupiter'   : null,
    'saturn'    : null,
    'Candrocca' : null,
    'Rahu'      : null
  },
  PlanetMeanPosition : {
    'star'      : null,
    'sun'       : null,
    'moon'      : null,
    'mercury'   : null,
    'venus'     : null,
    'mars'      : null,
    'jupiter'   : null,
    'saturn'    : null,
    'Candrocca' : null,
    'Rahu'      : null
  },
  PlanetTruePosition : {
    'star'      : null,
    'sun'       : null,
    'moon'      : null,
    'mercury'   : null,
    'venus'     : null,
    'mars'      : null,
    'jupiter'   : null,
    'saturn'    : null,
    'Candrocca' : null,
    'Rahu'      : null
  },
  PlanetApogee       : {
    'star'      : null,
    'sun'       : null,
    'moon'      : null,
    'mercury'   : null,
    'venus'     : null,
    'mars'      : null,
    'jupiter'   : null,
    'saturn'    : null,
    'Candrocca' : null,
    'Rahu'      : null
  },
  PlanetCircumm      : {
    'star'      : null,
    'sun'       : null,
    'moon'      : null,
    'mercury'   : null,
    'venus'     : null,
    'mars'      : null,
    'jupiter'   : null,
    'saturn'    : null,
    'Candrocca' : null,
    'Rahu'      : null
  },
  PlanetCircums      : {
    'star'      : null,
    'sun'       : null,
    'moon'      : null,
    'mercury'   : null,
    'venus'     : null,
    'mars'      : null,
    'jupiter'   : null,
    'saturn'    : null,
    'Candrocca' : null,
    'Rahu'      : null
  },
  threeRelation      : function (left, center, right) {
    if (left < center && center < right) {
      return 1;
    } else if (right < center && center < left) {
      return -1;
    }
    return 0;
  }
};

module.exports = celestial;