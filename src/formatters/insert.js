import {
  isPlainObject, isArray, has, reduce,
} from 'lodash';


const defineSign = (description) => {
  const descriptionSign = {
    add: '+', delete: '-', change: ['-', '+'], 'not change': ' ',
  };
  return descriptionSign[description];
};

const buildValue = (value, indent) => {
  if (isPlainObject(value)) {
    const endingSpaces = ' '.repeat(indent + 2);

    const keyValueLines = reduce(value, (objAcc, v, k) => {
      const objSpaces = ' '.repeat(indent + 6);
      return `${objAcc}${objSpaces}${k}: ${v}\n`;
    }, '');
    return `{\n${keyValueLines}${endingSpaces}}`;
  }
  return value;
};

const insert = (diff) => {
  const iter = (collection, depth) => collection.reduce((acc, el) => {
    // indent is 2 spaces each depth lvl
    // and 2 spaces for the description each depth lvl
    const { key, description } = el;
    const indent = (depth * 2) + (depth - 1) * 2;
    const spaces = ' '.repeat(indent);
    const descriptionSymbol = defineSign(description) === undefined
      ? ' '
      : defineSign(description);
    let outputLine = '';
    if (has(el, 'children')) {
      const lines = iter(el.children, depth + 1);
      const all = `${spaces}${descriptionSymbol} ${key}: `;
      outputLine = `${all}{\n${lines}${spaces}  }\n`;
    } else if (isArray(descriptionSymbol)) {
      const valueFrom = buildValue(el.from, indent);
      const valueTo = buildValue(el.to, indent);
      const changeFrom = `${spaces}${descriptionSymbol[0]} ${key}: ${valueFrom}`;
      const changeTo = `${spaces}${descriptionSymbol[1]} ${key}: ${valueTo}`;
      outputLine = `${changeFrom}\n${changeTo}\n`;
    } else {
      const value = buildValue(el.value, indent);
      outputLine = `${spaces}${descriptionSymbol} ${key}: ${value}\n`;
    }
    return `${acc}${outputLine}`;
  }, '');
  return `{\n${iter(diff, 1)}}\n`;
};

export default insert;
