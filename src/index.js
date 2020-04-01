#!/usr/bin/env node

import parse from './parsers';
import diff from './diff';
import { plain, json } from './formatters';

const gendiff = (beforePath, afterPath, format = 'json') => {
  const objBefore = parse(beforePath);
  const objAfter = parse(afterPath);
  const arrOfDifference = diff(objBefore, objAfter);
  return format === 'json' ? json(arrOfDifference) : plain(arrOfDifference);
}

export default gendiff;
