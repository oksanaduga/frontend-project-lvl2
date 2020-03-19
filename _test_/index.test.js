import diff from '../src/index.js';

test('diff', () => {
  const path = __dirname;
  const before = `${path}/fixtures/before.json`;
  const after = `${path}/fixtures/after.json`;
  expect(diff(before, after)).toEqual("{\n   host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}");
});
