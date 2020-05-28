
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (content, format) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };
  const parser = parsers[format];
  return parser(content);
};

export default parse;
