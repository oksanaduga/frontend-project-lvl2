import {
  has, isPlainObject, union, keys, flatten,
} from 'lodash';


const change = (key, addValue, removeValue) => {
  const nodesChange = [{ sign: '+', key, value: addValue },
    { sign: '-', key, value: removeValue },
  ];
  return nodesChange;
};
const add = (key, value) => ({ sign: '+', key, value });

const remove = (key, value) => ({ sign: '-', key, value });

const notChanged = (key, value) => ({ key, value });

const diffFromTwo = (key, from, to, findNestedDiff) => {
  const nestedDiff = findNestedDiff(from, to);
  return notChanged(key, nestedDiff);
};

const isNodeAdd = (from, to, key) => has(to, key) && !has(from, key);

const isNodeDelete = (from, to, key) => has(from, key) && !has(to, key);

const isNodeChange = (from, to, key) => (has(to, key) && has(from, key))
  && (to[key] !== from[key]);

const isNodeHaveChildren = (from, to, key) => isPlainObject(from[key])
&& isPlainObject(to[key]);


const diff = (objBefore, objAfter) => {
  const uniqKeys = union(keys(objBefore), keys(objAfter));
  const difference = uniqKeys.map((key) => {
    if (isNodeHaveChildren(objBefore, objAfter, key)) {
      return [diffFromTwo(key, objBefore[key], objAfter[key], diff)];
    }
    if (isNodeChange(objBefore, objAfter, key)) {
      return flatten(change(key, objAfter[key], objBefore[key]));
    }
    if (isNodeAdd(objBefore, objAfter, key)) {
      return [add(key, objAfter[key])];
    }
    if (isNodeDelete(objBefore, objAfter, key)) {
      return [remove(key, objBefore[key])];
    }
    return notChanged(key, objAfter[key]);
  });
  return flatten(difference);
};


export default diff;
