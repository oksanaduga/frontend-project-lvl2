import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import has from 'lodash';


const defineFormat = (pathToFile) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  const format = path.extname(pathToFile);
  const defineFormatOfParse = parsers[format];
  if (!has(parsers, format)) {
    throw new Error('Unknown format: accept "plain", "insert", "json"');
  }
  return defineFormatOfParse;
};

const readContent = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const parse = (content, format) => {
  const parseInFormat = format(content);
  return parseInFormat;
};

export { defineFormat, readContent, parse };
