'use strict';

var celestial = {
  planetNames   : {
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
  threeRelation : function (left, center, right) {
    if (left < center && center < right) {
      return 1;
    } else if (right < center && center < left) {
      return -1;
    }
    return 0;
  }
};

module.exports = celestial;