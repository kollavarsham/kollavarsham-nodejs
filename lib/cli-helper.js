/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');

var cliHelper = {
  openingMessage  : function (version) {
    console.log();
    console.log(chalk.green.bold('              kollavarsham (v%s)'), version);
    console.log(chalk.gray('   Based on the Pancanga Perl library by M. YANO and M. FUSHIMI'));
    console.log(chalk.gray('   http://www.cc.kyoto-su.ac.jp/~yanom/pancanga/message314.html'));
    console.log(chalk.gray('   ------------------------------------------------------------'));
    console.log();
  },
  helpMessage     : function () {
    console.log(chalk.red.bold('kollavarsham [options] [arguments]\n'));
    console.log(chalk.green('options'));
    console.log(chalk.green('======='));
    console.log('    ' + chalk.blue.bold('-h --help'));
    console.log('    ' + '   Show this help text');
    console.log('    ' + chalk.blue.bold('-v --version'));
    console.log('    ' + '   Display the current app version');
    console.log('    ' + chalk.blue.bold('-m --mode [0|1]'));
    console.log('    ' + '   ' + chalk.yellow.bold('0') + ' - Gregorian Calendar Date to Malayalam Calendar Date');
    console.log('    ' + '   ' + chalk.yellow.bold('1') + ' - Malayalam Calendar Date to Gregorian Calendar Date');
    console.log('    ' + chalk.blue.bold('-c --system [\'InPancasiddhantika\'|\'SuryaSiddhanta\']'));
    console.log('    ' + '   Sets system to use as \'InPancasiddhantika\' or \'SuryaSiddhanta\'. Default is \'SuryaSiddhanta\'.');
    console.log('    ' + '   ' + chalk.yellow.bold('InPancasiddhantika') + ' - Calculations are based on older constants in Pancasiddhantika (AD 505).');
    console.log('    ' + '   ' + chalk.yellow.bold('SuryaSiddhanta') + '     - Calculations are based on SuryaSiddhanta (AD 1000ca).');
    console.log('    ' + chalk.gray('   (Any value other than \'InPancasiddhantika\' or \'SuryaSiddhanta\' will be discarded)'));
    console.log('    ' + chalk.blue.bold('-a --showlatitudes'));
    console.log('    ' + '   Display a map of India with the latitudes');
    console.log('    ' + chalk.blue.bold('-o --showlongitudes'));
    console.log('    ' + '   Display a map of India with the longitudes');
    console.log('    ' + chalk.blue.bold('-t --latitude [number]'));
    console.log('    ' + '   Set the latitude of the location to be used as the basis of the conversions. Should be between -90 and +90');
    console.log('    ' + chalk.gray('   default: ') + chalk.yellow.bold('23.2') + chalk.gray(' (Use option --showlatitudes for help) '));
    console.log('    ' + chalk.blue.bold('-g --longitude [number]'));
    console.log('    ' + '   Set the longitude of the location to be used as the basis of the conversions. Should be between -180 and +180');
    console.log('    ' + chalk.gray('   default: ') + chalk.yellow.bold('75.8') + chalk.gray(' (Use option --showlongitudes for help)'));
    console.log('    ' + chalk.blue.bold('-o --output-format [\'list\'|\'verbose\']'));
    console.log('    ' + '   ' + chalk.yellow.bold('list') + '    - for dates on both sides of the entered');
    console.log('    ' + '   ' + chalk.yellow.bold('verbose') + ' - for detailed view of the output date');
    console.log('    ' + chalk.gray('   (Any value other than \'list\' or \'verbose\' will be discarded)'));
    console.log(chalk.green('arguments'));
    console.log(chalk.green('========='));
    console.log('    ' + chalk.blue.bold('Date'));
    console.log('    ' + '    Input date to be converted. Use the following date formats.');
    console.log('    ' + '    Date format: DD:MM:YYYY when mode is 0 (Gregorian to Malayalam)');
    console.log('    ' + '    Date format: DD:MM:YYYY when mode is 1 (Malayalam to Gregorian) where');
    console.log('    ' + '    DD is the day of the Malayalam month');
    console.log('    ' + '    MM 01 for Chingam, 02 for Kanni, 03 for Thulam, 04 for Vrischikam, 05 for Dhanu, 06 for Makaram, ');
    console.log('    ' + '       07 for Kumbham, 08 for Meenam, 09 for Medam, 10 for Edavam, 11 for Mithunam, 12 for Karkidakam');
    console.log('    ' + '    YYYY is the Malayalam Year (Kollavarsham)');
    console.log(chalk.green('Examples'));
    console.log(chalk.green('========'));
    console.log('    ' + 'To convert Modern Date to Kollavarsham Date for Location (100 deg east, 90 deg north');
    console.log('    ' + 'using \'InPancasiddhantika\' system and list output:');
    console.log('    ' + chalk.yellow('    kollavarsham -s \'InPancasiddhantika\' -t 90 -g 100 -m 0 -o list 23:08:2008'));
    console.log('    ' + 'To convert Modern Date to with default settings (Location: Ujjain and System: SuryaSiddhanta)');
    console.log('    ' + chalk.yellow('    kollavarsham 04:04:2011'));
  },
  showLatitudes   : function () {
    console.log(chalk.grey(' ------------------------------------------------------------ '));
    console.log(chalk.grey('|                  Latitude                                  |'));
    console.log(chalk.grey('|                                                            |'));
    console.log(chalk.grey('|_____                              ______36                 |'));
    console.log(chalk.grey('|                  *                         Srinagar:34.1   |'));
    console.log(chalk.grey('|_____                              ______32                 |'));
    console.log(chalk.grey('|                    *                       Delhi:28.6      |'));
    console.log(chalk.grey('|_____                         *    ______28 Kathmandu:27.7  |'));
    console.log(chalk.grey('|                          *                 Varanasi:25.3   |'));
    console.log(chalk.grey('|_____ ---\\                         ______24 Ujjain:23.2     |'));
    console.log(chalk.grey('|          \\//      *           *___         Calcutta:22.6   |'));
    console.log(chalk.grey('|_____       \\_/|             _/~   ~_____20                 |'));
    console.log(chalk.grey('|               |*          _/               Bombay:19.0     |'));
    console.log(chalk.grey('|_____           \\     *  _/        ______16 Hyderabad:17.4  |'));
    console.log(chalk.grey('|                 \\      |                                   |'));
    console.log(chalk.grey('|_____             \\    *|          ______12 Madras:13.1     |'));
    console.log(chalk.grey('|                   \\   /                                    |'));
    console.log(chalk.grey('|_____               \\*/ /\\         ______08 Trivandrum:8.5  |'));
    console.log(chalk.grey('|                       |* |                 Colombo:6.9     |'));
    console.log(chalk.grey('|_____                   --         ______04                 |'));
    console.log(chalk.grey('|                                                            |'));
    console.log(chalk.grey(' ------------------------------------------------------------ '));
  },
  showLongitudes  : function () {
    console.log(chalk.grey(' ------------------------------------------------------------ '));
    console.log(chalk.grey('|                  Longitude                                 |'));
    console.log(chalk.grey('|            |     |     |     |     |                       |'));
    console.log(chalk.grey('|            |     |     |     |     |                       |'));
    console.log(chalk.grey('|                  *                         Srinagar:74.8   |'));
    console.log(chalk.grey('|                                                            |'));
    console.log(chalk.grey('|                    *                       Delhi:77.2      |'));
    console.log(chalk.grey('|                              *             Kathmandu:85.2  |'));
    console.log(chalk.grey('|                          *                 Varanasi:83.0   |'));
    console.log(chalk.grey('|      ---\\                                  Ujjain:75.8     |'));
    console.log(chalk.grey('|          \\//      *           *___         Calcutta:88.4   |'));
    console.log(chalk.grey('|            \\_/|             _/~   ~                        |'));
    console.log(chalk.grey('|               |*          _/               Bombay:72.8     |'));
    console.log(chalk.grey('|                \\     *  _/                 Hyderabad:78.5  |'));
    console.log(chalk.grey('|                 \\      |                                   |'));
    console.log(chalk.grey('|                  \\    *|                   Madras:80.2     |'));
    console.log(chalk.grey('|                   \\   /                                    |'));
    console.log(chalk.grey('|                    \\*/ /\\                  Trivandrum:77.0 |'));
    console.log(chalk.grey('|                       |* |                 Colombo:79.9    |'));
    console.log(chalk.grey('|            |     |     --    |     |                       |'));
    console.log(chalk.grey('|            |     |           |     |                       |'));
    console.log(chalk.grey('|            70          80          90                      |'));
    console.log(chalk.grey(' ------------------------------------------------------------ '));
  },
  parseOptions    : function (opts) {
    var options = {};
    if (opts.mode) {
      options.mode = opts.mode;
    }
    if (opts.system) {
      options.system = opts.system;
    }
    if (opts.latitude) {
      options.latitude = opts.latitude;
    }
    if (opts.longitude) {
      options.longitude = opts.longitude;
    }
    if (opts.outputformat) {
      options.outputformat = opts.outputformat;
    }
    return options;
  },
  parseDate       : function (date) {
    try {
      var split = date.split(':');
      if (split.length === 3) {
        var inputDate = new Date(split[2], split[1] - 1, split[0]);
        //console.log('Input Date is ' + inputDate.getDate() + ' '  + inputDate.getMonth() + ' ' + inputDate.getYear());
        console.log('Date is ' + inputDate);
        return inputDate;
      }
      throw new Error('\nInvalid Date Format. Please enter Date in the format DD:MM:YYYY');
    }
    catch (e) {
      console.log(chalk.red.bold(e.message));
      return null;
    }
  },
  displaySettings : function (settings) {
    console.log(chalk.gray('\nThe current settings for ') + chalk.green('kollavarsham ') +
        chalk.gray('calculations are as follows:'));
    console.log(chalk.gray('System         : ' + settings.system));
    console.log(chalk.gray('Mode           : ' + settings.mode));
    console.log(chalk.gray('Latitude       : ' + settings.latitude));
    console.log(chalk.gray('Longitude      : ' + settings.longitude));
    console.log(chalk.gray('Output         : ' + settings.outputformat));
  }
};

module.exports = cliHelper;

