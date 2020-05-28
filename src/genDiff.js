import {
  has, isPlainObject, keys, union,
} from 'lodash';

const isAdded = (before, key) => !has(before, key);
const isRemoved = (after, key) => !has(after, key);
const hasChildrenChildren = (before, after, key) => isPlainObject(before[key])
                                               && isPlainObject(after[key]);

const defineType = (key, from, to) => {
  if (isAdded(from, key)) {
    return 'added';
  }
  if (isRemoved(to, key)) {
    return 'removed';
  }
  if (hasChildrenChildren(from, to, key)) {
    return 'scope';
  }
  if (from[key] === to[key]) {
    return 'notChange';
  }
  return 'change';
};

const genDiff = (configBefore, configAfter) => {
  const settingNames = union(keys(configBefore), keys(configAfter));
  const difference = settingNames.map((settingName) => {
    const type = defineType(settingName, configBefore, configAfter);
    const children = type === 'scope'
      ? genDiff(configBefore[settingName], configAfter[settingName])
      : [];
    return {
      settingName,
      type,
      from: configBefore[settingName],
      to: configAfter[settingName],
      children,
    };
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
