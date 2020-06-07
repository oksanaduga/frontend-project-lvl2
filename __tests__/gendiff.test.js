import fs from 'fs';
import path from 'path';
import gendiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const addString = (a) => `${a}\n`;


test.each([
  ['beforeNested.json', 'afterNested.json', 'json',
    'jsonFormat.json'],
  ['beforeNested.yml', 'afterNested.yml', 'plain',
    'plainFormat.txt'],
  ['beforeNested.ini', 'afterNested.ini', 'object',
    'nestedFormat.txt'],
])('gendiff(%o, %o, %s, %s)', (from, to, format, pathToFile) => {
  const fromPath = getFixturePath(from);
  const toPath = getFixturePath(to);
  const expected = readFile(pathToFile, 'utf8');
  expect(addString(gendiff(fromPath, toPath, format))).toBe(expected);
});
