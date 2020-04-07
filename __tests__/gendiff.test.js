import fs from 'fs';
import gendiff from '../src/index';

const path = __dirname;

test.each([
  [`${path}/fixtures/beforeNested.json`, `${path}/fixtures/afterNested.json`, 'json',
    `${path}/fixtures/jsonFormat.json`],
  [`${path}/fixtures/beforeNested.yml`, `${path}/fixtures/afterNested.yml`, 'plain',
    `${path}/fixtures/plainFormat.txt`],
  [`${path}/fixtures/beforeNested.ini`, `${path}/fixtures/afterNested.ini`, 'nested',
    `${path}/fixtures/nestedFormatIni.txt`],
])('gendiff(%o, %o, %s, %s)', (before, after, format, pathToFile) => {
  const expected = fs.readFileSync(pathToFile, 'utf8');
  expect(gendiff(before, after, format)).toBe(expected);
});
