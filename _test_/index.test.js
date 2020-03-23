import diff from '../src/index.js';
import each from 'jest-each';

const path = __dirname;

test.each([
  [`${path}/fixtures/before.json`, `${path}/fixtures/after.json`,
    '{\n   host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}'],
  [`${path}/fixtures/before2.yml`, `${path}/fixtures/after2.yml`,
    '{\n   host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123\n - follow: false\n + verbose: true\n}'],
  [`${path}/fixtures/before3.ini`, `${path}/fixtures/after3.ini`,
    '{\n   host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123\n - follow: false\n + verbose: true\n}'],
])('.add(%s, %s)', (a, b, expected) => {
  expect(diff(a, b)).toBe(expected);
});
