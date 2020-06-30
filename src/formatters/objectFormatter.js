import { isPlainObject, keys, values } from 'lodash';

const determineValueType = (value, indent) => {
  if (!isPlainObject(value)) {
    return value;
  }
  const output = `{\n${indent}      ${keys(value)}: ${values(value)}\n${indent}  }`;
  return output;
};

const objectFormatter = (diffTree) => {
  const iter = (diff, depth = 1) => {
    const indent = ' '.repeat((depth * 2) + (depth - 1) * 2);
    const closeIndent = ' '.repeat((depth * 2) + (depth - 1) * 2 + 2);
    const output = diff.map((node) => {
      const {
        settingName,
        type,
        from,
        to,
        children,
      } = node;
      const lineForming = {
        removed: () => `${indent}- ${settingName}: ${determineValueType(from, indent)}`,
        added: () => `${indent}+ ${settingName}: ${determineValueType(to, indent)}`,
        change: () => `${indent}- ${settingName}: ${determineValueType(from, indent)}\n${indent}+ ${settingName}: ${determineValueType(to, indent)}`,
        notChange: () => `${indent}  ${settingName}: ${determineValueType(to, indent)}`,
        scope: () => `${indent}  ${settingName}: {\n${iter(children, depth + 1)}\n${closeIndent}}`,
      };
      return lineForming[type]();
    });
    return output.join('\n');
  };
  return `{\n${iter(diffTree)}\n}`;
};

export default objectFormatter;
