import parse from '../src/parsers.js';
import fs from 'fs';

const path = __dirname;
const beforeObject = JSON.parse(fs.readFileSync(`${path}/fixtures/beforeObject.json`, 'utf8'));
const beforeObjectAfterFormatIni = JSON.parse(fs.readFileSync(`${path}/fixtures/beforeObjectAfterFormatIni.json`, 'utf8'));

test.each([
  [`${path}/fixtures/before.json`,
    {
      host: "hexlet.io",
      timeout: 50,
      proxy: "123.234.53.22",
      follow: false
    }],
  [`${path}/fixtures/before.yml`,
    {
      host: "hexlet.io",
      timeout: 50,
      proxy: 123,
      follow: false
    }],
  [`${path}/fixtures/before.ini`,
    {
      host: "hexlet.io",
      timeout: "50",
      proxy: "123",
      follow: false
    }],
    [`${path}/fixtures/beforeNested.json`, beforeObject],
    [`${path}/fixtures/beforeNested.yml`, beforeObject],
    [`${path}/fixtures/beforeNested.ini`, beforeObjectAfterFormatIni],
])('.add(%s, %o)', (a, expected) => {
  expect(parse(a)).toStrictEqual(expected);
});
