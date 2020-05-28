import has from 'lodash';
import plain from './plain';
import json from './json';
import objectFormatter from './objectFormatter';

const formatters = {
  plain,
  json,
  object: objectFormatter,
};

const formatOutput = (formatName) => {
  if (!has(formatters, formatName)) {
    throw new Error('Unknown format: accept "plain", "object", "json"');
  }
  const formatter = formatters[formatName];
  return formatter;
};

export default formatOutput;
