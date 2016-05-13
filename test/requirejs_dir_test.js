'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.requirejs_dir = {
  setUp: function(done) {
    done();
  },
  default: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default.js');
    var expected = grunt.file.read('test/expected/default.js');
    test.equal(actual, expected, 'should work with default options.');

    test.done();
  },
  endComma: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/endComma.js');
    var expected = grunt.file.read('test/expected/endComma.js');
    test.equal(actual, expected, 'should work with endComma option.');

    test.done();
  },
  quot: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/quot.js');
    var expected = grunt.file.read('test/expected/quot.js');
    test.equal(actual, expected, 'should work with quot option.');

    test.done();
  },
  delims: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/delims.js');
    var expected = grunt.file.read('test/expected/delims.js');
    test.equal(actual, expected, 'should work with delims option.');

    test.done();
  },
};
