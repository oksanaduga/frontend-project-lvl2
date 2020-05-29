import {
  has, isPlainObject, keys, union,
} from 'lodash';

const isAdded = (before, key) => !has(before, key);
const isRemoved = (after, key) => !has(after, key);
const hasChildren = (before, after, key) => isPlainObject(before[key])
                                            && isPlainObject(after[key]);
const isntChanged = (before, after, key) => before[key] === after[key];

const genDiff = (configBefore, configAfter) => {
  const settingNames = union(keys(configBefore), keys(configAfter));
  const difference = settingNames.map((settingName) => {
    const node = {
      settingName,
      type: '-',
      from: '-',
      to: '-',
      children: [],
    };
    if (isAdded(configBefore, settingName)) {
      node.type = 'added';
      node.to = configAfter[settingName];
      return node;
    }
    if (isRemoved(configAfter, settingName)) {
      node.type = 'removed';
      node.from = configBefore[settingName];
      return node;
    }
    if (hasChildren(configBefore, configAfter, settingName)) {
      node.type = 'scope';
      node.children = genDiff(configBefore[settingName], configAfter[settingName]);
      return node;
    }
    if (isntChanged(configBefore, configAfter, settingName)) {
      node.type = 'notChange';
      node.from = configBefore[settingName];
      node.to = configAfter[settingName];
      return node;
    }
    node.type = 'change';
    node.from = configBefore[settingName];
    node.to = configAfter[settingName];
    return node;
  });
  return difference;
};

export default genDiff;


/*
нужно сравнить данные
вернуть дерево различий

дано конфигурация из одного файла в виде объекта
конфигурация второго файла в виде объекта

конфигурация имеет вид
{
  k: 'fwe',
  h: 123,
  l: {
    h: true,
    r: 'ewe3',
    ko: {
      qw: 1,
    }
  },
 }

у второй конфигурации такая же структура

дерево возвращает разницу в виде объекта

[
  { settingName: 'k', type: ' notChange', from: 'fwe', to: 'fwe', children: [] },
  { settingName: 'l', type: 'added', to: 123, children: []  },
  { settingName: 'l', type: 'removed', from: 456, children: []  },
  { settingName: 'k', type: 'change', from: { n: 'fsdf' }, to: 'we', children: [] },
  { settingName: 'k', type: 'scope',children: [
    { settingName: 'qw', type: 'setting', from: 3, to: 'rwg' },
  ] },
]
*/
