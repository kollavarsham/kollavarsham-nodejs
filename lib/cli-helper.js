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
  console.log(chalk.magenta("-sla --showlatitude"));
  console.log(chalk.magenta("   Display a map of India with the latitudes of certain areas"));
  console.log(chalk.magenta("-slo --showlongitude"));
  console.log(chalk.magenta("   Display a map of India with the longitudes of certain areas"));
  console.log(chalk.magenta("-b --bija"));
  console.log(chalk.magenta("   Set Bija to true"));
  console.log(chalk.magenta("-m --mode <0/1>"));
  console.log(chalk.magenta("   0 for Gregorian Calendar Date to Malayalam Calendar Date"));
  console.log(chalk.magenta("   1 for Malayalam Calendar Date to Gregorian Calendar Date"));
  console.log(chalk.magenta("-la --Latitude number"));
  console.log(chalk.magenta("   number signifying degrees of Latitude of the location Where the event occurred"));
  console.log(chalk.magenta("   default: 23.2 (Use option --showlatitude for help) "));
  console.log(chalk.magenta("-lo --Longitude number"));
  console.log(chalk.magenta("   number signifying degrees of Latitude of the location Where the event occurred"));
  console.log(chalk.magenta("   default: 75.8 (Use option --showlongitude for help)"));
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

exports.showLatitudes = function () {
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
  console.log(chalk.grey("|               |*          _/               Bombay:19.0      |"));
  console.log(chalk.grey("|_____           \\     *  _/        ______16 Hyderabad:17.4  |"));
  console.log(chalk.grey("|                 \\      |                                   |"));
  console.log(chalk.grey("|_____             \\    *|          ______12 Madras:13.1     |"));
  console.log(chalk.grey("|                   \\   /                                    |"));
  console.log(chalk.grey("|_____               \\*/ /\\         ______08 Trivandrum:8.5  |"));
  console.log(chalk.grey("|                       |* |                 Colombo:6.9     |"));
  console.log(chalk.grey("|_____                   --         ______04                 |"));
  console.log(chalk.grey("|                                                            |"));
  console.log(chalk.grey(" ------------------------------------------------------------ "));
}

exports.showLongitudes = function () {
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

}
