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


/*
функция принимает дерево различий имеющее вид

[
  { settingName: 'k', from: 'fwe', to: false },
  { settingName: 'l', to: 123 },
  { settingName: 'k', from: { n: 'fsdf' }, to: 'we' },
  { settingName: 'k', children: [
    { settingName: 'qw', from: 3, to: 'rwg' },
  ] },
]

и выводит строковое описание каждой ноды
имя настройки - действие (состояние) - содержание
Property 'common.setting2' was deleted
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false

*/


export default plain;
