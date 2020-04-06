import fs from 'fs';
import { json, nested, plain } from '../src/formatters';
import diffNested from './fixtures/helpers';


const path = __dirname;

test.each([
  [json, `${path}/fixtures/jsonFormat.json`],
  [nested, `${path}/fixtures/nestedFormat.txt`],
  [plain, `${path}/fixtures/plainFormat.txt`],
])('formatter test', (fn, fixturePath) => {
  const actual = fn(diffNested());
  const expected = fs.readFileSync(fixturePath, 'utf8');
  expect(actual).toBe(expected);
});
