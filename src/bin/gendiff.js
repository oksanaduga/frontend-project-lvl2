#!/usr/bin/env node

import program from 'commander';
import diff from '../index.js';

program
.description('Compares two configuration files and shows a difference.')
.version('0.1.0')
.option('-f, --format [type]', 'output format', (format) => console.log(`you set format ${format}`))
.arguments('<firstConfig> <secondConfig>')
.action(function (firstConfig, secondConfig) {
  console.log(diff(firstConfig, secondConfig));
});


program.parse(process.argv);
