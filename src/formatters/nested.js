import { isPlainObject, isArray, reduce } from 'lodash';

const render = diff => {
  const iter = (arr, depth) => {
    return arr.reduce((acc, {key, value, sign}) => {
       // indent is 2 spaces each depth lvl
       // and 2 spaces for the sign each depth lvl
       const indent = (depth * 2) + (depth - 1) * 2;
       const spaces = ' '.repeat(indent);
       const signSym = sign === undefined ? ' ' : sign;
       let valueStr = '';

       if (isArray(value)) {
         const lines = iter(value, depth + 1);
         valueStr = `{\n${lines}${spaces}  }`;
       } else if (isPlainObject(value)) {
         const endingSpaces = ' '.repeat(indent + 2);

         const keyValueLines = reduce(value, (objAcc, v, k) => {
           const objSpaces = ' '.repeat(indent + 6);
           return `${objAcc}${objSpaces}${k}: ${v}\n`
         }, '');

         valueStr = `{\n${keyValueLines}${endingSpaces}}`;
       } else {
         valueStr = value;
       }

       return `${acc}${spaces}${signSym} ${key}: ${valueStr}\n`;
    }, '');
  }

  return `{\n${iter(diff, 1)}}\n`;
};

export default render;
