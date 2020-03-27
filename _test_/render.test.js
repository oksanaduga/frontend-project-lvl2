import render from '../src/render';
import fs from 'fs';

const path = __dirname;

test('render(diff)', () => {
  const diff = [
    { key: "host", value: "hexlet.io" },
    { sign: "+", key: "timeout", value: 20 },
    { sign: "-", key: "timeout", value: 50 },
    { sign: "-", key: "proxy", value: 123 },
    { sign: "+", key: "verbose", value: true },
    { sign: "-", key: "follow", value: false },
  ];

  const expected = fs.readFileSync(`${__dirname}/fixtures/render.txt`, 'utf8');
  const output = render(diff);
  expect(output).toBe(expected);
});


test('renderNested(diff)', () => {
  const diffNested = [
    { key: "common", value: [
      { key: "setting1", value: "Value 1" },
      { sign: "-", key: "setting2", value: 200 },
      { sign: "+", key: "setting3", value: { key: "value" }},
      { sign: "-", key: "setting3", value: true },
      { key: "setting6", value: [
        { key: "key", value: "value" },
        { sign: "+", key: "ops", value: "vops" }
      ]},
      { sign: "+", key: "follow", value: false },
    ]}
  ];

  const expected = fs.readFileSync(`${path}/fixtures/renderNested.txt`, 'utf8');
  const output = render(diffNested);
  expect(output).toBe(expected);
});
