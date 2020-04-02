import gendiff from '../src/index.js';
import fs from 'fs';

const path = __dirname;

test.each([
  [`/fixtures/beforeNested.json`, `/fixtures/afterNested.json`, 'nested',
    `${path}/fixtures/nestedFormat.txt`, 'utf-8'],
  [`/fixtures/beforeNested.yml`, `/fixtures/afterNested.yml`, 'nested',
    `${path}/fixtures/nestedFormat.txt`, 'utf-8'],
  [`/fixtures/beforeNested.ini`, `/fixtures/afterNested.ini`, 'nested',
    `${path}/fixtures/nestedFormatIni.txt`, 'utf-8'],
])('gendiff(%s, %s, %s)', (a, b, format, pathToFile) => {
    const fileA = `${path}${a}`;
    const fileB = `${path}${b}`;
    const expected = fs.readFileSync(pathToFile, 'utf8');

  expect(gendiff(fileA, fileB, format)).toBe(expected);
});
