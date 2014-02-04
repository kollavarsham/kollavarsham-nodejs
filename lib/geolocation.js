'use strict';

var math = require('./math');

var geolocation = {
  zero360 : function (longitude) {
    var result = longitude - math.truncate(longitude / 360) * 360;
    return result < 0 ? 360 + result : result;
  }
};

module.exports = geolocation;