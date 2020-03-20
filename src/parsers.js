#!/usr/bin/env node

var fs = require('fs');
var yaml = require('js-yaml');

const parse = (pathToFail) => {
  const textFromPath = fs.readFileSync(pathToFail);
  if (pathToFail.endsWith('.json')) {
    return JSON.parse(textFromPath);
  } else if (pathToFail.endsWith('.yml')) {
    return yaml.safeLoad(textFromPath);
  }
};

export default parse;
