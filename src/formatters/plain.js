import {
  isArray, groupBy, compact, template, isPlainObject,
} from 'lodash';

const getUniqKeys = (diff) => {
  const set = new Set(diff.map(({ key }) => key));
  return Array.from(set);
};

const isChanged = (diffs) => diffs.some(({ description }) => description);
// const hasNestedDiff = (diffs) => diffs.some(({ value }) => isArray(value));
const hasNestedDiff = (diffs) => diffs.some(({ children }) => children !== undefined);

const templates = {
  changed: template("Property '<%= settingName %>' was changed from <%= from %> to <%= to %>"),
  added: template("Property '<%= settingName %>' was added with value: <%= to %>"),
  deleted: template("Property '<%= settingName %>' was deleted"),
};

const formatValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  return value;
};

const buildChangeRecord = (diffs, settingName) => {
  let action; let from; let to;

  if (diffs.length > 1) {
    action = 'changed';
    diffs.forEach(({ description, value }) => {
      if (description === '-') {
        from = formatValue(value);
      } else {
        to = formatValue(value);
      }
    });
  } else if (diffs[0].description === '-') {
    action = 'deleted';
  } else {
    action = 'added';
    to = formatValue(diffs[0].value);
  }

  return templates[action]({ settingName, from, to });
};

const plain = (diff) => {
  const renderDiff = (collection, currentKey = '') => {
    const keys = getUniqKeys(collection);
    const diffByKey = groupBy(collection, ({ key }) => key);

    return keys.reduce((acc, key) => {
      const diffs = diffByKey[key];
      const fullKey = compact([currentKey, key]).join('.');

      if (isChanged(diffs)) {
        const changeRecord = buildChangeRecord(diffs, fullKey);
        return [...acc, changeRecord];
      }

      if (hasNestedDiff(diffs)) {
        return [...acc, ...renderDiff(diffs[0].children, fullKey)];
      }

      return acc;
    }, []);
  };

  return `${renderDiff(diff).join('\n')}\n`;
};

export default plain;
