import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import has from 'lodash';

const formatFromPath = (path) => {
  const defineIndexForFormat = path.lastIndexOf('.') + 1;
  const nameFormat = path.substr(defineIndexForFormat);
  return nameFormat;
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getParsers = (format, content) => {
  if (!has(parsers, format)) {
    throw new Error('Unknown format: accept "plain", "nested", "json"');
  }
  return parsers[format](content);
};

const parse = (pathToFile) => {
  const contentFromPath = fs.readFileSync(pathToFile, 'utf-8');
  const format = formatFromPath(pathToFile);
  return getParsers(format, contentFromPath);
};

export default parse;
