import {
  has, isPlainObject, union, keys, flatten,
} from 'lodash';

const nodeNestedDisplay = (key, from, to, findNestedDiff) => {
  const nestedDiff = findNestedDiff(from, to);
  return { key, value: nestedDiff };
};

const isNodeAdded = (from, to, key) => has(to, key) && !has(from, key);

const isNodeRemoved = (from, to, key) => has(from, key) && !has(to, key);

const isNodeChanged = (from, to, key) => (has(to, key) && has(from, key))
  && (to[key] !== from[key]);

const isNodeHaveChildren = (from, to, key) => isPlainObject(from[key])
&& isPlainObject(to[key]);


const diff = (objBefore, objAfter) => {
  const uniqKeys = union(keys(objBefore), keys(objAfter));
  const difference = uniqKeys.map((key) => {
    if (isNodeHaveChildren(objBefore, objAfter, key)) {
      return nodeNestedDisplay(key, objBefore[key], objAfter[key], diff);
    }
    if (isNodeChanged(objBefore, objAfter, key)) {
      return [{ sign: '+', key, value: objAfter[key] },
        { sign: '-', key, value: objBefore[key] }];
    }
    if (isNodeAdded(objBefore, objAfter, key)) {
      return { sign: '+', key, value: objAfter[key] };
    }
    if (isNodeRemoved(objBefore, objAfter, key)) {
      return { sign: '-', key, value: objBefore[key] };
    }
    return { key, value: objAfter[key] };
  });
  return flatten(difference);
};


export default diff;
