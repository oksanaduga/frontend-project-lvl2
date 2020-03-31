import gendiff from '../src/index.js';
import fs from 'fs';

const path = __dirname;

test.each([
  [`${path}/fixtures/beforeNested.json`, `${path}/fixtures/afterNested.json`,
    fs.readFileSync(`${path}/fixtures/jsonFormat.txt`, 'utf-8')],
  [`${path}/fixtures/beforeNested.yml`, `${path}/fixtures/afterNested.yml`,
    fs.readFileSync(`${path}/fixtures/jsonFormat.txt`, 'utf-8')],
  [`${path}/fixtures/beforeNested.ini`, `${path}/fixtures/afterNested.ini`,
    fs.readFileSync(`${path}/fixtures/jsonFormatIni.txt`, 'utf-8')],
])('gendiff(%s, %s)', (a, b, expected) => {
  expect(gendiff(a, b)).toBe(expected);
});
