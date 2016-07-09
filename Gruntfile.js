/*
 * grunt-requirejs-dir
 * https://github.com/vasumahesh1/grunt-requirejs-dir
 *
 * Copyright (c) 2016 Vasu Mahesh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp']
    },

    copy: {
      tests: {
        expand: true,
        src: '**/*.js',
        dest: 'tmp/',
        cwd: 'test/fixtures'
      }
    },

    requirejs_dir: {
      // build: {
      //   options: {
      //   },
      //   src: 'playground/defines1/**/*.js',
      //   dest: 'playground/dest/sampleTag.js'
      // }
      default: {
        src: 'playground/defines/**/*.js',
        dest: 'tmp/default.js'
      },
      endComma: {
        options: {
          endComma: true,
        },
        src: 'playground/defines/**/*.js',
        dest: 'tmp/endComma.js'
      },
      quot: {
        options: {
          quot: '\"',
        },
        src: 'playground/defines/**/*.js',
        dest: 'tmp/quot.js'
      },
      delims: {
        options: {
          startDelimiter: '//- CUSTOM_DELIM_START',
          endDelimiter: '//- CUSTOM_DELIM_END'
        },
        src: 'playground/defines/**/*.js',
        dest: 'tmp/delims.js'
      }
    },

    release: {
      options: {
        changelog: false,
        add: true,
        commit: true,
        tag: false,
        push: false,
        pushTags: false,
        npm: true,
        npmtag: false,
        indentation: '\t',
        beforeBump: [],
        afterBump: [],
        beforeRelease: [],
        afterRelease: [],
        updateVars: []
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });


  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('test', ['clean', 'copy:tests', 'requirejs_dir', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
