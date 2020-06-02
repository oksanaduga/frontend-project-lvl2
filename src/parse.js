
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (content, format) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };
  const parsing = parsers[format];
  return parsing(content);
};

export default parse;
