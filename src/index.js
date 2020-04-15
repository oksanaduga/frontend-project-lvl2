import has from 'lodash';
import parse from './parse';
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
  const fromContent = parse(fromPath);
  const toContent = parse(toPath);
  const difference = diff(fromContent, toContent);
  return getFormat(format, difference);
};

export default gendiff;
