import { plain } from '../../src/formatters';
import fs from 'fs';

const path = __dirname;

test('flatFormat(diff)', () => {
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
// 1) groupby key
// let acc = ''
// for (let i = 0; i < diff.length; i++) {
//   const { key, value, sign } = diff[i];
//   if (sign) {
//     if (diff[i + 1].key === key) {
//       const beforeVal = diff[i + 1].value;
//       acc += `${}`
//     }
//
//   }
// }
  const expected = fs.readFileSync(`${__dirname}/../fixtures/plainFormat.txt`, 'utf8');
  const output = plain(diffNested);
  expect(output).toBe(expected);
});
