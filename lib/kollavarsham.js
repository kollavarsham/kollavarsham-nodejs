/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 Floyd Pink
 * Licensed under the MIT license.
 */

'use strict';

exports.awesome = function () {
  return 'awesome';
};

exports.sayHello = function(){
  require('./kollavarsham-helper').hello();
};
