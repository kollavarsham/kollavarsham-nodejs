/*
 * kollavarsham
 * http://kollavarsham.org
 *
 * Copyright (c) 2014 The Kollavarsham Team
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg      : grunt.file.readJSON('package.json'),
    nodeunit : {
      files : ['test/**/*_test.js']
    },
    jshint   : {
      options   : {
        jshintrc : '.jshintrc',
        reporter : require('jshint-stylish')
      },
      gruntfile : {
        src : 'Gruntfile.js'
      },
      lib       : {
        src : ['cli.js', 'lib/**/*.js']
      },
      test      : {
        src : ['test/**/*.js']
      }
    },
    watch    : {
      gruntfile : {
        files : '<%= jshint.gruntfile.src %>',
        tasks : ['jshint:gruntfile']
      },
      lib       : {
        files : '<%= jshint.lib.src %>',
        tasks : ['jshint:lib', 'nodeunit']
      },
      test      : {
        files : '<%= jshint.test.src %>',
        tasks : ['jshint:test', 'nodeunit']
      }
    },
    yuidoc   : {
      compile : {
        name        : '<%= pkg.name %>',
        description : '<%= pkg.description %>',
        version     : '<%= pkg.version %>',
        url         : '<%= pkg.homepage %>',
        options     : {
          paths    : 'lib/',
          themedir : 'yuidoc-theme/yuidoc-bootstrap-theme',
          helpers  : ['yuidoc-theme/yuidoc-bootstrap-theme/helpers/helpers.js'],
          outdir   : 'doc/'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
