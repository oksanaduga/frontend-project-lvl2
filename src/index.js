#!/usr/bin/env node

import parse from './parsers';
import diff from './diff';
import { plain, nested, json } from './formatters';

const gendiff = (beforePath, afterPath, format = 'json') => {
  const objBefore = parse(beforePath);
  const objAfter = parse(afterPath);
  const arrOfDifference = diff(objBefore, objAfter);
  return format === 'nested' ? nested(arrOfDifference) : format === 'plain' ? plain(arrOfDifference) : json(arrOfDifference);
}

export default gendiff;
