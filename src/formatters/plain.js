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
          return `${line} was added with value: ${formatValue(to)}\n`;
        case 'removed':
          return `${line} was deleted\n`;
        case 'change':
          return `${line} was changed from ${formatValue(from)} to ${formatValue(to)}\n`;
        default:
          return iter(children, `${currentKey}${settingName}.`);
      }
    });
    return outputLines.join('');
  };
  const output = iter(diffTree);
  return output.trim();
};

export default plain;
