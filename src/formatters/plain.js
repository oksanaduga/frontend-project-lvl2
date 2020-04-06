import { isPlainObject, isArray } from 'lodash';

const typeValue = (val) => {
  if (isPlainObject(val)) {
    return '[complex value]';
  } if (typeof (val) === 'string') {
    return `'${val}'`;
  }
  return val;
};

const signMap = { '-': ' was deleted', '+': ' was added with value: ' };

const plain = (diff) => {
  const iter = (arr, nestedKey, accum) => arr.reduce((acc, { sign, key, value }, i) => {
    let property = '';
    let content = '';
    let phrase = '';
    let newAcc = acc;

    if (sign === undefined && isArray(value)) {
      const newNestedKey = `${nestedKey}${key}.`;
      return iter(value, newNestedKey, acc);
    } if (arr[i + 1] !== undefined && arr[i + 1].key === key) {
      property = `${nestedKey}${key}`;
      phrase = ' was changed from ';
      content = `${typeValue(arr[i + 1].value)} to ${typeValue(value)}`;
      newAcc = `${acc}Property '${property}'${phrase}${content}\n`;
    } else if (sign !== undefined && acc.indexOf(key) === -1) {
      property = `${nestedKey}${key}`;
      phrase = signMap[sign];
      content = sign === '-' ? '' : typeValue(value);
      newAcc = `${acc}Property '${property}'${phrase}${content}\n`;
    }
    return newAcc;
  }, accum);
  return iter(diff, '', '');
};

export default plain;
