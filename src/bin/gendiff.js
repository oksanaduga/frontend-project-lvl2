#!/usr/bin/env node

import program from 'commander';
import gendiff from '../index';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [insert, plain, json]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const useFormat = program.format;
    console.log(gendiff(firstConfig, secondConfig, useFormat));
  });


program.parse(process.argv);
