#!/usr/bin/env node

/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var nopt = require('nopt');
var pkg = require('./../package.json');
var cliHelper = require('./cli-helper');
var Kollavarsham = require('./Kollavarsham');

//TODO akutty
//Option for setting latitude/longitude using preset values from ./locations.js
var opts = nopt({
  'help'           : Boolean,
  'version'        : Boolean,
  'bija'           : Boolean,
  'mode'           : Number,
  'showlongitudes' : Boolean,
  'showlatitudes'  : Boolean,
  'latitude'       : Number,
  'longitude'      : Number,
  'outputformat'   : ['list', 'verbose']

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
var firstArgument = args[0];

cliHelper.openingMessage();

if (opts.help) {
  return cliHelper.helpMessage();
} else if (opts.version) {
  return console.log(pkg.version);
} else if (opts.showlatitudes) {
  return cliHelper.showLatitudes();
} else if (opts.showlongitudes) {
  return cliHelper.showLongitudes();
}
else {
  var kollavarsham = new Kollavarsham(cliHelper.parseOptions(opts));

  if (firstArgument) {
    var mode = opts.mode || 0;
    if (mode === 0) {
      console.log('You are trying to convert the Gregorian date ' + chalk.blue.bold('%s') +
          ' to Kollavarsham date', firstArgument);
      var date = cliHelper.parseDate(firstArgument);
      if (date) {
        cliHelper.displaySettings(kollavarsham.getSettings());
        var kollavarshamDate = kollavarsham.fromGregorianDate(date);
        console.log(chalk.cyan('\nOutput\n------'));
        console.log(chalk.blue(kollavarshamDate.print()));
        //console.log('\n' + JSON.stringify(kollavarshamDate, null, 4));
      }
    } else {
      console.log('You are trying to convert the Kollavarsham date ' + chalk.blue.bold('%s') +
          ' to Gregorian date', firstArgument);
    }
  }
}

