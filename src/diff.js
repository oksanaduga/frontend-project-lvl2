import {
  has, isPlainObject, union, keys,
} from 'lodash';

const nodeNestedDisplay = (key, from, to, findNestedDiff) => {
  const nestedDiff = findNestedDiff(from, to);
  return { key, children: nestedDiff };
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
    if (isNodeAdded(objBefore, objAfter, key)) {
      return { description: 'add', key, value: objAfter[key] };
    }
    if (isNodeRemoved(objBefore, objAfter, key)) {
      return { description: 'delete', key, value: objBefore[key] };
    }
    if (isNodeHaveChildren(objBefore, objAfter, key)) {
      return nodeNestedDisplay(key, objBefore[key], objAfter[key], diff);
    }
    if (isNodeChanged(objBefore, objAfter, key)) {
      return {
        description: 'change', key, from: objBefore[key], to: objAfter[key],
      };
    }
    return { description: 'not change', key, value: objAfter[key] };
  });
  return difference;
};


export default diff;
