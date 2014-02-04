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
  showlatitudes  : Boolean

}, {
  h : '--help',
  v : '--version',
  b : '--bija',
  m : '--mode',
  s : '--showlatitudes'
  //s: '--showlongitudes'
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
  //console.log('TODO: Implement the rest...');

  if (cmd) {
    console.log('Command: %s', cmd);
  }
}
