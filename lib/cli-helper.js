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
  console.log(chalk.blue("TODO:// Usage along with a documentation of all options available"));
};