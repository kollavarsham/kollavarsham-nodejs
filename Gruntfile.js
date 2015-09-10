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

  // load custom grunt task for running istanbul
  require('./grunt-istanbul')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg          : grunt.file.readJSON('package.json'),
    nodeunit     : {
      files : ['test/**/*_test.js']
    },
    jshint       : {
      options   : {
        jshintrc : '.jshintrc',
        reporter : require('jshint-stylish')
      },
      gruntfile : {
        src : 'Gruntfile.js'
      },
      lib       : {
        src : ['lib/**/*.js']
      },
      test      : {
        src : ['test/**/*.js']
      }
    },
    watch        : {
      gruntfile : {
        files : '<%= jshint.gruntfile.src %>',
        tasks : ['jshint:gruntfile']
      },
      lib       : {
        files : '<%= jshint.lib.src %>',
        tasks : ['jshint:lib', 'istanbul']
      },
      test      : {
        files : '<%= jshint.test.src %>',
        tasks : ['jshint:test', 'istanbul']
      }
    },
    yuidoc       : {
      compile : {
        name        : '<%= pkg.name %>',
        description : '<%= pkg.description %>',
        version     : '<%= pkg.version %>',
        url         : '<%= pkg.homepage %>',
        options     : {
          paths    : 'lib',
          themedir : 'themes/kollavarsham',
          outdir   : 'doc',
          helpers  : ['themes/kollavarsham/helpers/helpers.js']
        }
      }
    },
    istanbul     : {
      test : {
        options : {
          cwd : '.'
        }
      }
    },
    buildcontrol : {
      options : {
        dir     : 'doc',
        commit  : true,
        push    : true,
        message : 'Built %sourceName% API documentation from commit %sourceCommit% on branch master'
      },
      pages   : {
        options : {
          remote : 'git@github.com:kollavarsham/kollavarsham-nodejs.git',
          branch : 'gh-pages'
        }
      }
    }
  });

  // Default task - lint and run the unit tests
  grunt.registerTask('default', ['jshint', 'nodeunit', 'watch']);

  // Build documentation
  grunt.registerTask('doc', ['jshint', 'yuidoc']);

  // Test
  grunt.registerTask('test', ['doc', 'istanbul']);

};
