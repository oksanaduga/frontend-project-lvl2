import parse from './parsers';
import diff from './diff';
import { plain, nested, json } from './formatters';

const obj = {
  nested,
  plain,
  json,
};

const gendiff = (beforePath, afterPath, format = 'json') => {
  const objBefore = parse(beforePath);
  const objAfter = parse(afterPath);
  const arrOfDifference = diff(objBefore, objAfter);
  return obj[format](arrOfDifference);
};

export default gendiff;
