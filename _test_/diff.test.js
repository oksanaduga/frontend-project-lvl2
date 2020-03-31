import diff from '../src/diff.js';
import parse from '../src/parsers.js';

const path = __dirname;

const littleArrNested = [
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

const littleArrNestedIni = [
  { key: "common", value: [
    { key: "setting1", value: "Value 1" },
    { sign: "-", key: "setting2", value: "200" },
    { sign: "-", key: "setting3", value: true },
    { sign: "+", key: "follow", value: false },
  ]},
  { key: "setting6", value: [
    { key: "key", value: "value" },
    { sign: "+", key: "ops", value: "vops" },
  ]},
  { sign: "+", key: "setting3", value: { "key": "value" }},
];

test.each([
  [parse(`${path}/fixtures/beforeNested.json`), parse(`${path}/fixtures/afterNested.json`), littleArrNested],
  [parse(`${path}/fixtures/beforeNested.yml`), parse(`${path}/fixtures/afterNested.yml`), littleArrNested],
  [parse(`${path}/fixtures/beforeNested.ini`), parse(`${path}/fixtures/afterNested.ini`), littleArrNestedIni],
])('diff(%o, %o)', (a, b, expected) => {
  expect(diff(a, b)).toMatchObject(expected);
});
