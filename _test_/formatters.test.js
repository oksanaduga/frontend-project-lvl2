import { json } from '../src/formatters';
import { nested } from '../src/formatters';
import { plain } from '../src/formatters';
import diffNested from './helpers';
import fs from 'fs';

const path = __dirname;

test('json(diff)', () => {
  const expected = fs.readFileSync(
    `${path}/fixtures/jsonFormat.json`,
    'utf8'
  );
  const output = json(diffNested());
  expect(output).toBe(expected);
});

test('nested(diff)', () => {
  const expected = fs.readFileSync(
    `${path}/fixtures/nestedFormat.txt`,
    'utf8'
  );
  const output = nested(diffNested());
  expect(output).toBe(expected);
});

test('plain(diff)', () => {
  const expected = fs.readFileSync(`${path}/fixtures/plainFormat.txt`, 'utf8');
  const output = plain(diffNested());
  expect(output).toBe(expected);
});
