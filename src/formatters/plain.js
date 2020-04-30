import {
  compact, template, isPlainObject, has,
} from 'lodash';

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

const buildChangeRecord = (diff, settingName) => {
  let action; let from; let to;

  if (diff.description === 'change') {
    action = 'changed';
    from = formatValue(diff.from);
    to = formatValue(diff.to);
  } else if (diff.description === 'delete') {
    action = 'deleted';
  } else {
    action = 'added';
    to = formatValue(diff.value);
  }
  return templates[action]({ settingName, from, to });
};

const plain = (diff) => {
  const renderDiff = (collection, currentKey = '') => collection.reduce((acc, el) => {
    const fullKey = compact([currentKey, el.key]).join('.');
    if (has(el, 'children')) {
      return [...acc, ...renderDiff(el.children, fullKey)];
    }
    if (el.description !== 'not change') {
      const changeRecord = buildChangeRecord(el, fullKey);
      return [...acc, changeRecord];
    }
    return acc;
  }, []);
  return `${renderDiff(diff).join('\n')}\n`;
};

export default plain;
