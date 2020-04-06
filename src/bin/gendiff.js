#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [nested, plain, json]', 'output format', (format) => console.log(`you set format ${format}`))
  .arguments('<firstConfig> <secondConfig> <format>')
  .action((firstConfig, secondConfig, format) => {
    console.log(gendiff(firstConfig, secondConfig, format));
  });


program.parse(process.argv);
