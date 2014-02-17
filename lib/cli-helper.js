/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

/**
 * Helper functions for the CLI app
 * @module cli-helper
 */
var chalk = require('chalk');

/**
 * @class cliHelper
 * @static
 */
var cliHelper = {
  /**
   * Prints the opening message/banner when the CLI is invoked
   * @method openingMessage
   * @static
   **/
  openingMessage  : function () {
    console.log();
    console.log(chalk.green.bold("                          kollavarsham"));
    console.log(chalk.gray("   Based on the Pancanga Perl library by M. YANO and M. FUSHIMI"));
    console.log(chalk.gray("   http://www.cc.kyoto-su.ac.jp/~yanom/pancanga/message313.html"));
    console.log(chalk.gray("   ------------------------------------------------------------"));
    console.log();
  },
  /**
   * Displays the help message for the CLI
   * @method helpMessage
   * @static
   **/
  helpMessage     : function () {
    console.log(chalk.red("kollavarsham [options] [arguments]\n"));
    console.log(chalk.green("options"));
    console.log(chalk.green("======="));
    console.log(chalk.blue("-h --help"));
    console.log("   Show this text");
    console.log(chalk.blue("-a --show-latitudes"));
    console.log("   Display a map of India with the latitudes");
    console.log(chalk.blue("-o --show-longitudes"));
    console.log("   Display a map of India with the longitudes");
    console.log(chalk.blue("-b --bija"));
    console.log("   Set Bija to true");
    console.log(chalk.blue("-m --mode <0/1>"));
    console.log("   0 for Gregorian Calendar Date to Malayalam Calendar Date");
    console.log("   1 for Malayalam Calendar Date to Gregorian Calendar Date");
    console.log(chalk.blue("-t --latitude number"));
    console.log("   number signifying degrees of Latitude of the location Where the event occurred");
    console.log(chalk.gray("   default: 23.2 (Use option --showlatitude for help) "));
    console.log(chalk.blue("-g --longitude number"));
    console.log("   number signifying degrees of Latitude of the location Where the event occurred");
    console.log(chalk.gray("   default: 75.8 (Use option --showlongitude for help)"));
    console.log(chalk.blue("-b --bija <true/false>"));
    console.log("   Turn bija on or off. Default off.");
    console.log(chalk.blue("-o --output-format <list/verbose>"));
    console.log("   list: for dates on both sides of the entered");
    console.log("   verbose: for detailed view of the output date");
    console.log(chalk.gray("   (Any other value than 'list' or 'verbose' will be discarded)"));
    console.log(chalk.green("arguments"));
    console.log(chalk.green("========="));
    console.log(chalk.blue("Date"));
    console.log("    Input date to be converted. Use the following date formats.");
    console.log("    Date format: DD:MM:YYYY when mode is 0 (Gregorian to Malayalam)");
    console.log("    Date format: DD:MM:YYYY when mode is 1 (Malayalam to Gregorian) where");
    console.log("    DD is the day of the Malayalam month");
    console.log("    MM 01 for Chingam, 02 for Kanni, 03 for Thulam, 04 for Vrischikam, 05 for Dhanu, 06 for Makaram, ");
    console.log("       07 for Kumbham, 08 for Meenam, 09 for Medam, 10 for Edavam, 11 for Mithunam, 12 for Karkidakam");
    console.log("    YYYY is the Malayalam Year (Kollavarsham)");
    console.log(chalk.green("Examples"));
    console.log(chalk.green("========"));
    console.log("To convert Modern Date to Kollavarsham Date for Location (100 deg east, 90 deg north");
    console.log("With bija and list output:");
    console.log(chalk.yellow("    kollavarsham -b -t 90 -g 100 -m 0 -o list 23:08:2008"));
    console.log("To convert Modern Date to with default settings (Location: Ujjain)");
    console.log(chalk.yellow("    kollavarsham 04:04:2011"));
  },
  /**
   * Shows the latitude values for various Indian cities on the map - legacy from Perl
   * @method showLatitudes
   * @static
   **/
  showLatitudes   : function () {
    console.log(chalk.grey(" ------------------------------------------------------------ "));
    console.log(chalk.grey("|                  Latitude                                  |"));
    console.log(chalk.grey("|                                                            |"));
    console.log(chalk.grey("|_____                              ______36                 |"));
    console.log(chalk.grey("|                  *                         Srinagar:34.1   |"));
    console.log(chalk.grey("|_____                              ______32                 |"));
    console.log(chalk.grey("|                    *                       Delhi:28.6      |"));
    console.log(chalk.grey("|_____                         *    ______28 Kathmandu:27.7  |"));
    console.log(chalk.grey("|                          *                 Varanasi:25.3   |"));
    console.log(chalk.grey("|_____ ---\\                         ______24 Ujjain:23.2     |"));
    console.log(chalk.grey("|          \\//      *           *___         Calcutta:22.6   |"));
    console.log(chalk.grey("|_____       \\_/|             _/~   ~_____20                 |"));
    console.log(chalk.grey("|               |*          _/               Bombay:19.0     |"));
    console.log(chalk.grey("|_____           \\     *  _/        ______16 Hyderabad:17.4  |"));
    console.log(chalk.grey("|                 \\      |                                   |"));
    console.log(chalk.grey("|_____             \\    *|          ______12 Madras:13.1     |"));
    console.log(chalk.grey("|                   \\   /                                    |"));
    console.log(chalk.grey("|_____               \\*/ /\\         ______08 Trivandrum:8.5  |"));
    console.log(chalk.grey("|                       |* |                 Colombo:6.9     |"));
    console.log(chalk.grey("|_____                   --         ______04                 |"));
    console.log(chalk.grey("|                                                            |"));
    console.log(chalk.grey(" ------------------------------------------------------------ "));
  },
  /**
   * Shows the longitude values for various Indian cities on the map - legacy from Perl
   * @method showLongitudes
   * @static
   **/
  showLongitudes  : function () {
    console.log(chalk.grey(" ------------------------------------------------------------ "));
    console.log(chalk.grey("|                  Longitude                                 |"));
    console.log(chalk.grey("|            |     |     |     |     |                       |"));
    console.log(chalk.grey("|            |     |     |     |     |                       |"));
    console.log(chalk.grey("|                  *                         Srinagar:74.8   |"));
    console.log(chalk.grey("|                                                            |"));
    console.log(chalk.grey("|                    *                       Delhi:77.2      |"));
    console.log(chalk.grey("|                              *             Kathmandu:85.2  |"));
    console.log(chalk.grey("|                          *                 Varanasi:83.0   |"));
    console.log(chalk.grey("|      ---\\                                  Ujjain:75.8     |"));
    console.log(chalk.grey("|          \\//      *           *___         Calcutta:88.4   |"));
    console.log(chalk.grey("|            \\_/|             _/~   ~                        |"));
    console.log(chalk.grey("|               |*          _/               Bombay:72.8     |"));
    console.log(chalk.grey("|                \\     *  _/                 Hyderabad:78.5  |"));
    console.log(chalk.grey("|                 \\      |                                   |"));
    console.log(chalk.grey("|                  \\    *|                   Madras:80.2     |"));
    console.log(chalk.grey("|                   \\   /                                    |"));
    console.log(chalk.grey("|                    \\*/ /\\                  Trivandrum:77.0 |"));
    console.log(chalk.grey("|                       |* |                 Colombo:79.9    |"));
    console.log(chalk.grey("|            |     |     --    |     |                       |"));
    console.log(chalk.grey("|            |     |           |     |                       |"));
    console.log(chalk.grey("|            70          80          90                      |"));
    console.log(chalk.grey(" ------------------------------------------------------------ "));
  },
  parseOptions    : function (opts) {
    var options = {};
    if (opts.mode) {
      options.mode = opts.mode;
    }
    if (opts.bija) {
      options.bija = opts.bija;
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
  displaySettings : function (settings) {
    console.log('The current settings for ' + chalk.green('kollavarsham ') + 'calculations are as follows:');
    console.log('Bija           : ' + settings.bija);
    console.log('Mode           : ' + settings.mode);
    console.log('Latitude       : ' + settings.latitude);
    console.log('Longitude      : ' + settings.longitude);
    console.log('Output         : ' + settings.outputformat);
    console.log('Gregorian Date : ' + settings.gregorianDate);
  },
  /**
   * @method parseDate
   * @static
   * @param date {String} String representation of the date to be parsed
   * @returns {Date}
   */
  parseDate       : function (date) {
    try {
      var split = date.split(":");
      if (split.length === 3) {
        var InputDate = new Date(split[2], split[1] - 1, split[0]);
        //console.log("Input Date is " + InputDate.getDate() + " "  + InputDate.getMonth() + " " + InputDate.getYear());
        console.log("Date is " + InputDate);
        return InputDate;
      }
      throw new Error("\nInvalid Date Format. Please enter Date in the format DD:MM:YYYY")
    }
    catch (e) {
      console.log(chalk.red.bold(e.message));
      return null;
    }
  }
};

module.exports = cliHelper;

