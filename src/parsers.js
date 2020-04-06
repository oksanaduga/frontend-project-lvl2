import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';


const parse = (pathToFile) => {
  const textFromPath = fs.readFileSync(pathToFile, 'utf-8');
  if (pathToFile.endsWith('.json')) {
    return JSON.parse(textFromPath);
  }
  if (pathToFile.endsWith('.yml')) {
    return yaml.safeLoad(textFromPath);
  }
  return ini.parse(textFromPath);
};

export default parse;
