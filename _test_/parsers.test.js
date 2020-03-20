import parse from '../src/parsers.js';

test('should parse json', () => {
  const path = `${__dirname}/fixtures/before.json`
  const parsedObj = parse(path);
  expect(parsedObj).toEqual({
    host: "hexlet.io",
    timeout: 50,
    proxy: "123.234.53.22",
    follow: false
  })
});

test('should parse yml', () => {
  const path = `${__dirname}/fixtures/before2.yml`
  const parsedObj = parse(path);
  expect(parsedObj).toEqual({
    host: "hexlet.io",
    timeout: 50,
    proxy: 123,
    follow: false
  })
});
