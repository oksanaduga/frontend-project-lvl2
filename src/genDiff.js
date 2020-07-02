import {
  has, isPlainObject, keys, union,
} from 'lodash';

const genDiff = (configBefore, configAfter) => {
  const settingNames = union(keys(configBefore), keys(configAfter));
  const difference = settingNames.map((settingName) => {
    if (!has(configBefore, settingName)) {
      const node = {
        settingName,
        type: 'added',
        to: configAfter[settingName],
      };
      return node;
    }
    if (!has(configAfter, settingName)) {
      const node = {
        settingName,
        type: 'removed',
        from: configBefore[settingName],
      };
      return node;
    }
    if (isPlainObject(configBefore[settingName]) && isPlainObject(configAfter[settingName])) {
      const node = {
        settingName,
        type: 'scope',
        children: genDiff(configBefore[settingName], configAfter[settingName]),
      };
      return node;
    }
    if (configBefore[settingName] === configAfter[settingName]) {
      const node = {
        settingName,
        type: 'notChange',
        from: configBefore[settingName],
        to: configAfter[settingName],
      };
      return node;
    }
    const node = {
      settingName,
      type: 'change',
      from: configBefore[settingName],
      to: configAfter[settingName],
    };
    return node;
  });
  return difference;
};

export default genDiff;
