import { isPlainObject, flattenDeep } from 'lodash';

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
    const outputLines = diff.map((node) => {
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
          return '';
        default:
          return null;
      }
    });
    return outputLines;
  };
  const lineFlatten = flattenDeep(iter(diffTree));
  const output = lineFlatten.filter((el) => el !== '');
  return output.join('\n');
};

export default plain;
