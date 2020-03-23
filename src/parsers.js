#!/usr/bin/env node

import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (pathToFile) => {
  const textFromPath = fs.readFileSync(pathToFile, 'utf-8');
  if (pathToFile.endsWith('.json')) {
    return JSON.parse(textFromPath);
  } else if (pathToFile.endsWith('.yml')) {
    return yaml.safeLoad(textFromPath);
  } else if (pathToFile.endsWith('.ini')) {
    return ini.parse(textFromPath);
  }
}

export default parse;
