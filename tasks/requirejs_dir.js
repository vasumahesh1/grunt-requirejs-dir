/*
 * grunt-requirejs-dir
 * https://github.com/vasumahesh1/grunt-requirejs-dir
 *
 * Copyright (c) 2016 Vasu Mahesh
 * Licensed under the MIT license.
 */

'use strict';

var os = require('os');
var path = require('path');
var START_DELIM = '//- REQUIRE_DIR_START';
var END_DELIM = '//- REQUIRE_DIR_END';

module.exports = function(grunt) {

  grunt.registerMultiTask('requirejs_dir', 'Create define blocks for Require JS from a directory containing files.', function() {
    var taskData = this.data;

    var options = this.options({
      quot: '\'',
      endComma: false,
      startDelimiter: START_DELIM,
      endDelimiter: END_DELIM,
      tab: '  ', // 2 spaces
      eol: os.EOL
    });

    var startDelim = options.startDelimiter;
    var endDelim = options.endDelimiter;

    if (!taskData.src) {
      grunt.log.error('Missing Input Files.');
      return new Error('Missing Input Files.');
    }

    if (!taskData.dest) {
      grunt.log.error('Destination file not given in options.');
      return new Error('Destination file not given in options.');
    }

    var source = taskData.src;
    var dest = taskData.dest;

    if (!grunt.file.exists(dest)) {
      grunt.log.error('Missing Destination File.');
      return new Error('Missing Destination File.');
    }

    if (source.constructor !== Array) {
      source = [source];
    }

    var files = grunt.file.expand(source);

    var destinationCode = grunt.file.read(dest);

    var startIndex = destinationCode.indexOf(startDelim);
    var endIndex = destinationCode.indexOf(endDelim);

    if (startIndex === -1 || endIndex === -1) {
      if (startIndex === -1) {
        grunt.log.warn('Cannot Locate the Start Indicator');
      }

      if (endIndex === -1) {
        grunt.log.warn('Cannot Locate the End Indicator');
      }

      return new Error('Cannot Locate the Indicators. Check Logs.');
    }

    var startPos = startIndex + startDelim.length;
    var endPos = endIndex;

    var upperCode = destinationCode.substring(0, startPos);
    var lowerCode = destinationCode.substring(endIndex);

    var modules = _joinModulesToString(files, '', dest, options);

    var newCode = upperCode + options.eol + modules + options.eol + options.tab + lowerCode;

    grunt.file.write(dest, newCode);
  });

};


function _joinModulesToString(modules, string, dest, options) {
  for (var idx = 0; idx < modules.length; idx++) {
    var module = modules[idx];

    var relative = path.posix.relative(path.posix.dirname(dest), module);
    var finalPath = path.posix.join('./', relative)

    if (!finalPath.startsWith('.')) {
      finalPath = './' + finalPath;      
    }

    string += options.tab + options.quot + finalPath + options.quot;

    if (idx !== modules.length - 1) {
      string += ',' + options.eol;
    }
  }

  if (options.endComma) {
    string += ',';
  }

  return string;
}
