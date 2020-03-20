#!/usr/bin/env node

import { has } from 'lodash';
import parse from '../src/parsers.js';



const diff = (beforePath, afterPath) => {
  const objBefore = parse(beforePath);
  const objAfter = parse(afterPath);

  let acc = "";
  const newObj = { ...objBefore, ...objAfter };
  const arrOfKeys = Object.keys(newObj);
  for (let key of arrOfKeys) {
    if(has(objBefore, [key]) && has(objAfter, [key])) {
      if (objBefore[key] === objAfter[key]) {
        acc += `\n   ${[key]}: ${objAfter[key]}`;
      } else {
        acc += `\n + ${[key]}: ${objAfter[key]}\n - ${[key]}: ${objBefore[key]}`;
      }
  } else if (has(objBefore, [key])) {
      acc += `\n - ${[key]}: ${objBefore[key]}`;
    } else {
      acc += `\n + ${[key]}: ${objAfter[key]}`;
    }
  }
  return `{${acc}\n}`;
  }

export default diff;
