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
var updateNotifier = require('update-notifier');

//TODO akutty
//Option for setting latitude/longitude using preset values from ./locations.js
var opts = nopt({
  'help'           : Boolean,
  'version'        : Boolean,
  'system'         : ['InPancasiddhantika', 'SuryaSiddhanta'],
  'mode'           : Number,
  'showlongitudes' : Boolean,
  'showlatitudes'  : Boolean,
  'latitude'       : Number,
  'longitude'      : Number,
  'outputformat'   : ['list', 'verbose']

}, {
  h : '--help',
  v : '--version',
  s : '--system',
  m : '--mode',
  a : '--showlatitudes',
  o : '--showlongitudes',
  t : '--latitude',
  g : '--longitude',
  f : '--outputformat'
});

var args = opts.argv.remain;
var firstArgument = args[0];

var notifier = updateNotifier({
  packageName    : pkg.name,
  packageVersion : pkg.version
});

if (notifier.update) {
  notifier.notify();
}

cliHelper.openingMessage(pkg.version);

//TODO: This is the temporary output function
var printOutput = function (kollavarshamDate) {
  var pad = function (num, size) {
    var s = '000000000' + num;
    return s.substr(s.length - size);
  };
  if (kollavarshamDate.globals) {
    var result = 'Saka : ' + pad(kollavarshamDate.globals.YearSaka, 4) + '\t' + pad(kollavarshamDate.globals.tithiDay, 2) + ' ' +
        kollavarshamDate.globals.masa + ' (' + pad(kollavarshamDate.globals.masaNum, 2) + ') ' + '\t[' + kollavarshamDate.globals.paksa + ']\n';

    result += 'Saura: ' + pad(kollavarshamDate.globals.YearSaka, 4) + '\t' + pad(kollavarshamDate.day, 2) + ' ' +
        kollavarshamDate.globals.sauraMasa + ' (' + pad(kollavarshamDate.month, 2) + ') ' + '\t' + kollavarshamDate.globals.naksatra + '\n';

    result += 'ME   : ' + pad(kollavarshamDate.year, 4) + '\t' + pad(kollavarshamDate.day, 2) + ' ' +
        kollavarshamDate.globals.malayalaMasa + ' (' + pad(kollavarshamDate.globals.malayalaMasaNum, 2) + ') ' + '\t' + kollavarshamDate.globals.malayalaNaksatra + '\n';

    return result;
  }
  return kollavarshamDate.toString();
};

if (opts.help) {
  return cliHelper.helpMessage();
} else if (opts.version) {
  return console.log('Installed version of %s is %s\n', pkg.name, chalk.green.bold(pkg.version));
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
        console.log(chalk.white(printOutput(kollavarshamDate)));
        //console.log('\n' + JSON.stringify(kollavarshamDate, null, 4));
      }
    } else {
      console.log('You are trying to convert the Kollavarsham date ' + chalk.blue.bold('%s') +
          ' to Gregorian date', firstArgument);
    }
  }
}

