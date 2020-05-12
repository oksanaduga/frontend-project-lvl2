import fs from 'fs';
import path from 'path';
import diff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const res = [
  {
    settingName: 'common',
    children: [
      { settingName: 'setting1', from: 'Value 1', to: 'Value 1' },
      { settingName: 'setting2', from: 200 },
      { settingName: 'setting3', from: true, to: { key: 'value' } },
      {
        settingName: 'setting6',
        children: [
          { settingName: 'key', from: 'value', to: 'value' },
          { settingName: 'ops', to: 'vops' },
        ],
      },
      { settingName: 'follow', to: false },
    ],
  },
];

test.each([
  ['beforeNested.json', 'afterNested.json', res],
])('gendiff(%o, %o, %s, %s)', (from, to, exp) => {
  const fromPath = readFile(from);
  const toPath = readFile(to);
  const expected = exp;
  expect(diff(fromPath, toPath)).toBe(expected);
});
