import gendiff from '../src/index.js';
import fs from 'fs';

const path = __dirname;

test.each([
  [`${path}/fixtures/beforeNested.json`, `${path}/fixtures/afterNested.json`, 'nested',
    fs.readFileSync(`${path}/fixtures/nestedFormat.txt`, 'utf-8')],
  [`${path}/fixtures/beforeNested.yml`, `${path}/fixtures/afterNested.yml`, 'nested',
  fs.readFileSync(`${path}/fixtures/nestedFormat.txt`, 'utf-8')],
  [`${path}/fixtures/beforeNested.ini`, `${path}/fixtures/afterNested.ini`, 'nested',
    fs.readFileSync(`${path}/fixtures/nestedFormatIni.txt`, 'utf-8')],
])('gendiff(%s, %s, %s)', (a, b, c, expected) => {
  expect(gendiff(a, b, c)).toBe(expected);
});
