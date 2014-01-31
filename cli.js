#!/usr/bin/env node
'use strict';

var nopt = require('nopt');
var pkg = require('./package.json');
var helper = require('./lib/cli-helper');
var kollavarsham = require('./lib/kollavarsham');

var opts = nopt({
  help    : Boolean,
  version : Boolean
}, {
  h : '--help',
  v : '--version'
});

var args = opts.argv.remain;
var cmd = args[0];

helper.openingMessage();

if (opts.help) {
  helper.helpMessage();
} else if (opts.version) {
  return console.log(pkg.version);
} else {
  console.log('TODO: Implement the rest...');
  if (cmd) {
    console.log('Command: %s', cmd);
  }
}

