import { isPlainObject } from 'lodash';

const formatValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (diffTree) => {
  const iter = (diff, currentKey = '') => {
    const outputLines = diff.flatMap((node) => {
      const {
        settingName,
        type,
        from,
        to,
        children,
      } = node;
      const line = `Property '${currentKey}${settingName}'`;
      switch (type) {
        case 'added':
          return `${line} was added with value: ${formatValue(to)}`;
        case 'removed':
          return `${line} was deleted`;
        case 'change':
          return `${line} was changed from ${formatValue(from)} to ${formatValue(to)}`;
        case 'scope':
          return iter(children, `${currentKey}${settingName}.`);
        case 'notChange':
          return null;
        default:
          throw new Error(`Unknown type date: '${type}'!`);
      }
    });
    return outputLines;
  };
  const lineFlatten = iter(diffTree);
  const output = lineFlatten.filter((el) => el !== null);
  return output.join('\n');
};

export default plain;
