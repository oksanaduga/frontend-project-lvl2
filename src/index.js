import fs from 'fs';
import path from 'path';
import parse from './parse';
import genDiff from './genDiff';
import getformatOutput from './formatters/index.js';

const getFormat = (pathToFile) => {
  const cropLine = path.extname(pathToFile);
  const format = cropLine.substring(1);
  return format;
};

const readContent = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const gendiff = (fromPath, toPath, form = 'json') => {
  const contentFrom = readContent(fromPath);
  const contentTo = readContent(toPath);
  const formatContentFrom = getFormat(fromPath);
  const formatContentTo = getFormat(toPath);
  const configBefore = parse(contentFrom, formatContentFrom);
  const configAfter = parse(contentTo, formatContentTo);
  const difference = genDiff(configBefore, configAfter);
  const format = getformatOutput(form);
  return format(difference);
};

export default gendiff;
