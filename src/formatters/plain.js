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

const addString = (res) => `${res}\n`;

const plain = (diffTree) => {
  const iter = (diff, currentKey = '') => {
    const outputArr = diff.reduce((acc, node) => {
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
          return [...acc, `${line} was added with value: ${formatValue(to)}`];
        case 'removed':
          return [...acc, `${line} was deleted`];
        case 'change':
          return [...acc, `${line} was changed from ${formatValue(from)} to ${formatValue(to)}`];
        case 'scope':
          return [...acc, iter(children, `${currentKey}${settingName}.`)];
        default:
          return acc;
      }
    }, []);
    const outputStr = outputArr.join('\n');
    return outputStr;
  };
  return addString(iter(diffTree));
};

export default plain;
