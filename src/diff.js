import {
  has, isPlainObject, keys, union,
} from 'lodash';

const isAdd = (before, key) => !has(before, key);
const isRemove = (after, key) => !has(after, key);
const isHaveChildren = (before, after, key) => isPlainObject(before[key])
                                               && isPlainObject(after[key]);

const diff = (configBefore, configAfter) => {
  const settingNames = union(keys(configBefore), keys(configAfter));
  const difference = settingNames.reduce((acc, settingName) => {
    if (isAdd(configBefore, settingName)) {
      return [...acc, { settingName, to: configAfter[settingName] }];
    }
    if (isRemove(configAfter, settingName)) {
      return [...acc, { settingName, from: configBefore[settingName] }];
    }
    if (isHaveChildren(configBefore, configAfter, settingName)) {
      return [
        ...acc,
        {
          settingName,
          children: diff(configBefore[settingName], configAfter[settingName]),
        },
      ];
    }
    return [
      ...acc,
      {
        settingName,
        from: configBefore[settingName],
        to: configAfter[settingName],
      },
    ];
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
  { settingName: 'k', from: 'fwe', to: false },
  { settingName: 'l', to: 123 },
  { settingName: 'k', from: { n: 'fsdf' }, to: 'we' },
  { settingName: 'k', children: [
    { settingName: 'qw', from: 3, to: 'rwg' },
  ] },
]
*/
