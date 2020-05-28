import fs from 'fs';
import path from 'path';
import parse from './parse';
import genDiff from './genDiff';
import formatOutput from './formatters/index.js';

const defineFormat = (pathToFile) => {
  const cropLine = path.extname(pathToFile);
  const format = cropLine.substring(1);
  return format;
};

const readContent = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const gendiff = (fromPath, toPath, format = 'json') => {
  const contentFrom = readContent(fromPath);
  const contentTo = readContent(toPath);
  const formatContentFrom = defineFormat(fromPath);
  const formatContentTo = defineFormat(toPath);
  const configBefore = parse(contentFrom, formatContentFrom);
  const configAfter = parse(contentTo, formatContentTo);
  const difference = genDiff(configBefore, configAfter);
  const formatter = formatOutput(format);
  return `${formatter(difference)}\n`;
};

export default gendiff;
