'use strict';

var mathHelper = require('./math-helper');

var geolocationHelper = {
  zero360 : function(longitude) {
    var result = longitude - mathHelper.truncate(longitude / 360) * 360;
    return result < 0 ? 360 + result : result;
  }
};

module.exports = geolocationHelper;