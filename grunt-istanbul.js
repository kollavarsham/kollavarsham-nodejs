'use strict';

module.exports = function (grunt) {
  var exec = require('child_process').exec;
  var path = require('path');

  grunt.registerMultiTask('istanbul', 'Runs istanbul on the nodeunit tests to generate the coverage reports', function () {

    var done = this.async();

    var options = this.options({
      args        : '',
      cwd         : process.cwd(),
      stdout      : true,
      stderr      : true,
      failOnError : true
    });

    var cwd = path.resolve(process.cwd(), options.cwd);

    grunt.log.writeln('Running istanbul to calculate coverage...');
    var cmd = exec('istanbul cover node_modules/grunt-contrib-nodeunit/node_modules/nodeunit/bin/nodeunit -- test', {
      cwd : cwd
    }, function (error) {
      if (error && options.failOnError) {
        grunt.warn(error);
        done();
      }
      grunt.log.writeln('done.');
      done();
    });

    if (options.stdout || grunt.option('verbose')) {
      cmd.stdout.pipe(process.stdout);
    }
    if (options.stderr || grunt.option('verbose')) {
      cmd.stderr.pipe(process.stderr);
    }

  });
};
