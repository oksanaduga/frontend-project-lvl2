#!/usr/bin/env node

import fs from 'fs';
import yaml from 'js-yaml';

const parse = (pathToFail) => {
  const textFromPath = fs.readFileSync(pathToFail);
  if (pathToFail.endsWith('.json')) {
    return JSON.parse(textFromPath);
  } else if (pathToFail.endsWith('.yml')) {
    return yaml.safeLoad(textFromPath);
  }
}

export default parse;
