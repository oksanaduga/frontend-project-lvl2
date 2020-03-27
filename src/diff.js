#!/usr/bin/env node

import { has, isPlainObject } from 'lodash';

const diff = (objBefore, objAfter) => {
  const arrOfKeys = Object.keys({ ...objBefore, ...objAfter });
  let accum = [];

  return arrOfKeys.reduce((acc, key) => {
    if(has(objBefore, [key]) && has(objAfter, [key])) {
      if(isPlainObject(objBefore[key]) && isPlainObject(objAfter[key])) {
        acc = [...acc, { key: key, value: diff(objBefore[key], objAfter[key]) } ];
      } else if (objBefore[key] === objAfter[key]) {
        acc = [...acc, { key: key, value: objAfter[key] } ];
      } else {
        acc = [
          ...acc,
          { sign: "+", key: key, value: objAfter[key] },
          { sign: "-", key: key, value: objBefore[key] }
        ];
      }
    } else if (has(objBefore, [key])) {
      acc = [ ...acc, { sign: "-", key: key, value: objBefore[key]} ];
    } else {
      acc = [ ...acc, { sign: "+", key: key, value: objAfter[key]} ];
    }
    return acc;
  }, accum);

};

export default diff;
