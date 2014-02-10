#!/usr/bin/env node

/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var nopt = require('nopt');
var pkg = require('./package.json');
var helper = require('./lib/cli-helper');
var kollavarsham = require('./lib/kollavarsham');

//TO DO akutty
//Option for setting latitude/longitude using preset values from ./locations.js
var opts = nopt({
  help           : Boolean,
  version        : Boolean,
  bija           : Boolean,
  mode           : Number,
  showlongitudes : Boolean,
  showlatitudes  : Boolean,
  latitude       : Number,
  longitude      : Number,
  output         : ["list", "verbose"]

}, {
  h : '--help',
  v : '--version',
  b : '--bija',
  m : '--mode',
  a : '--showlatitudes',
  o : '--showlongitudes',
  t : '--latitude',
  g : '--longitude',
  f : '--outputformat'
});

var args = opts.argv.remain;
var cmd = args[0];

helper.openingMessage();

if (opts.help) {
  helper.helpMessage();
} else if (opts.version) {
  return console.log(pkg.version);
} else if (opts.showlatitudes) {
  helper.showLatitudes();
} else if (opts.showlongitudes) {
  helper.showLongitudes();
}
else {
  if (opts.mode) {
    kollavarsham.setMode(opts.mode);
  }
  if (opts.bija) {
    kollavarsham.setBija(opts.bija);
  }
  if (opts.latitude) {
    kollavarsham.setLatitude(opts.latitude);
  }
  if (opts.longitude) {
    kollavarsham.setLongitude(opts.longitude);
  }
  if (opts.output){
    kollavarsham.setOutput(opts.output);
  }

  if (cmd) {
    console.log('You are trying to convert: %s', cmd);
    var inputDate = helper.parseDate(cmd);
    if (!isNaN(inputDate)){
      kollavarsham.setInputDate(inputDate);
    }
  }
}

kollavarsham.displaySettings();
