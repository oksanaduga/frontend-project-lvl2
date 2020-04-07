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

const removeOrAdd = (sign, value) => `${signMap[sign]}${sign === '-' ? '' : typeValue(value)}`;

const change = (arr, i) => {
  const deleteValue = arr[i + 1].value;
  const addValue = arr[i].value;
  return ` was changed from ${typeValue(deleteValue)} to ${typeValue(addValue)}`;
};

const plain = (diff) => {
  const iter = (arr, nestedKey, accum) => arr.reduce((acc, { sign, key, value }, i) => {
    let newAcc = acc;
    if (sign === undefined && isArray(value)) {
      const newNestedKey = `${nestedKey}${key}.`;
      return iter(value, newNestedKey, acc);
    }
    if (arr[i + 1] !== undefined && arr[i + 1].key === key) {
      newAcc = `${acc}Property '${nestedKey}${key}'${change(arr, i)}\n`;
    } else if (sign !== undefined && acc.indexOf(key) === -1) {
      newAcc = `${acc}Property '${nestedKey}${key}'${removeOrAdd(sign, value)}\n`;
    }
    return newAcc;
  }, accum);
  return iter(diff, '', '');
};

export default plain;
