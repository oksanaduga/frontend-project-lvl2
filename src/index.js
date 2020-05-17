import fs from 'fs';
import path from 'path';
import has from 'lodash';
import parse from './parse';
import diff from './diff';
import { plain, json, objectFormatter } from './formatters';

const formatters = {
  plain,
  json,
  object: objectFormatter,
};

const formatOutput = (formatName, content) => {
  if (!has(formatters, formatName)) {
    throw new Error('Unknown format: accept "plain", "object", "json"');
  }
  const formatter = formatters[formatName];
  return formatter(content);
};

const defineFormat = (pathToFile) => {
  const format = path.extname(pathToFile);
  return format;
};

const readContent = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const gendiff = (fromPath, toPath, format = 'json') => {
  const contentFrom = readContent(fromPath);
  const contentTo = readContent(toPath);
  const formatContentFrom = defineFormat(fromPath);
  const formatContentTo = defineFormat(toPath);
  const configBefore = parse(contentFrom, formatContentFrom);
  const configAfter = parse(contentTo, formatContentTo);
  const difference = diff(configBefore, configAfter);
  console.log(JSON.stringify(difference, null, 2));
  return formatOutput(format, difference);
};

export default gendiff;
