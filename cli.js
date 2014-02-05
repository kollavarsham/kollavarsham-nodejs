#!/usr/bin/env node
'use strict';

var nopt = require('nopt');
var pkg = require('./package.json');
var helper = require('./lib/cli-helper');
var kollavarsham = require('./lib/kollavarsham');

var opts = nopt({
  help           : Boolean,
  version        : Boolean,
  bija           : Boolean,
  mode           : Number,
  showlongitudes : Boolean,
  showlatitudes  : Boolean,
  latitude       : Number,
  longitude      : Number

}, {
  h : '--help',
  v : '--version',
  b : '--bija',
  m : '--mode',
  sla : '--showlatitudes',
  slo: '--showlongitudes',
  la : '--latitude',
  lo : '--longitude'
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
    console.log("mode is " + opts.mode);
    kollavarsham.setMode(opts.mode);
  }
  if (opts.bija) {
    console.log("bija is " + opts.bija);
    kollavarsham.setBija(opts.bija);
  }
  if (opts.latitude) {
    console.log("latitude is " + opts.latitude);
    kollavarsham.setLatitude(opts.latitude);
  }
  if (opts.longitude) {
    console.log("longitude is " + opts.longitude);
    kollavarsham.setLongitude(opts.longitude);
  }

  if (cmd) {
    console.log('Command: %s', cmd);
  }
}
