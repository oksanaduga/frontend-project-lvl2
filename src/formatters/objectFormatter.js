import { isPlainObject, keys, values } from 'lodash';

const generateValueOutput = (value, indent) => {
  if (!isPlainObject(value)) {
    return value;
  }
  const output = `{\n${indent}      ${keys(value)}: ${values(value)}\n${indent}  }`;
  return output;
};

const formatObject = (diffTree) => {
  const iter = (diff, depth = 1) => {
    const indent = ' '.repeat((depth * 2) + (depth - 1) * 2);
    const output = diff.map((node) => {
      const {
        settingName,
        type,
        from,
        to,
        children,
      } = node;
      const lineForming = {
        removed: () => `${indent}- ${settingName}: ${generateValueOutput(from, indent)}`,
        added: () => `${indent}+ ${settingName}: ${generateValueOutput(to, indent)}`,
        change: () => `${indent}- ${settingName}: ${generateValueOutput(from, indent)}\n${indent}+ ${settingName}: ${generateValueOutput(to, indent)}`,
        notChange: () => `${indent}  ${settingName}: ${generateValueOutput(to, indent)}`,
        scope: () => `${indent}  ${settingName}: {\n${iter(children, depth + 1)}\n${indent}  }`,
      };
      return lineForming[type]();
    });
    return output.join('\n');
  };
  return `{\n${iter(diffTree)}\n}`;
};

export default formatObject;
