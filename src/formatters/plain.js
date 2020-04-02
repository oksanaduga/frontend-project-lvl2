import { isPlainObject, isArray } from 'lodash';

const typeValue = (val) => {
  if (isPlainObject(val)) {
    return "[complex value]"
  } else if (typeof(val) === 'string') {
    return `'${val}'`;
  } else {
    return val;
  }
};

const signMap = { '-': ' was deleted', '+': ' was added with value: ' };

const plain = (diff) => {
  const iter = (arr, nestedKey, accum) => {

    return arr.reduce((acc, el, i) => {
      const { sign, key, value } = el;
      let property = '';
      let content = '';
      let phrase = '';

      if (sign === undefined && isArray(value)) {
        const newNestedKey = `${nestedKey}${key}.`;
        return iter(value, newNestedKey, acc);

      } else if (arr[i + 1] !== undefined && arr[i + 1].key === key) {
         property = `${nestedKey}${key}`;
         phrase = ' was changed from ';
         let valueDelete = arr[i + 1].value;
         let valueAdd = value;
         content = `${typeValue(valueDelete)} to ${typeValue(valueAdd)}`;
         acc = `${acc}Property '${property}'${phrase}${content}\n`;

      } else if (sign !== undefined) {
        if (acc.match(key)) {
          acc;

        } else {
          property = `${nestedKey}${key}`;
          phrase = signMap[sign];
          content = sign === '-' ? '' : typeValue(value);
          acc = `${acc}Property '${property}'${phrase}${content}\n`;
        }
      }
      return acc;
    }, accum);
  }
  return iter(diff, '', '');
};

export default plain;
