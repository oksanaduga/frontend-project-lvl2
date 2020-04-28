import has from 'lodash';
import { defineFormat, readContent, parse } from './parse';
import diff from './diff';
import { plain, insert, json } from './formatters';

const acceptFormat = {
  insert,
  plain,
  json,
};

const getFormat = (format, content) => {
  if (!has(acceptFormat, format)) {
    throw new Error('Unknown format: accept "plain", "insert", "json"');
  }
  return acceptFormat[format](content);
};

const gendiff = (fromPath, toPath, format = 'json') => {
  const contentFrom = readContent(fromPath);
  const contentTo = readContent(toPath);
  const formatContentFrom = defineFormat(fromPath);
  const formatContentTo = defineFormat(toPath);
  const parseContentFrom = parse(contentFrom, formatContentFrom);
  const parseContentTo = parse(contentTo, formatContentTo);
  const difference = diff(parseContentFrom, parseContentTo);
  return getFormat(format, difference);
};

export default gendiff;
