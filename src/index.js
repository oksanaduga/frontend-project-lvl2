#!/usr/bin/env node

import parse from './parsers';
import diff from './diff';
import render from './render'

const gendiff = (beforePath, afterPath) => {
  const objBefore = parse(beforePath);
  const objAfter = parse(afterPath);
  const arrOfDifference = diff(objBefore, objAfter);
  return render(arrOfDifference);
}

export default gendiff;
