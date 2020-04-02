import parse from '../src/parsers.js';
import fs from 'fs';

const path = __dirname;
const beforeObject = JSON.parse(fs.readFileSync(`${path}/fixtures/beforeObject.json`, 'utf8'));
const beforeObjectAfterFormatIni = JSON.parse(fs.readFileSync(`${path}/fixtures/beforeObjectAfterFormatIni.json`, 'utf8'));



test.each([
    [`/fixtures/beforeNested.json`, beforeObject],
    [`/fixtures/beforeNested.yml`, beforeObject],
    [`/fixtures/beforeNested.ini`, beforeObjectAfterFormatIni],
])('parse(%s, %o)', (a, expected) => {
  const actual = `${path}${a}`;
  expect(parse(actual)).toStrictEqual(expected);
});
