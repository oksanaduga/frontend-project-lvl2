#!/usr/bin/env node

import { has } from 'lodash';
import parse from './parsers.js';

const diff = (beforePath, afterPath) => {
  const objBefore = parse(beforePath);
  const objAfter = parse(afterPath);

  let acc = {};
  const newObj = { ...objBefore, ...objAfter };
  const arrOfKeys = Object.keys(newObj);
  for (let key of arrOfKeys) {
    if(has(objBefore, [key]) && has(objAfter, [key])) {
      if (objBefore[key] === objAfter[key]) {
        acc = { ...acc, { sign: "   ", key: key, value: objAfter[key] } };
      } else {
        acc = { ...acc, { "sign": " + ", "key": key, "value": objAfter[key]}, { "sign": " - ", "key": key, "value": objBefore[key]} };
      }
  } else if (has(objBefore, [key])) {
      acc = { ...acc, { "sign": " - ", "key": key, "value": objBefore[key]} };
    } else {
      acc = { ...acc, { "sign": " + ", "key": key, "value": objAfter[key]} };
    }
  }
  return acc;
  }

export default diff;
