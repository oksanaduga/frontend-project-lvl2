
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (content, format) => {
  const parsers = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  const parseInFormat = parsers[format];
  return parseInFormat(content);
};

export default parse;
