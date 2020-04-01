import { isPlainObject, isArray, reduce, flattenDeep, uniq, join } from 'lodash';


const typeValue = (val) => {
  if (isPlainObject(val)) {
    return "[complex value]"
  } else if (typeof(val) === 'string') {
    return `\'${val}\'`;
  } else {
    return val;
  }
};

const signMap = { '-': ' was deleted', '+': ' was added with value: ' };


const plain = (diff) => {

  const iter = (arr, depth, nestedKey, accum) => {

    const result = arr.reduce((acc, { sign, key, value }) => {
      let property = '';
      let content = '';
      let phrase = '';
      let keyFilter = arr.filter((obj) => obj.key === key && obj.sign !== undefined);

      if (sign === undefined && isArray(value)) {
        const newDepth = depth + 1;
        nestedKey.push(key);
        return iter(value, newDepth,nestedKey, acc);

      }
      if (keyFilter.length === 1) {
          const currentNestedKey = nestedKey.slice(0, depth).join('.');
          property = `${currentNestedKey}.${key}`;
          phrase = signMap[sign];
          content = sign === '-' ? '' : typeValue(value);
          acc = [...acc, [`Property '${property}\'${phrase}${content}\n`]];


      } else if (keyFilter.length === 2) {
        const currentNestedKey = nestedKey.slice(0, depth).join('.');
        property = `${currentNestedKey}.${key}`;
        phrase = ' was changed from ';
        let valueDelete = keyFilter.filter((obj) => obj.sign === '-' && obj.key === key)[0];
        let valueAdd = keyFilter.filter((obj) => obj.sign === '+' && obj.key === key)[0];
        content = `${typeValue(valueDelete.value)} to ${typeValue(valueAdd.value)}`;
        acc = [...acc, [`Property '${property}\'${phrase}${content}\n`]];
      }

      return uniq(flattenDeep(acc));
    }, accum);

    return result;

  }
  return iter(diff, 0, [], []).join('');
};

export default plain;
