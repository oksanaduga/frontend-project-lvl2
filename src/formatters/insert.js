import { isPlainObject, isArray, reduce } from 'lodash';

const insert = (diff) => {
  const iter = (collection, depth) => collection.reduce((acc, { key, value, sign }) => {
    // indent is 2 spaces each depth lvl
    // and 2 spaces for the sign each depth lvl
    const indent = (depth * 2) + (depth - 1) * 2;
    const spaces = ' '.repeat(indent);
    const signSymbol = sign === undefined ? ' ' : sign;
    let outputLine = '';

    if (isArray(value)) {
      const lines = iter(value, depth + 1);
      outputLine = `{\n${lines}${spaces}  }`;
    } else if (isPlainObject(value)) {
      const endingSpaces = ' '.repeat(indent + 2);

      const keyValueLines = reduce(value, (objAcc, v, k) => {
        const objSpaces = ' '.repeat(indent + 6);
        return `${objAcc}${objSpaces}${k}: ${v}\n`;
      }, '');

      outputLine = `{\n${keyValueLines}${endingSpaces}}`;
    } else {
      outputLine = value;
    }

    return `${acc}${spaces}${signSymbol} ${key}: ${outputLine}\n`;
  }, '');

  return `{\n${iter(diff, 1)}}\n`;
};

export default insert;
