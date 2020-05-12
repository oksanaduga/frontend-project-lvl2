import fs from 'fs';
import path from 'path';
import has from 'lodash';
import parse from './parse';
import diff from './diff';
import { plain, json } from './formatters';

const acceptFormat = {
  plain,
  json,
};

const getFormat = (format, content) => {
  if (!has(acceptFormat, format)) {
    throw new Error('Unknown format: accept "plain", "insert", "json"');
  }
  return acceptFormat[format](content);
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
  return getFormat(format, difference);
};

export { readContent, defineFormat, gendiff };
