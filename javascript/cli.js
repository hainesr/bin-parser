#!/usr/bin/env node

'use strict';

var fs = require('fs'),
    path = require('path');

var BinParser = require('./index');

var main = function(filename, structure, types) {
  var parser = new BinParser(fs.readFileSync(filename).toString('binary'),
    fs.readFileSync(structure).toString('binary'),
    fs.readFileSync(types).toString('binary'));

  parser.dump();
};

var exitCode = main(
  path.resolve(process.cwd(), process.argv[2]),
  path.resolve(process.cwd(), process.argv[3]),
  path.resolve(process.cwd(), process.argv[4])
);

/*
Wait for the stdout buffer to drain.
See https://github.com/eslint/eslint/issues/317
*/
process.on('exit', function() {
  process.reallyExit(exitCode);
});
