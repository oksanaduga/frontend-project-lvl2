import has from 'lodash';
import parse from './parsers';
import diff from './diff';
import { plain, nested, json } from './formatters';

const acceptFormat = {
  nested,
  plain,
  json,
};

const getFormat = (format, content) => {
  if (!has(acceptFormat, format)) {
    throw new Error('Unknown format: accept "plain", "nested", "json"');
  }
  return acceptFormat[format](content);
};

const gendiff = (beforePath, afterPath, format = 'json') => {
  const objBefore = parse(beforePath);
  const objAfter = parse(afterPath);
  const arrOfDifference = diff(objBefore, objAfter);
  return getFormat(format, arrOfDifference);
};

export default gendiff;
