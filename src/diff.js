import {
  has, isPlainObject, keys, union,
} from 'lodash';

const isAdd = (before, key) => !has(before, key);
const isRemove = (after, key) => !has(after, key);
const isHaveChildren = (before, after, key) => isPlainObject(before[key])
                                               && isPlainObject(after[key]);

const defineType = (key, from, to) => {
  if (isAdd(from, key)) {
    return 'added';
  }
  if (isRemove(to, key)) {
    return 'removed';
  }
  if (isHaveChildren(from, to, key)) {
    return 'scope';
  }
  if (from[key] === to[key]) {
    return 'notChange';
  }
  return 'change';
};

const diff = (configBefore, configAfter) => {
  const settingNames = union(keys(configBefore), keys(configAfter));
  const difference = settingNames.reduce((acc, settingName) => {
    const type = defineType(settingName, configBefore, configAfter);
    return [...acc, {
      settingName,
      type,
      from: configBefore[settingName],
      to: configAfter[settingName],
      children: type === 'scope'
        ? diff(configBefore[settingName], configAfter[settingName])
        : [],
    }];
  }, []);
  return difference;
};

export default diff;


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
