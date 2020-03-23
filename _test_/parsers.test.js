import parse from '../src/parsers.js';

const path = __dirname;

test.each([
  [`${path}/fixtures/before.json`, `${path}/fixtures/after.json`,
    {
      host: "hexlet.io",
      timeout: 50,
      proxy: "123.234.53.22",
      follow: false
    }],
  [`${path}/fixtures/before2.yml`, `${path}/fixtures/after2.yml`,
    {
      host: "hexlet.io",
      timeout: 50,
      proxy: 123,
      follow: false
    }],
  [`${path}/fixtures/before3.ini`, `${path}/fixtures/after3.ini`,
    {
      host: "hexlet.io",
      timeout: "50",
      proxy: "123",
      follow: false
    }],
])('.add(%s, %o)', (a, b, expected) => {
  expect(parse(a, b)).toStrictEqual(expected);
});
