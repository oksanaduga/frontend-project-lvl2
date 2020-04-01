import { nested } from '../../src/formatters';
import diffNested from '../helpers';
import fs from 'fs';


test('nested(diff)', () => {
  const expected = fs.readFileSync(
    `${__dirname}/../fixtures/nestedFormat.txt`,
    'utf8'
  );
  const output = nested(diffNested());
  expect(output).toBe(expected);
});
