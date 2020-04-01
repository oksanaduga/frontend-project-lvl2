import { plain } from '../../src/formatters';
import diffNested from '../helpers';
import fs from 'fs';

test('plainFormat(diff)', () => {
  const expected = fs.readFileSync(`${__dirname}/../fixtures/plainFormat.txt`, 'utf8');
  const output = plain(diffNested());
  expect(output).toBe(expected);
});
