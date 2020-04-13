import fs from 'fs';
import path from 'path';
import gendiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


test.each([
  ['beforeNested.json', 'afterNested.json', 'json',
    'jsonFormat.json'],
  ['beforeNested.yml', 'afterNested.yml', 'plain',
    'plainFormat.txt'],
  ['beforeNested.ini', 'afterNested.ini', 'nested',
    'nestedFormatIni.txt'],
])('gendiff(%o, %o, %s, %s)', (before, after, format, pathToFile) => {
  const beforePath = getFixturePath(before);
  const afterPath = getFixturePath(after);
  const expected = readFile(pathToFile, 'utf8');
  expect(gendiff(beforePath, afterPath, format)).toBe(expected);
});
