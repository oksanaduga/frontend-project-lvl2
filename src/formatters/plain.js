import { isPlainObject, has } from 'lodash';

const formatValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  return value;
};


const isRemove = (node) => !has(node, 'children')
                            && !has(node, 'to');
const isAdd = (node) => !has(node, 'children')
                         && !has(node, 'from');
const isHaveChildren = (node) => has(node, 'children');


const plain = (diffTree) => {
  const iter = (tree, currentKey = '') => {
    const output = tree.reduce((acc, node) => {
      const { settingName, from, to } = node;
      if (isRemove(node)) {
        const description = `Property '${currentKey}${settingName}' was deleted`;
        return [...acc, description];
      }
      if (isAdd(node)) {
        const descriptionValue = formatValue(to);
        const description = `Property '${currentKey}${settingName}' was added with value: ${descriptionValue}`;
        return [...acc, description];
      }
      if (isHaveChildren(node)) {
        const currentK = `${currentKey}${settingName}.`;
        return [...acc, iter(node.children, currentK)];
      }
      if (from === to) {
        return acc;
      }
      const descriptionValueFrom = formatValue(from);
      const descriptionValueTo = formatValue(to);
      const description = `Property '${currentKey}${settingName}' was changed from ${descriptionValueFrom} to ${descriptionValueTo}`;
      return [...acc, description];
    }, []);
    return output.join('\n');
  };
  return `${iter(diffTree)}\n`;
};

export default plain;
