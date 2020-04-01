import { json } from '../../src/formatters';
import diffNested from '../helpers';
import fs from 'fs';


test('json(diff)', () => {
  const expected = fs.readFileSync(
    `${__dirname}/../fixtures/jsonFormat.json`,
    'utf8'
  );
  const output = json(diffNested());
  expect(output).toBe(expected);
});
