import diff from '../src/index.js';

test('diff', () => {
  const path = __dirname;
  const beforeJson = `${path}/fixtures/before.json`;
  const afterJson = `${path}/fixtures/after.json`;
  expect(diff(beforeJson, afterJson)).toEqual("{\n   host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n}");
});

test('diff', () => {
  const path = __dirname;
  const beforeYml = `${path}/fixtures/before2.yml`;
  const afterYml = `${path}/fixtures/after2.yml`;
  expect(diff(beforeYml, afterYml)).toEqual("{\n   host: hexlet.io\n + timeout: 20\n - timeout: 50\n - proxy: 123\n - follow: false\n + verbose: true\n}");
});
