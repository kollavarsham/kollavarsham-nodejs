#!/usr/bin/env node

/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 CLI app to convert Gregorian date to Kollavarsham date and vice versa
 @module cli
 */

'use strict';

var nopt = require('nopt');
var pkg = require('./../package.json');
var cliHelper = require('./cli-helper');
var Kollavarsham = require('./Kollavarsham');
var kollavarsham = new Kollavarsham();

//TODO akutty
//Option for setting latitude/longitude using preset values from ./locations.js
var opts = nopt({
  help           : Boolean,
  version        : Boolean,
  bija           : Boolean,
  mode           : Number,
  showLongitudes : Boolean,
  showLatitudes  : Boolean,
  latitude       : Number,
  longitude      : Number,
  output         : ["list", "verbose"]

}, {
  h : '--help',
  v : '--version',
  b : '--bija',
  m : '--mode',
  a : '--show-latitudes',
  o : '--show-longitudes',
  t : '--latitude',
  g : '--longitude',
  f : '--output-format'
});

var args = opts.argv.remain;
var cmd = args[0];

cliHelper.openingMessage();

if (opts.help) {
  cliHelper.helpMessage();
} else if (opts.version) {
  return console.log(pkg.version);
} else if (opts.showLatitudes) {
  cliHelper.showLatitudes();
} else if (opts.showLongitudes) {
  cliHelper.showLongitudes();
}
else {
  // TODO: Instead of setting one setting at a time, collect them into an options object and
  // invoke the Kollavarsham constructor
  //      var kollavarsham = new Kollavarsham(option);
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
  if (opts.output) {
    kollavarsham.setOutput(opts.output);
  }

  if (cmd) {
    console.log('You are trying to convert: %s', cmd);
    var inputDate = cliHelper.parseDate(cmd);
    if (!isNaN(inputDate)) {
      kollavarsham.setInputDate(inputDate);
    }
  }
}

// TODO: Shouldn't displaySettings be a cli concern?
kollavarsham.displaySettings();
