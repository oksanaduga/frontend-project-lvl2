import { has, isPlainObject } from 'lodash';

const changed = (key, from, to) => [
  { sign: '+', key, value: to },
  { sign: '-', key, value: from },
];

const add = (key, value) => ({ sign: '+', key, value });
const remove = (key, value) => ({ sign: '-', key, value });
const notChanged = (key, value) => ({ key, value });

const diffFromTwo = (key, from, to, findNestedDiff) => {
  if (isPlainObject(from) && isPlainObject(to)) {
    const nestedDiff = findNestedDiff(from, to);
    return [notChanged(key, nestedDiff)];
  }
  if (from === to) {
    return [notChanged(key, to)];
  }
  return changed(key, from, to);
};

const diffFromOne = (key, from, to) => (from ? remove(key, from) : add(key, to));

const diff = (objBefore, objAfter) => {
  const arrOfKeys = Object.keys({ ...objBefore, ...objAfter });
  return arrOfKeys.reduce((acc, key) => {
    if (has(objBefore, key) && has(objAfter, key)) {
      return [...acc, ...diffFromTwo(key, objBefore[key], objAfter[key], diff)];
    }
    return [...acc, diffFromOne(key, objBefore[key], objAfter[key])];
  }, []);
};

export default diff;
