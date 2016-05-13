# grunt-requirejs-dir

> Create define blocks for Require JS from a directory containing files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-dir --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-dir');
```

## The "requirejs_dir" task

### Overview
In your project's Gruntfile, add a section named `requirejs_dir` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs_dir: {
    build: {
      options: {},
      src: 'controllers/examplePage/**/*.js', // Source Files/File
      dest: 'controllers/all.js' // This file also has to exist
    },
  }
});
```

### How it works?
The destination file has to exist. The Default format of a file is like:
```js
define([
  'SampleModule1',
  //- REQUIRE_DIR_START
  
  // <-- These two markers tell where to include the files.
  
  //- REQUIRE_DIR_END
], function(SampleModule1) {

  ...
  // My Random Code
  ...
  ...
  ...
});
```

End Result:
```js
define([
  'SampleModule1',
  //- REQUIRE_DIR_START
  'src/defines/sample1.js',
  'src/defines/sample2.js',
  'src/defines/sample3.js'
  //- REQUIRE_DIR_END
], function(SampleModule1) {

  ...
  // My Random Code
  ...
  ...
  ...
});

```

### Usage Examples

#### Default Options
There are no default options. All you need is Source and Destination. Both Source and Destination have to exist.

```js
grunt.initConfig({
  requirejs_dir: {
    build: {
      src: 'playground/defines/**/*.js',
      dest: 'tmp/default.js'
    }
  }
});
```

#### Options

#### options.quot
Type: `String`
Default value: `'`

Quote mark to be used when requiring the files.

#### options.endComma
Type: `Boolean`
Default value: `false`

To indicate if a terminating comma is needed. Use it in the case when the Required Files are inserted in the middle.

#### options.startDelimiter
Type: `String`
Default value: `//- REQUIRE_DIR_START`

Custom Start Flag

#### options.endDelimiter
Type: `String`
Default value: `//- REQUIRE_DIR_END`

Custom End Flag

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
