var chalk = require('chalk');

exports.openingMessage = function () {
  console.log();
  console.log(chalk.green.bold("                          kollavarsham"));
  console.log(chalk.gray("   Based on the Pancanga Perl library by M. YANO and M. FUSHIMI"));
  console.log(chalk.gray("   http://www.cc.kyoto-su.ac.jp/~yanom/pancanga/message313.html"));
  console.log(chalk.gray("   ------------------------------------------------------------"));
  console.log();
};

exports.helpMessage = function () {
  //console.log(chalk.blue("TODO:// Usage along with a documentation of all options available"));
  console.log(chalk.magenta("./cli.js [options] arg"));
  console.log(chalk.magenta.bold("options"));
  console.log(chalk.magenta.bold("======="));
  console.log(chalk.magenta("-h --help"));
  console.log(chalk.magenta("   Show this text"));
  console.log(chalk.magenta("-m --mode <0/1>"));
  console.log(chalk.magenta("   0 for Gregorian Calendar Date to Malayalam Calendar Date"));
  console.log(chalk.magenta("   1 for Malayalam Calendar Date to Gregorian Calendar Date"));
  console.log(chalk.magenta("-la --Latitude number"));
  console.log(chalk.magenta("   number signifying degrees of Latitude of the location Where the event occurred"));
  console.log(chalk.magenta("   default: 23.2"));
  console.log(chalk.magenta("-lo --Longitude number"));
  console.log(chalk.magenta("   number signifying degrees of Latitude of the location Where the event occurred"));
  console.log(chalk.magenta("   default: 75.8"));
  console.log(chalk.magenta("-b --Bija <true/false>"));
  console.log(chalk.magenta("   Turn bija on or off. Default off."));
  console.log(chalk.magenta("-o --OutputFormat <list/verbose>"));
  console.log(chalk.magenta("list for dates on both sides of the entered"));
  console.log(chalk.magenta("verbose for detailed view of the output date"));
  console.log(chalk.magenta.bold("arguments"));
  console.log(chalk.magenta.bold("========="));
  console.log(chalk.magenta("Date"));
  console.log(chalk.magenta("   Input date to be converted. Use the following date formats."));
  console.log(chalk.magenta("   Date format: DDMMYYYY when mode is 0 (Gregorian to Malayalam)"));
  console.log(chalk.magenta("   Date format: DDMMYYYY when mode is 1 (Malayalam to Gregorian) where"));
  console.log(chalk.magenta("   DD is the day of the Malayalam month"));
  console.log(chalk.magenta("   MM 01 for Chingam, 02 for Kanni, 03 for Thulam, 04 for Vrischikam, 05 for Dhanu, 06 for Makaram, 07 for Kumbham, 08 for Meenam, 09 for Medam, 10 for Edavam, 11 for Mithunam, 12 for Karkidakam"));
  console.log(chalk.magenta("   YYYY is the Malayalam Year (Kollavarsham)"));

};
