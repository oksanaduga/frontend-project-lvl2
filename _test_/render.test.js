import render from '../src/render';
import fs from 'fs';

const path = __dirname;

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
