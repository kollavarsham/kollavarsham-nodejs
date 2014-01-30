#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var kollavarsham = require('./lib/kollavarsham');

console.log(chalk.green('Hello, World!'));
console.log(chalk.green('-------------'));
console.log();
console.log(chalk.gray('This next line is coming from within the kollavarsham library'));
console.log();
console.log(chalk.blue(kollavarsham.awesome()));